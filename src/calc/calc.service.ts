import { BadRequestException, Injectable } from '@nestjs/common';
import { CalcDto } from './calc.dto';

@Injectable()
export class CalcService {
  calculateExpression(calcBody: CalcDto) {
    const isValid = this.identifyValidExpression(calcBody.expression);
    if (!isValid) throw new BadRequestException("Invalid expression provided");
    return 0;
  }

  identifyValidExpression(expression: string): boolean {
    const expressionPattern = /^[0-9][0-9+\-*/\s]*[0-9]$/;
    const isValidExpression = expressionPattern.test(expression);
    return isValidExpression;
  }
}
