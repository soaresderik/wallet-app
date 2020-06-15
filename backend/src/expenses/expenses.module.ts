import { Module } from '@nestjs/common';
import { ExpensesResolver } from './expenses.resolver';
import { Expense } from './expenses.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Expense])],
  providers: [ExpensesResolver],
})
export class ExpensesModule {}
