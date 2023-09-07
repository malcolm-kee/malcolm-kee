import type { Token } from './token';

export interface ExprVisitor<R> {
  visitAssignExpr(expr: AssignExpr): R;
  visitBinaryExpr(expr: BinaryExpr): R;
  visitCallExpr(expr: CallExpr): R;
  visitGroupingExpr(expr: GroupingExpr): R;
  visitLiteralExpr(expr: LiteralExpr): R;
  visitLogicalExpr(expr: LogicalExpr): R;
  visitUnaryExpr(expr: UnaryExpr): R;
  visitVariableExpr(expr: VariableExpr): R;
}

export interface Expr {
  accept<R>(visitor: ExprVisitor<R>): R;
}

export class AssignExpr implements Expr {
  constructor(
    public readonly name: Token,
    public readonly value: Expr
  ) {}

  accept<R>(visitor: ExprVisitor<R>): R {
    return visitor.visitAssignExpr(this);
  }
}

export class BinaryExpr implements Expr {
  constructor(
    public readonly left: Expr,
    public readonly operator: Token,
    public readonly right: Expr
  ) {}

  accept<R>(visitor: ExprVisitor<R>): R {
    return visitor.visitBinaryExpr(this);
  }
}

export class CallExpr implements Expr {
  constructor(
    public readonly callee: Expr,
    public readonly paren: Token,
    public readonly args: Array<Expr>
  ) {}

  accept<R>(visitor: ExprVisitor<R>): R {
    return visitor.visitCallExpr(this);
  }
}

export class GroupingExpr implements Expr {
  constructor(public readonly expression: Expr) {}

  accept<R>(visitor: ExprVisitor<R>): R {
    return visitor.visitGroupingExpr(this);
  }
}

export class LiteralExpr implements Expr {
  constructor(public readonly value: any) {}

  accept<R>(visitor: ExprVisitor<R>): R {
    return visitor.visitLiteralExpr(this);
  }
}

export class LogicalExpr implements Expr {
  constructor(
    public readonly left: Expr,
    public readonly operator: Token,
    public readonly right: Expr
  ) {}

  accept<R>(visitor: ExprVisitor<R>): R {
    return visitor.visitLogicalExpr(this);
  }
}

export class UnaryExpr implements Expr {
  constructor(
    public readonly operator: Token,
    public readonly right: Expr
  ) {}

  accept<R>(visitor: ExprVisitor<R>): R {
    return visitor.visitUnaryExpr(this);
  }
}

export class VariableExpr implements Expr {
  constructor(public readonly name: Token) {}

  accept<R>(visitor: ExprVisitor<R>): R {
    return visitor.visitVariableExpr(this);
  }
}
