import { Field, InputType, ObjectType } from "type-graphql";
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { Prezenta } from "./Prezenta";

@ObjectType()
@Entity()
class Copil extends BaseEntity {
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  @Field()
  @Column({ nullable: false })
  nume!: string;

  @Field()
  @Column({ nullable: false })
  prenume!: string;

  @Field()
  @Column({ nullable: false })
  varsta!: number;

  @Field(() => [Prezenta], { nullable: true })
  @OneToMany(() => Prezenta, (prezenta) => prezenta.copil)
  prezente: Prezenta[];

  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}

@InputType()
class CopilInput {
  @Field()
  nume: string;
  @Field()
  prenume: string;
  @Field()
  varsta: number;
}

export { Copil, CopilInput };
