import {
  Arg,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import { getConnection } from "typeorm";
import { Prezenta } from "../entities/Prezenta";
import {
  PrezentaTopic,
  PrezentaTopicInput,
  PrezentaTopicResponse,
} from "../entities/PrezentaTopic";
import { isAuth } from "../middlewares/isAuth";

@Resolver(PrezentaTopic)
export class PrezentaTopicResolver {
  @Mutation(() => PrezentaTopicResponse)
  @UseMiddleware(isAuth)
  async createPrezentaTopic(
    @Arg("prezentaId", () => Int) prezentaId: number,
    @Arg("tip", () => String) tip: string,
    @Arg("input") input: PrezentaTopicInput
  ) {
    const prezenta = await Prezenta.findOne({ id: prezentaId });

    let prezentaTopic;
    try {
      prezentaTopic = await PrezentaTopic.create({
        prezentaId,
        tip,
        prezenta,
        ...input,
      }).save();
    } catch (err) {
      console.log(err);
      return {
        errors: [{ field: "unknown", message: err.message }],
      };
    }

    return { prezentaTopic };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deletePrezentaTopic(
    @Arg("id", () => Int) id: number
  ): Promise<boolean> {
    await PrezentaTopic.delete({ id: id });
    return true;
  }

  @Query(() => PrezentaTopic, { nullable: true })
  prezentaTopic(
    @Arg("id", () => Int) id: number
  ): Promise<PrezentaTopic | undefined> {
    return PrezentaTopic.findOne({ id: id });
  }

  @Mutation(() => PrezentaTopic, { nullable: true })
  @UseMiddleware(isAuth)
  async updatePrezentaTopic(
    @Arg("id", () => Int) id: number,
    @Arg("titlu") titlu: string,
    @Arg("detalii") detalii: string
  ): Promise<PrezentaTopic | null> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(PrezentaTopic)
      .set({ titlu, detalii })
      .where("id = :id", {
        id,
      })
      .returning("*")
      .execute();

    return result.raw[0];
  }
}
