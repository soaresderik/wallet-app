import { InputType, Field, Int } from '@nestjs/graphql';

@InputType()
export class ExpenseInput {
  @Field(() => String!)
  description: string;

  @Field(() => Int!)
  value: number;
}
