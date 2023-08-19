package com.craftinginterpreters.lox;

import com.craftinginterpreters.lox.Expr.Binary;
import com.craftinginterpreters.lox.Expr.Grouping;
import com.craftinginterpreters.lox.Expr.Unary;

public class Interpreter implements Expr.Visitor<Object> {

    void interpret(Expr expression) {
        try {
            Object value = evaluate(expression);
            System.out.println(stringify(value));
        } catch (RuntimeError error) {
            Lox.runtimeError(error);
        }
    }

    private String stringify(Object object) {
        if (object == null) return "nil";

        if (object instanceof Double) {
            String text = object.toString();
            if (text.endsWith(".0")) {
                text = text.substring(0, text.length() - 2);
            }
            return text;
        }

        return object.toString();
    }

    @Override
    public Object visitLiteralExpr(Expr.Literal expr) {
        return expr.value;
    }

    @Override
    public Object visitBinaryExpr(Binary expr) {
        var left = evaluate(expr.left);
        var right = evaluate(expr.right);

        switch (expr.operator.type) {
            case GREATER:
                checkNumberOperands(expr.operator, left, right);
                return (double) left > (double) right;

            case GREATER_EQUAL:
                checkNumberOperands(expr.operator, left, right);
                return (double) left >= (double) right;

            case LESS:
                checkNumberOperands(expr.operator, left, right);
                return (double) left < (double) right;

            case LESS_EQUAL:
                checkNumberOperands(expr.operator, left, right);
                return (double) left <= (double) right;

            case EQUAL_EQUAL:
                return isEqual(left, right);

            case BANG_EQUAL:
                return !isEqual(left, right);

            case MINUS:
                checkNumberOperands(expr.operator, left, right);
                return (double) left - (double) right;

            case SLASH:
                checkNumberOperands(expr.operator, left, right);
                return (double) left / (double) right;

            case STAR:
                checkNumberOperands(expr.operator, left, right);
                return (double) left * (double) right;

            case PLUS:
                if (left instanceof Double && right instanceof Double) {
                    return (double) left + (double) right;
                }

                if (left instanceof String && right instanceof String) {
                    return (String) left + (String) right;
                }

                if (left instanceof String && right instanceof Double) {
                    return (String) left + ((double) right + "");
                }

                if (left instanceof Double && right instanceof String) {
                    return ((double) left + "") + (String) right;
                }

                throw new RuntimeError(expr.operator, "Operands must be two numbers or two strings.");
        
            default:
                break;
        }


        return null;
    }

    @Override
    public Object visitGroupingExpr(Grouping expr) {
        return this.evaluate(expr.expression);
    }

    @Override
    public Object visitUnaryExpr(Unary expr) {
        var right = evaluate(expr.right);

        switch (expr.operator.type) {
            case BANG:
                return !isTruthy(right);

            case MINUS:
                checkNumberOperand(expr.operator, right);
                return -(double)right;
        
            default:
                break;
        }

        // not reachable
        return null;
    }

    private void checkNumberOperand(Token operator, Object operand) {
        if (operand instanceof Double) return;
        throw new RuntimeError(operator, "Operand must be a number.");
    }

    private void checkNumberOperands(Token operator, Object a, Object b) {
        if (a instanceof Double && b instanceof Double) return;

        throw new RuntimeError(operator, "Operands must be numbers.");
    }

    private Object evaluate(Expr expr) {
        return expr.accept(this);
    }

    private boolean isTruthy(Object object) {
        if (object == null) return false;
        if (object instanceof Boolean) return (boolean) object;
        return true;
    }

    private boolean isEqual(Object a, Object b) {
        if (a == null && b == null) return true;

        if (a == null) return false;

        return a.equals(b);
    }
}
