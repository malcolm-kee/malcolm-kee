import type { Expr } from './expr';
import type { Token } from './token';

export interface StmtVisitor<R> {
  visitBlockStmt(stmt: BlockStmt): R;
  visitExpressionStmt(stmt: ExpressionStmt): R;
  visitIfStmt(stmt: IfStmt): R;
  visitPrintStmt(stmt: PrintStmt): R;
  visitVarStmt(stmt: VarStmt): R;
  visitWhileStmt(stmt: WhileStmt): R;
}

export interface Stmt {
  accept<R>(visitor: StmtVisitor<R>): R;
}

export class BlockStmt implements Stmt {
  constructor(public readonly statements: Array<Stmt>) {}

  accept<R>(visitor: StmtVisitor<R>): R {
    return visitor.visitBlockStmt(this);
  }
}

export class ExpressionStmt implements Stmt {
  constructor(public readonly expression: Expr) {}

  accept<R>(visitor: StmtVisitor<R>): R {
    return visitor.visitExpressionStmt(this);
  }
}

export class IfStmt implements Stmt {
  constructor(
    public readonly condition: Expr,
    public readonly thenBranch: Stmt,
    public readonly elseBranch: Stmt | null
  ) {}

  accept<R>(visitor: StmtVisitor<R>): R {
    return visitor.visitIfStmt(this);
  }
}

export class PrintStmt implements Stmt {
  constructor(public readonly expression: Expr) {}

  accept<R>(visitor: StmtVisitor<R>): R {
    return visitor.visitPrintStmt(this);
  }
}

export class VarStmt implements Stmt {
  constructor(
    public readonly name: Token,
    public readonly initializer: Expr | null
  ) {}

  accept<R>(visitor: StmtVisitor<R>): R {
    return visitor.visitVarStmt(this);
  }
}

export class WhileStmt implements Stmt {
  constructor(
    public readonly condition: Expr,
    public readonly body: Stmt
  ) {}

  accept<R>(visitor: StmtVisitor<R>): R {
    return visitor.visitWhileStmt(this);
  }
}
