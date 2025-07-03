import { Module } from '@nestjs/common';
import { AnalyticsController } from './analytics.controller';
import { AnalyticsService } from './analytics.service';
import { GlobalValidationPipe } from '../common/pipes/global-validation.pipe';
import { SanitizationPipe } from './pipes/sanitization.pipe';

@Module({
  controllers: [AnalyticsController],
  providers: [
    AnalyticsService,
    GlobalValidationPipe,
    SanitizationPipe,
  ],
  exports: [AnalyticsService],
})
export class AnalyticsModule {}