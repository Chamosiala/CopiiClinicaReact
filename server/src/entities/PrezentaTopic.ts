import { FieldError } from "../utils/FieldError";
import { Field, InputType, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Prezenta } from "./Prezenta";

@ObjectType()
@Entity()
class PrezentaTopic extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @PrimaryColumn()
  prezentaId: number;

  @Field()
  @Column()
  tip: string;

  @ManyToOne(() => Prezenta, (prezenta) => prezenta.prezentaTopics, {
    onDelete: "CASCADE",
  })
  prezenta!: Prezenta;

  @Field(() => String)
  @Column({ nullable: false })
  titlu: string;

  @Field(() => String)
  @Column()
  detalii: string;

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}

@InputType()
class PrezentaTopicInput {
  @Field()
  titlu: string;
  @Field()
  detalii: string;
}

@ObjectType()
class PrezentaTopicResponse {
  @Field(() => [FieldError], { nullable: true })
  errors?: FieldError[];

  @Field(() => PrezentaTopic, { nullable: true })
  prezentaTopic?: PrezentaTopic;
}

export { PrezentaTopic, PrezentaTopicInput, PrezentaTopicResponse };
