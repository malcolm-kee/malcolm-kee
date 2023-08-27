import type { Expr } from './expr';
import { BinaryExpr, GroupingExpr, LiteralExpr, UnaryExpr } from './expr';
import type { Stmt } from './stmt';
import { BlockStmt, ExpressionStmt, IfStmt, PrintStmt, VarStmt, WhileStmt } from './stmt';
import type { Token } from './token';
import { TokenType } from './token-type';

class ParseError extends Error {}

export class Parser {
  private current = 0;

  constructor(
    private readonly tokens: ReadonlyArray<Token>,
    private readonly onError: (token: Token, message: string) => void
  ) {}

  /**
   * program  -> declaration* EOF ;
   */
  parse(): Array<Stmt> {
    const statements: Array<Stmt> = [];

    while (this.isAtEnd()) {
      const declaration = this.declaration();

      if (declaration) {
        statements.push(declaration);
      }
    }

    return statements;
  }

  /**
   * declaration  -> varDecl | statement ;
   */
  private declaration(): Stmt | null {
    try {
      if (this.match(TokenType.VAR)) return this.varDeclaration();

      return this.statement();
    } catch (err) {
      if (err instanceof ParseError) {
        this.sychronize();
        return null;
      }
      throw err;
    }
  }

  /**
   * varDecl  -> "var" IDENTIFIER ( "=" expression )? ";" ;
   */
  private varDeclaration(): Stmt {
    const name = this.consume(TokenType.IDENTIFIER, 'Expect variable name.');

    let initializer: Expr | null = null;

    if (this.match(TokenType.EQUAL)) {
      initializer = this.expression();
    }

    this.consume(TokenType.SEMICOLON, "Expect ';' after variable declaration.");
    return new VarStmt(name, initializer);
  }

  /**
   * statement    -> exprStmt | forStmt | ifStmt | printStmt | whileStmt | block ;
   */
  private statement(): Stmt {
    if (this.match(TokenType.FOR)) return this.forStatement();
    if (this.match(TokenType.IF)) return this.ifStatement();
    if (this.match(TokenType.PRINT)) return this.printStatement();
    if (this.match(TokenType.WHILE)) return this.whileStatement();
    if (this.match(TokenType.LEFT_BRACE)) return new BlockStmt(this.block());

    return this.expressionStatement();
  }

  /**
   *
   * forStmt      -> "for" "(" ( varDecl | exprStmt | ";" ) expression? ";" expression? ")" statement ;
   */
  private forStatement(): Stmt {
    this.consume(TokenType.LEFT_PAREN, "Expect '(' after 'for'.");

    let initializer: Stmt | null = null;

    if (this.match(TokenType.SEMICOLON)) {
      initializer = null;
    } else if (this.match(TokenType.VAR)) {
      initializer = this.varDeclaration();
    } else {
      initializer = this.expressionStatement();
    }

    let condition: Expr | null = null;

    if (!this.check(TokenType.SEMICOLON)) {
      condition = this.expression();
    }
    this.consume(TokenType.SEMICOLON, "Expect ';' after loop condition.");

    let increment: Expr | null = null;

    if (!this.check(TokenType.RIGHT_PAREN)) {
      increment = this.expression();
    }
    this.consume(TokenType.RIGHT_PAREN, "Expect ')' after for clauses.");

    let body = this.statement();

    // transform to while statement
    if (increment != null) {
      body = new BlockStmt([body, new ExpressionStmt(increment)]);
    }

    if (condition == null) {
      condition = new LiteralExpr(true);
    }
    body = new WhileStmt(condition, body);

    if (initializer != null) {
      body = new BlockStmt([initializer, body]);
    }

    return body;
  }

  /**
   * ifStmt       -> "if" "(" expression ")" statement ( "else" statement )? ;
   */
  private ifStatement(): Stmt {
    this.consume(TokenType.LEFT_PAREN, "Expect '(' after 'if'.");
    const condition = this.expression();
    this.consume(TokenType.RIGHT_PAREN, "Expect ')' after if condition.");

    const thenBranch = this.statement();
    let elseBranch: Stmt | null = null;

    if (this.match(TokenType.ELSE)) {
      elseBranch = this.statement();
    }

    return new IfStmt(condition, thenBranch, elseBranch);
  }

  private printStatement(): Stmt {
    const value = this.expression();

    this.consume(TokenType.SEMICOLON, "Expected ';' after value.");

    return new PrintStmt(value);
  }

  /**
   * whileStmt    -> "while" "(" expression ")" statement ;
   */
  private whileStatement(): Stmt {
    this.consume(TokenType.LEFT_PAREN, "Expect '(' after 'while'.");
    const condition = this.expression();
    this.consume(TokenType.RIGHT_PAREN, "Expect ')' after while condition.");

    const body = this.statement();

    return new WhileStmt(condition, body);
  }

  /**
   * block        -> "{" declaration* "}" ;
   */
  private block(): Array<Stmt> {
    const statements: Array<Stmt> = [];

    while (!this.check(TokenType.RIGHT_BRACE) && !this.isAtEnd()) {
      const declaration = this.declaration();

      if (declaration) {
        statements.push(declaration);
      }
    }

    return statements;
  }

  /**
   * exprStmt     -> expression ";" ;
   */
  private expressionStatement(): Stmt {
    const expr = this.expression();
    this.consume(TokenType.SEMICOLON, "Expected ';' after expression.");
    return new ExpressionStmt(expr);
  }

  /**
   * expression   -> equality ;
   */
  private expression(): Expr {
    return this.equality();
  }

  /**
   * equality     -> comparison ( ( "!=" | "==" ) comparison )* ;
   *
   */
  private equality(): Expr {
    let expr = this.comparison();

    while (this.match(TokenType.BANG_EQUAL, TokenType.EQUAL_EQUAL)) {
      const operator = this.previous();
      const right = this.comparison();
      expr = new BinaryExpr(expr, operator, right);
    }

    return expr;
  }

  /**
   * comparison   -> term ( ( ">" | ">=" | "<" | "<=" ) term )* ;
   *
   */
  private comparison(): Expr {
    let expr = this.term();

    while (
      this.match(TokenType.GREATER, TokenType.GREATER_EQUAL, TokenType.LESS, TokenType.LESS_EQUAL)
    ) {
      const operator = this.previous();
      const right = this.term();

      expr = new BinaryExpr(expr, operator, right);
    }

    return expr;
  }

  /**
   * term         -> factor ( ( "-" | "+" ) factor )* ;
   *
   */
  private term(): Expr {
    let expr = this.factor();

    while (this.match(TokenType.MINUS, TokenType.PLUS)) {
      const operator = this.previous();
      const right = this.factor();

      expr = new BinaryExpr(expr, operator, right);
    }

    return expr;
  }

  /**
   * factor       -> unary ( ( "/" | "*" ) unary )* ;
   *
   */
  private factor(): Expr {
    let expr = this.unary();

    while (this.match(TokenType.SLASH, TokenType.STAR)) {
      const operator = this.previous();
      const right = this.unary();

      expr = new BinaryExpr(expr, operator, right);
    }

    return expr;
  }

  /**
   * unary        -> ( "!" | "-" ) unary | primary ;
   *
   */
  private unary(): Expr {
    if (this.match(TokenType.BANG, TokenType.MINUS)) {
      const operator = this.previous();
      const right = this.unary();
      return new UnaryExpr(operator, right);
    }

    return this.primary();
  }

  /**
   * primary      -> NUMBER | STRING | "true" | "false" | "nil" | "(" expression ")" ;
   *
   */
  private primary(): Expr {
    if (this.match(TokenType.FALSE)) return new LiteralExpr(false);
    if (this.match(TokenType.TRUE)) return new LiteralExpr(true);
    if (this.match(TokenType.NIL)) return new LiteralExpr(null);
    if (this.match(TokenType.NUMBER, TokenType.STRING))
      return new LiteralExpr(this.previous().literal);

    if (this.match(TokenType.LEFT_PAREN)) {
      const expr = this.expression();

      this.consume(TokenType.RIGHT_PAREN, "Expect ')' after expression.");
      return new GroupingExpr(expr);
    }

    throw this.error(this.peek(), 'Expect expression.');
  }

  private match(...types: TokenType[]): boolean {
    for (const type of types) {
      if (this.check(type)) {
        this.advance();
        return true;
      }
    }

    return false;
  }

  private consume<Type extends TokenType>(
    type: Type,
    message: string
  ): Token & {
    type: Type;
  } {
    if (this.check(type)) return this.advance() as Token & { type: Type };

    throw this.error(this.peek(), message);
  }

  private check(type: TokenType): boolean {
    if (this.isAtEnd()) return false;

    return this.peek().type === type;
  }

  private advance(): Token {
    if (!this.isAtEnd()) this.current++;

    return this.previous();
  }

  private previous() {
    return this.tokens[this.current - 1];
  }

  private isAtEnd(): boolean {
    return this.peek().type === TokenType.EOF;
  }

  private peek(): Token {
    return this.tokens[this.current];
  }

  private error(token: Token, message: string) {
    this.onError(token, message);
    return new ParseError();
  }

  private sychronize() {
    this.advance();

    while (!this.isAtEnd()) {
      if (this.previous().type === TokenType.SEMICOLON) return;

      switch (this.peek().type) {
        case TokenType.CLASS:
        case TokenType.FUN:
        case TokenType.VAR:
        case TokenType.FOR:
        case TokenType.IF:
        case TokenType.WHILE:
        case TokenType.PRINT:
          return;
      }

      this.advance();
    }
  }
}
