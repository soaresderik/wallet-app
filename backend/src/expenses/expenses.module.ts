import { Module } from '@nestjs/common';
import { ExpensesResolver } from './expenses.resolver';
import { Expense } from './expenses.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpensesController } from './expenses.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Expense])],
  providers: [ExpensesResolver],
  controllers: [ExpensesController],
})
export class ExpensesModule {}
