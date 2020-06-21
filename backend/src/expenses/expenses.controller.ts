import { Controller, Get, Render } from '@nestjs/common';

@Controller('expenses')
export class ExpensesController {
  @Render('expenses/index')
  @Get()
  // tslint:disable-next-line: no-empty
  public main() {}
}
