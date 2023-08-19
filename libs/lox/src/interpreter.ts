import type { Visitor, Expr, Binary, Grouping, Literal, Unary } from './expr';
import type { Token } from './token';
import { TokenType } from './token-type';

class RuntimeError extends Error {
  constructor(
    public readonly token: Token,
    message: string
  ) {
    super(message);
  }
}

export class Interpreter implements Visitor<any> {
  constructor(private readonly onError: (error: RuntimeError) => void) {}

  interpret(expression: Expr) {
    try {
      const value = this.evaluate(expression);
      console.log(value);
    } catch (err) {
      if (err instanceof RuntimeError) {
        this.onError(err);
      } else {
        throw err;
      }
    }
  }

  visitBinaryExpr(expr: Binary) {
    const left = this.evaluate(expr.left);
    const right = this.evaluate(expr.right);

    switch (expr.operator.type) {
      case TokenType.GREATER:
        this.checkNumberOperands(expr.operator, left, right);
        return Number(left) > Number(right);

      case TokenType.GREATER_EQUAL:
        this.checkNumberOperands(expr.operator, left, right);
        return Number(left) >= Number(right);

      case TokenType.LESS:
        this.checkNumberOperands(expr.operator, left, right);
        return Number(left) < Number(right);

      case TokenType.LESS_EQUAL:
        this.checkNumberOperands(expr.operator, left, right);
        return Number(left) <= Number(right);

      case TokenType.EQUAL_EQUAL:
        return this.isEqual(left, right);

      case TokenType.BANG_EQUAL:
        return !this.isEqual(left, right);

      case TokenType.MINUS:
        this.checkNumberOperands(expr.operator, left, right);
        return left - right;

      case TokenType.SLASH:
        this.checkNumberOperands(expr.operator, left, right);
        return left / right;

      case TokenType.STAR:
        this.checkNumberOperands(expr.operator, left, right);
        return left * right;

      case TokenType.PLUS:
        const leftType = typeof left;
        const rightType = typeof right;

        if (
          (leftType === 'string' || leftType === 'number') &&
          (rightType === 'string' || rightType === 'number')
        ) {
          return left + right;
        }

        throw new RuntimeError(expr.operator, 'Operands must be numbers or strings');

      default:
        break;
    }
  }

  visitGroupingExpr(expr: Grouping) {
    return this.evaluate(expr.expression);
  }

  visitLiteralExpr(expr: Literal) {
    return expr.value;
  }

  visitUnaryExpr(expr: Unary) {
    const right = this.evaluate(expr.right);

    switch (expr.operator.type) {
      case TokenType.BANG:
        return !this.isTruthy(right);

      case TokenType.MINUS:
        this.checkNumberOperand(expr.operator, right);
        return -Number(right);

      default:
        break;
    }

    throw new Error('Should not reachable.');
  }

  private evaluate(expr: Expr): any {
    return expr.accept(this);
  }

  private isTruthy(value: any): boolean {
    if (value == null) return false;
    if (typeof value === 'boolean') return value;
    return true;
  }

  private checkNumberOperand(operator: Token, operand: unknown): asserts operand is number {
    if (typeof operand === 'number') return;
    throw new RuntimeError(operator, 'Operand must be a number.');
  }

  private checkNumberOperands(operator: Token, ...operands: unknown[]): void {
    if (operands.every((operand) => typeof operand === 'number')) return;
    throw new RuntimeError(operator, 'Operands must be numbers.');
  }

  private isEqual(a: unknown, b: unknown): boolean {
    if (a == null && b == null) return true;

    return a === b;
  }
}
