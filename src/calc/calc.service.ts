import { BadRequestException, Injectable } from '@nestjs/common';
import { CalcDto } from './calc.dto';

@Injectable()
export class CalcService {
  calculateExpression(calcBody: CalcDto): number {
    // check if expression is valid to evaluate:
    const isValid = this.identifyValidExpression(calcBody.expression);
    if (!isValid) throw new BadRequestException("Invalid expression provided");

    const result = this.evaluateExpression(calcBody.expression);
    return result;
  }

  identifyValidExpression(expression: string): boolean {
    const expressionPattern = /^[0-9][0-9+\-*/\s]*[0-9]$/;
    const isValidExpression = expressionPattern.test(expression);
    return isValidExpression;
  }

  evaluateExpression(expression: string) {
    const arr = expression.split("");
    const operands = ["+", "-", "*", "/"];
    let operand: number;
    let operator: string;
    arr.forEach((opr) => {
      if (operands.includes(opr)) return operator = opr;
      else {
        // if element is an operand and operand variable is empty:
        if (!operand && !operator) return operand = parseInt(opr);
        else {
          // Perform evaluation when operand and operator already has value:
          operand = this.calculateValues(operand, operator, parseInt(opr));
          operator = undefined;
        }
      }
    })

    return operand;
  }

  calculateValues(leftOperand: number, operator: string, rightOperand: number): number {
    let result: number;
    switch (operator) {
      case '+':
        result = leftOperand + rightOperand;
        break;

      case '-':
        result = leftOperand - rightOperand;
        break;

      case '*':
        result = leftOperand * rightOperand;
        break;

      case '/':
        result = leftOperand / rightOperand;
        break;

      default:
        break;
    }

    return result;
  }
}
