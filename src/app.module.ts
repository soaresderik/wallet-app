import { Module } from '@nestjs/common';
import { ExpensesModule } from './expenses/expenses.module';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    GraphQLModule.forRoot({ autoSchemaFile: true }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'expenses.db',
      entities: ['dist/**/*.entity.js'],
      synchronize: true,
    }),
    ExpensesModule,
  ],
})
export class AppModule {}
