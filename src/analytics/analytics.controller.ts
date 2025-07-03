import { 
  Controller, 
  Post, 
  Get, 
  Body, 
  Query, 
  UsePipes, 
  UseFilters,
  HttpStatus,
  HttpCode
} from '@nestjs/common';
import { 
  ApiTags, 
  ApiOperation, 
  ApiResponse, 
  ApiBody, 
  ApiQuery 
} from '@nestjs/swagger';
import { GlobalValidationPipe } from '../common/pipes/global-validation.pipe';
import { SanitizationPipe } from './pipes/sanitization.pipe';
import { ValidationExceptionFilter } from '../common/exceptions/validation-exception.filter';
import { CreateAnalyticsEventDto } from './dto/create-analytics-event.dto';
import { AnalyticsQueryDto } from './dto/analytics-query.dto';
import { AnalyticsService } from './analytics.service';

@ApiTags('Analytics')
@Controller('analytics')
@UseFilters(ValidationExceptionFilter)
@UsePipes(new SanitizationPipe(), new GlobalValidationPipe())
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  @Post('events')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({ summary: 'Create analytics event' })
  @ApiBody({ type: CreateAnalyticsEventDto })
  @ApiResponse({ 
    status: 201, 
    description: 'Event created successfully' 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Validation failed' 
  })
  async createEvent(
    @Body() createEventDto: CreateAnalyticsEventDto
  ) {
    return this.analyticsService.createEvent(createEventDto);
  }

  @Get('events')
  @ApiOperation({ summary: 'Query analytics events' })
  @ApiResponse({ 
    status: 200, 
    description: 'Events retrieved successfully' 
  })
  @ApiResponse({ 
    status: 400, 
    description: 'Invalid query parameters' 
  })
  async getEvents(
    @Query() queryDto: AnalyticsQueryDto
  ) {
    return this.analyticsService.getEvents(queryDto);
  }

  @Get('dashboard')
  @ApiOperation({ summary: 'Get analytics dashboard data' })
  async getDashboard(
    @Query() queryDto: AnalyticsQueryDto
  ) {
    return this.analyticsService.getDashboardData(queryDto);
  }
}