import { Copil, CopilInput } from "../entities/Copil";
import {
  Arg,
  Field,
  FieldResolver,
  Int,
  Mutation,
  ObjectType,
  Query,
  Resolver,
  Root,
  UseMiddleware,
} from "type-graphql";
import { isAuth } from "../middlewares/isAuth";
import { FieldError } from "../utils/FieldError";
import { Prezenta } from "../entities/Prezenta";
import { getConnection } from "typeorm";

@ObjectType()
class CopilResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Copil, { nullable: true })
  copil?: Copil;
}

@Resolver(Copil)
export class CopilResolver {
  @FieldResolver(() => [Prezenta])
  prezente(@Root() copil: Copil) {
    return Prezenta.find({ copilId: copil.id });
  }

  @Query(() => Copil, { nullable: true })
  copil(@Arg("id", () => Int) id: number): Promise<Copil | undefined> {
    return Copil.findOne(id);
  }

  @Query(() => [Copil])
  copii(): Promise<Copil[]> {
    return Copil.find();
  }

  @Mutation(() => CopilResponse)
  @UseMiddleware(isAuth)
  createCopil(@Arg("input") input: CopilInput) {
    if (input.nume === "") {
      return {
        errors: [{ field: "nume", message: "Introdu un nume" }],
      };
    } else if (input.prenume === "") {
      return {
        errors: [{ field: "prenume", message: "Introdu un prenume" }],
      };
    } else if (input.varsta <= 0) {
      return {
        errors: [{ field: "varsta", message: "Introdu o varsta reala" }],
      };
    }

    let copil;
    try {
      copil = Copil.create({ ...input }).save();
    } catch (err) {
      console.log(err);
      return {
        errors: [{ field: "unknown", message: err.message }],
      };
    }

    return { copil };
  }

  @Mutation(() => Boolean)
  @UseMiddleware(isAuth)
  async deleteCopil(@Arg("id", () => Int) id: number): Promise<boolean> {
    await Copil.delete({ id });
    return true;
  }

  @Mutation(() => Copil, { nullable: true })
  @UseMiddleware(isAuth)
  async updateCopil(
    @Arg("id", () => Int) id: number,
    @Arg("nume") nume: string,
    @Arg("prenume") prenume: string,
    @Arg("varsta") varsta: number
  ): Promise<Copil | null> {
    const result = await getConnection()
      .createQueryBuilder()
      .update(Copil)
      .set({ nume, prenume, varsta })
      .where("id = :id", {
        id,
      })
      .returning("*")
      .execute();

    return result.raw[0];
  }
}
