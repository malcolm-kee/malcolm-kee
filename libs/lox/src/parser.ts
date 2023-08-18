import type { Token } from './token';
import { Binary, Unary, type Expr, Literal, Grouping } from './expr';
import { TokenType } from './token-type';

class ParseError extends Error {}

export class Parser {
  private current = 0;

  constructor(
    private readonly tokens: ReadonlyArray<Token>,
    private readonly onError: (token: Token, message: string) => void
  ) {}

  parse(): Expr | null {
    try {
      return this.expression();
    } catch (err) {
      if (err instanceof ParseError) {
        return null;
      }
      throw err;
    }
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
      expr = new Binary(expr, operator, right);
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

      expr = new Binary(expr, operator, right);
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

      expr = new Binary(expr, operator, right);
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

      expr = new Binary(expr, operator, right);
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
      return new Unary(operator, right);
    }

    return this.primary();
  }

  /**
   * primary      -> NUMBER | STRING | "true" | "false" | "nil" | "(" expression ")" ;
   *
   */
  private primary(): Expr {
    if (this.match(TokenType.FALSE)) return new Literal(false);
    if (this.match(TokenType.TRUE)) return new Literal(true);
    if (this.match(TokenType.NIL)) return new Literal(null);
    if (this.match(TokenType.NUMBER, TokenType.STRING)) return new Literal(this.previous().literal);

    if (this.match(TokenType.LEFT_PAREN)) {
      const expr = this.expression();

      this.consume(TokenType.RIGHT_PAREN, "Expect ')' after expression.");
      return new Grouping(expr);
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

  private consume(type: TokenType, message: string) {
    if (this.check(type)) return this.advance();

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
}
