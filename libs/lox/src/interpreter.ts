import { Environment } from './environment';
import type {
  AssignExpr,
  BinaryExpr,
  CallExpr,
  Expr,
  ExprVisitor,
  GroupingExpr,
  LiteralExpr,
  LogicalExpr,
  UnaryExpr,
  VariableExpr,
} from './expr';
import { LoxCallable, isLoxCallable } from './lox-callable';
import { LoxFunction } from './lox-function';
import { Return } from './return';
import { RuntimeError } from './runtime-error';
import type {
  BlockStmt,
  ExpressionStmt,
  FunctionStmt,
  IfStmt,
  PrintStmt,
  ReturnStmt,
  Stmt,
  StmtVisitor,
  VarStmt,
  WhileStmt,
} from './stmt';
import type { Token } from './token';
import { TokenType } from './token-type';

export class Interpreter implements ExprVisitor<any>, StmtVisitor<void> {
  private readonly globals = new Environment();
  private environment = this.globals;

  constructor(private readonly onError: (error: RuntimeError) => void) {
    const clock = {
      arity: 0,
      call: () => Date.now() / 1000,
      toString() {
        return '<native fn>';
      },
    };

    this.globals.define('clock', clock satisfies LoxCallable);
  }

  interpret(statements: Array<Stmt>) {
    try {
      for (const statement of statements) {
        this.execute(statement);
      }
    } catch (err) {
      if (err instanceof RuntimeError) {
        this.onError(err);
      } else {
        throw err;
      }
    }
  }

  visitBlockStmt(stmt: BlockStmt): void {
    this.executeBlock(stmt.statements, new Environment(this.environment));
  }

  visitCallExpr(expr: CallExpr): any {
    const callee = this.evaluate(expr.callee);

    const args: Array<any> = [];

    expr.args.forEach((a) => args.push(this.evaluate(a)));

    if (!isLoxCallable(callee)) {
      throw new RuntimeError(expr.paren, 'Can only call functions and classes');
    }

    if (args.length !== callee.arity) {
      throw new RuntimeError(
        expr.paren,
        `Expected ${callee.arity} arguments but got ${args.length}.`
      );
    }

    return callee.call(this, args);
  }

  visitExpressionStmt(stmt: ExpressionStmt): void {
    this.evaluate(stmt.expression);
  }

  visitFunctionStmt(stmt: FunctionStmt): void {
    const fun = new LoxFunction(stmt, this.environment);
    this.environment.define(stmt.name.lexeme, fun);
  }

  visitIfStmt(stmt: IfStmt): void {
    if (this.isTruthy(this.evaluate(stmt.condition))) {
      this.execute(stmt.thenBranch);
    } else if (stmt.elseBranch != null) {
      this.execute(stmt.elseBranch);
    }
  }

  visitPrintStmt(stmt: PrintStmt): void {
    const value = this.evaluate(stmt.expression);
    console.log(value);
  }

  visitReturnStmt(stmt: ReturnStmt): void {
    let value = null;

    if (stmt.value != null) {
      value = this.evaluate(stmt.value);
    }

    throw new Return(value);
  }

  visitVarStmt(stmt: VarStmt): void {
    let value: any = null;

    if (stmt.initializer != null) {
      value = this.evaluate(stmt.initializer);
    }

    this.environment.define(stmt.name.lexeme, value);
  }

  visitWhileStmt(stmt: WhileStmt): void {
    while (this.isTruthy(this.evaluate(stmt.condition))) {
      this.execute(stmt.body);
    }
  }

  visitAssignExpr(expr: AssignExpr) {
    const value = this.evaluate(expr.value);
    this.environment.assign(expr.name, value);
    return value;
  }

  visitBinaryExpr(expr: BinaryExpr) {
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

  visitGroupingExpr(expr: GroupingExpr) {
    return this.evaluate(expr.expression);
  }

  visitLiteralExpr(expr: LiteralExpr) {
    return expr.value;
  }

  visitLogicalExpr(expr: LogicalExpr) {
    const left = this.evaluate(expr.left);

    if (expr.operator.type === TokenType.OR) {
      if (this.isTruthy(left)) return left;
    } else {
      if (!this.isTruthy(left)) return left;
    }

    return this.evaluate(expr.right);
  }

  visitUnaryExpr(expr: UnaryExpr) {
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

  visitVariableExpr(expr: VariableExpr) {
    return this.environment.get(expr.name);
  }

  executeBlock(statements: Array<Stmt>, environment: Environment) {
    const previous = this.environment;

    try {
      this.environment = environment;

      for (const statement of statements) {
        this.execute(statement);
      }
    } finally {
      this.environment = previous;
    }
  }

  private execute(statement: Stmt) {
    return statement.accept(this);
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
