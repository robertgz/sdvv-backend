import { Args, Parent, Query, ResolveField, Resolver } from '@nestjs/graphql';
import { ExpensesService } from './expenses.service';
import { ExpenseTransactionService } from './expense-transactions/expense-transaction.service';

@Resolver('Expenses')
export class ExpensesResolver {
  constructor(
    private expendituresService: ExpensesService,
    private expenseTransactionService: ExpenseTransactionService,
  ) {}

  @ResolveField()
  async sum(@Parent() parent) {
    const { committeeName } = parent;

    const expenses = await this.expendituresService.getTotalSpent({
      committeeName: committeeName,
    });

    return expenses;
  }

  @ResolveField()
  async groupBy(@Parent() parent) {
    const { committeeName } = parent;
    return { committeeName };
  }

  // @ResolveField()
  // async transactions(@Parent() parent, @Args() args) {
  //   const { committeeName } = parent;
  //   const { filters } = args;
  //   const { limit } = args;

  //   // const list = await this.expenseTransactionService.getTransactions({
  //   //   committeeName: committeeName,
  //   //   filters: filters,
  //   //   limit: limit,
  //   // });

  //   // return list;
  // }
}
