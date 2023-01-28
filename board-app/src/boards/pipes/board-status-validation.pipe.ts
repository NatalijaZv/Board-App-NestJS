import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { BoardStatus } from '../boards.model';

export class BoardStatusValidationPipe implements PipeTransform {
  readonly statusOption = [BoardStatus.PUBLIC, BoardStatus.PRIVATE];
  transform(value: any) {
    value = value.toUpperCase();
    if (!this.isStatusValid(value)) {
      throw new BadRequestException(`${value} is not the status option`);
    }
    return value
  }
  private isStatusValid(status: any) {
    const index = this.statusOption.indexOf(status);
    return index !== -1;
  }
}