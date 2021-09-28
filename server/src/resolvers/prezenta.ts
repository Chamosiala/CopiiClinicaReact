import { Copil } from "../entities/Copil";
import {
  Arg,
  FieldResolver,
  Int,
  Mutation,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import {
  Prezenta,
  PrezentaInput,
  PrezentaResponse,
} from "../entities/Prezenta";
import { isAuth } from "../middlewares/isAuth";
import { PrezentaTopic } from "../entities/PrezentaTopic";

@Resolver(Prezenta)
export class PrezentaResolver {
  @FieldResolver(() => [PrezentaTopic])
  prezentaTopics(@Root() prezenta: Prezenta) {
    return PrezentaTopic.find({ prezentaId: prezenta.id });
  }

  @FieldResolver(() => String)
  dataFrumoasa(@Root() root: Prezenta) {
    return root.data
      .toLocaleString("pt-PT", {
        dateStyle: "short",
        timeStyle: "short",
      })
      .replace(".", "/");
  }

  @FieldResolver(() => Copil)
  copil(@Root() root: Prezenta) {
    return Copil.findOne(root.copilId);
  }

  @Mutation(() => PrezentaResponse)
  @UseMiddleware(isAuth)
  async createPrezenta(
    @Arg("copilId", () => Int) copilId: number,
    @Arg("input") input: PrezentaInput
  ) {
    const copil = await Copil.findOne(copilId);

    let prezenta;
    try {
      prezenta = await Prezenta.create({ copilId, copil, ...input }).save();
    } catch (err) {
      console.log(err);
      return {
        errors: [{ field: "unknown", message: err.message }],
      };
    }

    return { prezenta };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deletePrezenta(@Arg("id", () => Int) id: number): Promise<boolean> {
    await Prezenta.delete({ id: id });
    return true;
  }

  @Query(() => Prezenta, { nullable: true })
  prezenta(@Arg("id", () => Int) id: number): Promise<Prezenta | undefined> {
    return Prezenta.findOne({ id: id });
  }
}
