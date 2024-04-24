import { BadRequestException, Injectable } from '@nestjs/common';
import { CalcDto } from './calc.dto';

@Injectable()
export class CalcService {
  calculateExpression(calcBody: CalcDto): number {
    // check if expression is valid to evaluate (neither starts nor ends with an operator):
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

  evaluateExpression(expression: string): number {
    const arr = expression.split("");
    const validOperands = ["+", "-", "*", "/"];
    const operands: number[] = [];
    const operators: string[] = [];
    const precedence = {
      '+': 1,
      '-': 1,
      '*': 2,
      '/': 2
    };

    arr.forEach((ele) => {
      // check if ele is operand:
      if (!validOperands.includes(ele)) operands.push(parseInt(ele));
      else {
        // if ele is an operator
        while (operators.length > 0 && precedence[operators[operators.length - 1]] >= precedence[ele]) {
          // Evaluate the top of the stack if the precedence of the current operator is lower or equal
          const operator = operators.pop();
          const rightOperand = operands.pop();
          const leftOperand = operands.pop();
          const result = this.calculateValues(leftOperand, operator, rightOperand);
          operands.push(result);
        }

        // store the operator into the operators stack:
        operators.push(ele);
      }
    })

    // evaluate with the remaining operators in the stack:
    while (operators.length > 0) {
      const operator = operators.pop();
      const rightOperand = operands.pop();
      const leftOperand = operands.pop();
      const result = this.calculateValues(leftOperand, operator, rightOperand);
      operands.push(result);
    }

    if (operands.length !== 1) throw new Error("Invalid expression provided");

    // return only operand left in the operands:
    return operands.pop();
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
