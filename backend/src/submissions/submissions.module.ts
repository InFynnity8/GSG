import { Module } from '@nestjs/common';
import { AdminSubmissionsController } from './admin-submissions.controller';
import { PublicSubmissionsController } from './public-submissions.controller';

@Module({
  controllers: [PublicSubmissionsController, AdminSubmissionsController],
})
export class SubmissionsModule {}
