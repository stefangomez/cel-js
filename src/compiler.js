function visit(node) {
  switch (node.kind) {
    case "operator":
      return visitOperator(node);
    case "identifier":
      return visitIdentifier(node);
    case "iterable":
      return visitIterable(node);
    case "literal":
      return visitLiteral(node);
    default:
      throw new Error(`Invalid kind ${node.kind}`);
  }
}

function visitLiteral(node) {
  return () => node.value;
}

function visitIdentifier(node) {
  return (ctx) => ctx[node.id];
}

function visitIterable(node) {
  switch (node.type) {
    case "dictionary":
      return (ctx) =>
        node.list
          .map(([k, v]) => [k.id, visit(v)(ctx)])
          .reduce((t, h) => ({ ...t, [h[0]]: h[1] }), {});
    case "map":
      return (ctx) =>
        new Map(node.list.map(([k, v]) => [visit(k)(ctx), visit(v)(ctx)]));
    case "list":
      return (ctx) => node.list.map((i) => visit(i)(ctx));
    default:
      throw new Error(`Invalid iterable type ${node.type}`);
  }
}

function visitOperator(node) {
  switch (node.category) {
    case "binary":
      return visitBinaryOperator(node);
    case "ternary":
      return visitTernaryOperator(node);
    default:
      throw new Error(`unknown operator category ${node.category}`);
  }
}

function visitBinaryOperator(node) {
  switch (node.type) {
    case "and": 
      return visitBinaryOperatorAnd(node);
    case "or": 
      return visitBinaryOperatorOr(node);
    case "equal": 
      return visitBinaryOperatorEqual(node);
    case "notEqual": 
      return visitBinaryOperatorNotEqual(node);
    case "greater":
      return visitBinaryOperatorGreater(node);
    case "greaterOrEqual":
      return visitBinaryOperatorGreatorOrEqual(node);
    case "less":
        return visitBinaryOperatorLess(node);
    case "lessOrEqual":
      return visitBinaryOperatorLessOrEqual(node);
    case "add":
      return visitBinaryOperatorAdd(node);
    case "subtract":
      return visitBinaryOperatorSubtract(node);
    case "multiply":
      return visitBinaryOperatorMultiply(node);
    case "divide":
      return visitBinaryOperatorDivide(node);
    case "remainder":
      return visitBinaryOperatorRemainder(node);
    default:
      throw new Error(`unknown binary operator ${node.type}`)
      
  }
}

function visitTernaryOperator(node) {
  switch (node.type) {
    case "conditional":
      return visitTernaryOperatorConditional(node)
    default:
      throw new Error(`unknown ternary operator ${node.type}`)
      
  }
}

function visitTernaryOperatorConditional(node) {
  const tertiary = visit(node.tertiary)
  const rhs = visit(node.rhs)
  const primary = visit(node.primary)
  return (ctx) => tertiary(ctx) ? rhs(ctx) : primary(ctx)
}


function visitBinaryOperatorSelect(node) {
  const lhs = visit(node.lhs);
  console.log(node.rhs.id);
  return () => {}
}

function visitBinaryOperatorAnd(node) {
  const lhs = visit(node.lhs);
  const rhs = visit(node.rhs);
  return (ctx) => lhs(ctx) && rhs(ctx);
}

function visitBinaryOperatorOr(node) {
  const lhs = visit(node.lhs);
  const rhs = visit(node.rhs);
  return (ctx) => lhs(ctx) || rhs(ctx);
}

function visitBinaryOperatorEqual(node) {
  const lhs = visit(node.lhs);
  const rhs = visit(node.rhs);
  return (ctx) => lhs(ctx) == rhs(ctx);
}

function visitBinaryOperatorNotEqual(node) {
  const lhs = visit(node.lhs);
  const rhs = visit(node.rhs);
  return (ctx) => lhs(ctx) != rhs(ctx);
}

function visitBinaryOperatorLessOrEqual(node) {
  const lhs = visit(node.lhs);
  const rhs = visit(node.rhs);
  return (ctx) => lhs(ctx) <= rhs(ctx);
}

function visitBinaryOperatorGreatorOrEqual(node) {
  const lhs = visit(node.lhs);
  const rhs = visit(node.rhs);
  return (ctx) => lhs(ctx) >= rhs(ctx);
}

function visitBinaryOperatorGreater(node) {
  const lhs = visit(node.lhs);
  const rhs = visit(node.rhs);
  return (ctx) => lhs(ctx) > rhs(ctx);
}

function visitBinaryOperatorLess(node) {
  const lhs = visit(node.lhs);
  const rhs = visit(node.rhs);
  return (ctx) => lhs(ctx) < rhs(ctx);
}

function visitBinaryOperatorAdd(node) {
  const lhs = visit(node.lhs);
  const rhs = visit(node.rhs);
  return (ctx) => lhs(ctx) + rhs(ctx);
}

function visitBinaryOperatorSubtract(node) {
  const lhs = visit(node.lhs);
  const rhs = visit(node.rhs);
  return (ctx) => lhs(ctx) - rhs(ctx);
}

function visitBinaryOperatorMultiply(node) {
  const lhs = visit(node.lhs);
  const rhs = visit(node.rhs);
  return (ctx) => lhs(ctx) * rhs(ctx);
}

function visitBinaryOperatorDivide(node) {
  const lhs = visit(node.lhs);
  const rhs = visit(node.rhs);
  return (ctx) => lhs(ctx) / rhs(ctx);
}

function visitBinaryOperatorRemainder(node) {
  const lhs = visit(node.lhs);
  const rhs = visit(node.rhs);
  return (ctx) => lhs(ctx) % rhs(ctx);
}


export const compile = visit;
