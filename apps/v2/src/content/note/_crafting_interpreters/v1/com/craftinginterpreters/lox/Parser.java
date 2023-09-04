/**
* Lox grammar:
* 
* program      -> declaration* EOF ;
* declaration  -> funDecl | varDecl | statement ;
* funcDecl     -> "fun" function ;
* function     -> IDENTIFIER "(" parameters? ")" block ;
* parameters   -> IDENTIFIER ( "," IDENTIFIER )* ;
* varDecl      -> "var" IDENTIFIER ( "=" expression )? ";" ;
* statement    -> exprStmt | forStmt | ifStmt | printStmt | returnStmt | whileStmt | block ;
* ifStmt       -> "if" "(" expression ")" statement ( "else" statement )? ;
* returnStmt   -> "return" expression? ";" ;
* whileStmt    -> "while" "(" expression ")" statement ;
* forStmt      -> "for" "(" ( varDecl | exprStmt | ";" ) expression? ";" expression? ")" statement ;
* block        -> "{" declaration* "}" ;
* exprStmt     -> expression ";" ;
* printStmt    -> "print" expression ";" ;
* expression   -> assignment ;
* assignment   -> IDENTIFIER "=" assignment | logic_or ;
* logic_or     -> logic_and ( "or" logic_and )* ;
* logic_and    -> equality ( "and" equality )* ;
* equality     -> comparison ( ( "!=" | "==" ) comparison )* ;
* comparison   -> term ( ( ">" | ">=" | "<" | "<=" ) term )* ;
* term         -> factor ( ( "-" | "+" ) factor )* ;
* factor       -> unary ( ( "/" | "*" ) unary )* ;
* unary        -> ( "!" | "-" ) unary | call ;
* call         -> primary ( "(" arguments? ")" )* ;
* primary      -> NUMBER | STRING | "true" | "false" | "nil" | "(" expression ")" | IDENTIFIER ;


* arguments    -> expression ( "," expression )* ;
*/

package com.craftinginterpreters.lox;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import static com.craftinginterpreters.lox.TokenType.*;

public class Parser {
 private static class ParseError extends RuntimeException {}

 private final List<Token> tokens;
 private int current = 0;

 Parser(List<Token> tokens) {
    this.tokens = tokens;
 }

 /* parse tokens to expression using recursive descent parsing */ 
 List<Stmt> parse() {
   List<Stmt> statements = new ArrayList<Stmt>();

   while (!isAtEnd()) {
      statements.add(declaration());
   }

   return statements;
 }

 private Stmt declaration() {
   try {
      if (match(FUN)) return function("function");
      if (match(VAR)) return varDeclaration();

      return statement();
   } catch (ParseError error) {
      synchronize();
      return null;
   }
 }

 private Stmt.Function function(String kind) {
   Token name = consume(IDENTIFIER, "Expect " + kind + " name.");
   consume(LEFT_PAREN, "Expect '(' after " + kind + " name.");
   List<Token> parameters = new ArrayList<>();
   if (!check(RIGHT_PAREN)) {
      do {
         if (parameters.size() > 255) {
            error(peek(), "Can't have more than 255 parameters.");
         }

         parameters.add(consume(IDENTIFIER, "Expect parameter name."));
      } while (match(COMMA));
   }
   consume(RIGHT_PAREN, "Expect ')' after parameters.");
   consume(LEFT_BRACE, "Expect '{' before " + kind + " body.");
   var body = block();
   return new Stmt.Function(name, parameters, body);
 }

 private Stmt varDeclaration() {
   Token name = consume(IDENTIFIER, "Expect variable name.");

   Expr initializer = null;

   if (match(EQUAL)) {
      initializer = expression();
   }

   consume(SEMICOLON, "Expect ';' after variable declaration.");
   return new Stmt.Var(name, initializer);
 }

 /*
  * statement    -> exprStmt | printStmt ;
  */
 private Stmt statement() {
   if (match(FOR)) return forStatement();
   if (match(IF)) return ifStatement();
   if (match(PRINT)) return printStatement();
   if (match(RETURN)) return returnStatement();
   if (match(WHILE)) return whileStatement();
   if (match(LEFT_BRACE)) return new Stmt.Block(block());

   return expressionStatement();
 }

 private Stmt forStatement() {
   consume(LEFT_PAREN, "Expect '(' after 'for'.");

   Stmt initializer;

   if (match(SEMICOLON)) {
      initializer = null;
   } else if (match(VAR)) {
      initializer = varDeclaration();
   } else {
      initializer = expressionStatement();
   }

   Expr condition = null;

   if (!check(SEMICOLON)) {
      condition = expression();
   }
   consume(SEMICOLON, "Expect ';' after loop condition.");

   Expr increment = null;
   if (!check(RIGHT_PAREN)) {
      increment = expression();
   }
   consume(RIGHT_PAREN, "Expect ')' after for clauses.");

   Stmt body = statement();

   if (increment != null) {
      body = new Stmt.Block(
         Arrays.asList(body, new Stmt.Expression(increment))
      );
   }

   if (condition == null) condition = new Expr.Literal(true);
   body = new Stmt.While(condition, body);

   if (initializer != null) {
      body = new Stmt.Block(Arrays.asList(
         initializer,
         body
      ));
   }

   return body;
 }

 private Stmt ifStatement() {
   consume(LEFT_PAREN, "Expect '(' after 'if'.");
   Expr condition = expression();
   consume(RIGHT_PAREN, "Expect ')' after if condition.");

   Stmt thenBranch = statement();
   Stmt elseBranch = null;

   if (match(ELSE)) {
      elseBranch = statement();
   }

   return new Stmt.If(condition, thenBranch, elseBranch);
 }

 private Stmt whileStatement() {
   consume(LEFT_BRACE, "Expect '(' after 'while'.");
   Expr condition = expression();
   consume(RIGHT_PAREN, "Expect ')' after while condition.");

   Stmt body = statement();

   return new Stmt.While(condition, body);
 }

 private List<Stmt> block() {
   List<Stmt> statements = new ArrayList<>();

   while (!check(RIGHT_BRACE) && !isAtEnd()) {
      statements.add(declaration());
   }

   consume(RIGHT_BRACE, "Expect '}' after block.");

   return statements;
 }

 /*
  * printStmt    -> "print" expression ";" ;
  */
 private Stmt printStatement() {
   Expr value = expression();

   consume(SEMICOLON, "Expected ';' after value.");

   return new Stmt.Print(value);
 }

 private Stmt returnStatement() {
   Token keyword = previous();
   Expr value = null;
   if (!check(SEMICOLON)) {
      value = expression();
   }
   consume(SEMICOLON, "Expect ';' after return value.");
   return new Stmt.Return(keyword, value);
 }

 /*
  * exprStmt     -> expression ";" ;
  */
 private Stmt expressionStatement() {
   Expr expr = expression();
   consume(SEMICOLON, "Expected ';' after expression.");
   return new Stmt.Expression(expr);
 }

 /**
  * expression   -> assignment ;
  */
 private Expr expression() {
    return assignment();
 }

 /**
  * assignment   -> IDENTIFIER "=" assignment | logic_or ;
  */
 private Expr assignment() {
   Expr expr = or();

   if (match(EQUAL)) {
      Token equals = previous();
      Expr value = assignment();

      if (expr instanceof Expr.Variable) {
         Token name = ((Expr.Variable)expr).name;
         return new Expr.Assign(name, value);
      }

      error(equals, "Invalid assignment target.");
   }

   return expr;
 }

 /**
  * logic_or     -> logic_and ( "or" logic_and )* ;
  */
 private Expr or() {
   Expr expr = and();

   while (match(OR)) {
      Token operator = previous();
      Expr right = and();
      expr = new Expr.Logical(expr, operator, right);
   }

   return expr;  
 }

 /**
  * logic_and    -> equality ( "and" equality )* ;
  */
 private Expr and() {
   Expr expr = equality();

   while (match(AND)) {
      Token operator = previous();
      Expr right = equality();
      expr = new Expr.Logical(expr, operator, right);
   }

   return expr;
 }

 /**
  * equality     -> comparison ( ( "!=" | "==" ) comparison )* ;
  * 
  */
 private Expr equality() {
    Expr expr = comparison();

    while (match(BANG_EQUAL, EQUAL_EQUAL)) {
        Token operator = previous();
        Expr right = comparison();
        expr = new Expr.Binary(expr, operator, right);
    }

    return expr;
 }

 /**
  * comparison   -> term ( ( ">" | ">=" | "<" | "<=" ) term )* ;
  * 
  */
 private Expr comparison() {
    Expr expr = term();

    while (match(GREATER, GREATER_EQUAL, LESS, LESS_EQUAL)) {
        Token operator = previous();
        Expr right = term();
        expr = new Expr.Binary(expr, operator, right);
    }

    return expr;
 }

 /**
  * term         -> factor ( ( "-" | "+" ) factor )* ;
  * 
  */
 private Expr term() {
    Expr expr = factor();

    while (match(MINUS, PLUS)) {
        Token operator = previous();
        Expr right = factor();
        expr = new Expr.Binary(expr, operator, right);
    }

    return expr;
 }

 /**
  * factor       -> unary ( ( "/" | "*" ) unary )* ;
  * 
  */
 private Expr factor() {
    Expr expr = unary();

    while (match(SLASH, STAR)) {
        Token operator = previous();
        Expr right = unary();
        expr = new Expr.Binary(expr, operator, right);
    }

    return expr;
 }

 /**
  * unary        -> ( "!" | "-" ) unary | call ;
  * 
  */
 private Expr unary() {
    if (match(BANG, MINUS)) {
        Token operator = previous();
        Expr right = unary();
        return new Expr.Unary(operator, right);
    }

    return call();
 }

 /**
  * call         -> primary ( "(" arguments? ")" )* ;
  */
 private Expr call() {
   Expr expr = primary();

   while (true) {
      if (match(LEFT_PAREN)) {
         expr = finishCall(expr);
      } else {
         break;
      }
   }

   return expr;
 }

 private Expr finishCall(Expr callee) {
   List<Expr> arguments = new ArrayList<>();

   if (!check(RIGHT_PAREN)) {
      do {
         if (arguments.size() >= 255) {
            error(peek(), "Can't have more than 255 arguments.");
         }
         arguments.add(expression());
      } while (match(COMMA));
   }

   Token paren = consume(RIGHT_PAREN, "Expect ')' after arguments.");

   return new Expr.Call(callee, paren, arguments);
 }

 /**
  * primary      -> NUMBER | STRING | "true" | "false" | "nil" | "(" expression ")" ;
  * 
  */
 private Expr primary() {
    if (match(FALSE)) return new Expr.Literal(false);
    if (match(TRUE)) return new Expr.Literal(true);
    if (match(NIL)) return new Expr.Literal(null);

    if (match(NUMBER, STRING)) {
        return new Expr.Literal(previous().literal);
    }

    if (match(LEFT_PAREN)) {
        Expr expr = expression();
        consume(RIGHT_PAREN, "Expect ')' after expression.");
        return new Expr.Grouping(expr);
    }

    if (match(IDENTIFIER)) {
      return new Expr.Variable(previous());
    }

    throw error(peek(), "Expect expression.");
 }

 private boolean match(TokenType... types) {
    for (TokenType type: types) {
        if (check(type)) {
            advance();
            return true;
        }
    }

    return false;
 }

 private Token consume(TokenType type, String message) {
   if (check(type)) return advance();

   throw error(peek(), message);
 }

 private boolean check(TokenType type) {
    if (isAtEnd()) return false;
    return peek().type == type;
 }

 private Token advance() {
    if (!isAtEnd()) current++;
    return previous();
 }

 private boolean isAtEnd() {
    return peek().type == EOF;
 }

 private Token peek() {
    return tokens.get(current);
 }

 private Token previous() {
    return tokens.get(current - 1);
 }

 private ParseError error(Token token, String message) {
   Lox.error(token, message);
   return new ParseError();
 }

 private void synchronize() {
   advance();

   while (!isAtEnd()) {
      if (previous().type == SEMICOLON) return;

      switch (peek().type) {
         case CLASS:
         case FUN:
         case VAR:
         case FOR:
         case IF:
         case WHILE:
         case PRINT:
         case RETURN:
            return;
      }

      advance();
   }
 }
}
