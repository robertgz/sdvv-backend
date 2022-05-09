import { Module } from '@nestjs/common';
import { ApolloClientService } from './apollo-client';
import { ClassValidationService } from './class-validation.service';

@Module({
  imports: [],
  providers: [ClassValidationService, ApolloClientService],
  exports: [ClassValidationService, ApolloClientService],
})
export class SharedModule {}
