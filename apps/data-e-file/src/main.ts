import { CommandFactory } from 'nest-commander';
import { EFileModule } from './e-file.module';

async function bootstrap() {
  await CommandFactory.run(EFileModule);
}
bootstrap();
