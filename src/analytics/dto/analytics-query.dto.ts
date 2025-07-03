import { 
  IsString, 
  IsOptional, 
  IsNumber, 
  IsArray, 
  IsEnum, 
  Min, 
  Max, 
  Length, 
  IsDateString,
  ArrayMaxSize,
  ValidateNested
} from 'class-validator';
import { Transform, Type } from 'class-transformer';
import { IsSafeString } from '../validators/safe-string.validator';
import { IsValidDateRange } from '../validators/custom-date.validator';

export enum AggregationType {
  SUM = 'sum',
  COUNT = 'count',
  AVG = 'avg',
  MIN = 'min',
  MAX = 'max',
  DISTINCT = 'distinct'
}

export enum TimeInterval {
  HOUR = 'hour',
  DAY = 'day',
  WEEK = 'week',
  MONTH = 'month'
}

export class AnalyticsFilterDto {
  @IsOptional()
  @IsString()
  @Length(1, 50)
  @IsSafeString()
  field?: string;

  @IsOptional()
  @IsString()
  @Length(1, 10)
  @IsSafeString()
  operator?: string; // eq, ne, gt, lt, gte, lte, in, nin

  @IsOptional()
  value?: any;
}

export class AnalyticsQueryDto {
  @IsOptional()
  @IsDateString()
  @IsValidDateRange()
  startDate?: string;

  @IsOptional()
  @IsDateString()
  @IsValidDateRange()
  endDate?: string;

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(10)
  @IsString({ each: true })
  @Length(1, 50, { each: true })
  @IsSafeString({ each: true })
  eventNames?: string[];

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(5)
  @ValidateNested({ each: true })
  @Type(() => AnalyticsFilterDto)
  filters?: AnalyticsFilterDto[];

  @IsOptional()
  @IsArray()
  @ArrayMaxSize(5)
  @IsString({ each: true })
  @Length(1, 50, { each: true })
  @IsSafeString({ each: true })
  groupBy?: string[];

  @IsOptional()
  @IsEnum(AggregationType)
  aggregation?: AggregationType;

  @IsOptional()
  @IsEnum(TimeInterval)
  timeInterval?: TimeInterval;

  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(1000)
  limit?: number = 100;

  @Transform(({ value }) => parseInt(value, 10))
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(10000)
  offset?: number = 0;

  @IsOptional()
  @IsString()
  @Length(1, 50)
  @IsSafeString()
  sortBy?: string;

  @IsOptional()
  @IsString()
  @Length(3, 4)
  @IsSafeString()
  sortOrder?: 'asc' | 'desc' = 'desc';
}