import { Resolver, Query, Args, Mutation, Int } from '@nestjs/graphql';
import { Expense } from './expenses.entity';
import { ExpenseInput } from './expenses.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Resolver(of => Expense)
export class ExpensesResolver {
  constructor(
    @InjectRepository(Expense)
    private expenseRepository: Repository<Expense>,
  ) {}

  @Query(() => [Expense])
  public async getExpenses() {
    const expenses = await this.expenseRepository.find();

    return expenses;
  }

  @Query(() => Int!)
  public async getBalance() {
    const { total } = await this.expenseRepository
      .createQueryBuilder()
      .select('sum(value) as total')
      .getRawOne();

    return total;
  }

  @Mutation(() => Expense)
  public async createExpense(
    @Args('args') { description, value }: ExpenseInput,
  ) {
    const result = await this.expenseRepository.save({
      description,
      value,
      createdAt: new Date().toISOString(),
    });

    return result;
  }

  @Mutation(() => Boolean)
  public async deleteExpense(
    @Args({ name: 'id', type: () => String }) id: string,
  ) {
    await this.expenseRepository.delete(id);

    return true;
  }
}
