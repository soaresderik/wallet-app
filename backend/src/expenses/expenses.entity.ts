import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { ObjectType, Field, ID, Int } from '@nestjs/graphql';

@ObjectType()
@Entity()
export class Expense extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Field(() => Int)
  @Column('integer')
  value: number;

  @Field(() => String)
  @Column('text')
  description: string;

  @Field(() => Date)
  @Column('datetime')
  createdAt: Date;
}
