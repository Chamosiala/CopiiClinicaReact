import { FieldError } from "../utils/FieldError";
import { Field, InputType, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Copil } from "./Copil";
import { PrezentaTopic } from "./PrezentaTopic";

@ObjectType()
@Entity()
class Prezenta extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @PrimaryColumn()
  copilId: number;

  @Field(() => Copil)
  @ManyToOne(() => Copil, (copil) => copil.prezente, { onDelete: "CASCADE" })
  copil: Copil;

  @Field(() => [PrezentaTopic], { nullable: true })
  @OneToMany(() => PrezentaTopic, (prezentaTopic) => prezentaTopic.prezenta)
  prezentaTopics: PrezentaTopic[];

  @Field()
  @Column({ nullable: false })
  prezent!: boolean;

  @Field()
  @Column({ nullable: false })
  data!: Date;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}

@InputType()
class PrezentaInput {
  @Field()
  data: Date;
  @Field()
  prezent: boolean;
}

@ObjectType()
class PrezentaResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => Prezenta, { nullable: true })
  prezenta?: Prezenta;
}

export { Prezenta, PrezentaInput, PrezentaResponse };
