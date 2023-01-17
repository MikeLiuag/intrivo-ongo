const OPERATOR_PRIORITY = {
  or: 1,
  and: 2,
  not: 3,
  '==': 4,
  '=~': 4,
  '!=': 4,
  '>': 4,
  '>=': 4,
  '<': 4,
  '<=': 4,
  '+': 5,
  '-': 5,
  '*': 6,
  '/': 6,
};

class TokenStack {
  constructor() {
    this.stack = [];
  }

  push(element) {
    this.stack.push(element);
  }

  pop() {
    return this.stack.pop();
  }

  check() {
    return this.stack[this.stack.length - 1];
  }
}

class BaseToken {
  get type() {
    return this.constructor.name;
  }

  constructor(character) {
    this.token = character;
  }

  push_to(tokens) {
    this.value = this.token;
    tokens.push(this);
  }
}

class NumberToken extends BaseToken {
  get type() {
    return 'NumberToken';
  }

  append(character) {
    if (!/[0-9.]/.test(character)) return false;
    this.token += character;
    return true;
  }

  push_to(tokens) {
    if (!this.__validate__(this.token)) throw 'parse string error';
    this.value = Number(this.token);
    tokens.push(this);
  }

  __validate__(new_token) {
    return !isNaN(Number(this.token));
  }
}

class BooleanToken extends BaseToken {
  get type() {
    return 'BooleanToken';
  }
}

class OperatorToken extends BaseToken {
  get type() {
    return 'OperatorToken';
  }

  append(character) {
    if (!/[+\\-\\*/=<>~!]/.test(character)) return false;
    this.token += character;
    return true;
  }

  push_to(tokens) {
    if (!this.__validate__(this.token)) throw 'parse string error';
    this.value = this.token;
    this.priority = OPERATOR_PRIORITY[this.value];
    tokens.push(this);
  }

  __validate__(new_token) {
    return ['+', '-', '*', '/', '==', '=~', '!=', '<', '<=', '>', '>='].includes(new_token);
  }
}

class ParenthesesToken extends BaseToken {
  get type() {
    return 'ParenthesesToken';
  }

  append(_character) {
    return false;
  }
}

class VariableToken extends BaseToken {
  get type() {
    return 'VariableToken';
  }

  append(character) {
    if (!/[0-9a-zA-Z._]/.test(character)) return false;
    this.token += character;
    return true;
  }

  __validate__(new_token) {
    return new_token.split('.').every((part) => part != '' && part[0] >= 'a' && part[0] <= 'z');
  }

  push_to(tokens) {
    if (!this.__validate__(this.token)) throw 'parse string error';

    if (this.token == 'true') {
      const token = new BooleanToken();
      token.token = 'true';
      token.value = true;
      tokens.push(token);
      return;
    }

    if (this.token == 'false') {
      const token = new BooleanToken();
      token.token = 'false';
      token.value = false;
      tokens.push(token);
      return;
    }

    if (['not', 'and', 'or'].includes(this.token)) {
      const token = new OperatorToken();
      token.token = this.token;
      token.value = this.token;
      token.priority = OPERATOR_PRIORITY[token.value];
      tokens.push(token);
      return;
    }

    this.value = this.token.split('.');
    tokens.push(this);
  }
}

class IgnoreToken extends BaseToken {
  get type() {
    return 'IgnoreToken';
  }

  append(_character) {
    return false;
  }

  push_to(_tokens) {}
}

class StringToken extends BaseToken {
  get type() {
    return 'StringToken';
  }

  constructor() {
    super('');
  }

  append(character) {
    if (this.ended) return false;

    if (this.escape) {
      this.token += character;
      this.escape = false;
      return true;
    }

    if (character == '\\') {
      this.escape = true;
      return true;
    }

    if (character == '"') {
      this.ended = true;
      return true;
    }
    this.token += character;
    return true;
  }

  push_to(tokens) {
    delete this.ended;
    delete this.escape;
    this.value = this.token;
    tokens.push(this);
  }
}

class RegexToken extends BaseToken {
  get type() {
    return 'RegexToken';
  }

  constructor() {
    super('');
  }

  append(character) {
    if (this.ended) return false;

    if (this.escape) {
      this.token += character;
      this.escape = false;
      return true;
    }

    // if (character == '\\') {
    //   this.escape = true;
    //   return true;
    // }

    if (character == '/') {
      this.ended = true;
      return true;
    }
    this.token += character;
    return true;
  }

  push_to(tokens) {
    delete this.ended;
    delete this.escape;
    this.value = new RegExp(this.token);
    tokens.push(this);
  }
}

function new_token(character, previous) {
  if (character == ' ') {
    return new IgnoreToken();
  }

  if (character >= '0' && character <= '9') {
    return new NumberToken(character);
  }

  if (character == '"') {
    return new StringToken();
  }

  if (previous && previous.value == '=~' && character == '/') {
    return new RegexToken();
  }

  if (['+', '-', '*', '/', '>', '=', '<', '!'].includes(character)) {
    return new OperatorToken(character);
  }

  if (['(', ')'].includes(character)) {
    return new ParenthesesToken(character);
  }

  return new VariableToken(character);
}

function tokenise(str) {
  let current = new IgnoreToken();
  const tokens = [];

  `${str} `.split('').forEach((character) => {
    if (current.append(character)) {
      return;
    }

    current.push_to(tokens);
    current = new_token(character, tokens[tokens.length - 1]);
  });

  return tokens;
}

function to_rpn(tokens) {
  const new_tokens = [];
  const stack = new TokenStack();
  tokens.forEach((token) => {
    if (
      ['BooleanToken', 'NumberToken', 'StringToken', 'VariableToken', 'RegexToken'].includes(
        token.type
      )
    ) {
      new_tokens.push(token);
      return;
    }

    if (token.type == 'ParenthesesToken' && token.value == '(') {
      stack.push(token);
      return;
    }

    if (token.type == 'ParenthesesToken' && token.value == ')') {
      let top = stack.pop();
      while (top.type != 'ParenthesesToken' || top.value != '(') {
        new_tokens.push(top);
        top = stack.pop();
      }
      return;
    }

    if (token.type == 'OperatorToken') {
      let top = stack.check();
      while (top && top.priority > token.priority) {
        new_tokens.push(top);
        stack.pop();
        top = stack.check();
      }
      stack.push(token);
    }
  });

  let top = stack.pop();
  while (top) {
    new_tokens.push(top);
    top = stack.pop();
  }
  return new_tokens;
}

function parse(condition) {
  const tokens = to_rpn(tokenise(condition));
  return (args) => {
    try {
      const stack = [];
      tokens.forEach((token) => {
        if (['BooleanToken', 'NumberToken', 'StringToken', 'RegexToken'].includes(token.type)) {
          stack.push(token.value);
          return;
        }

        if (token.type == 'VariableToken') {
          try {
            const value = token.value.reduce((acc, current) => acc[current], args);
            stack.push(value);
          } catch (err) {
            console.warn('*** ERROR accessing var', token);
            stack.push(undefined);
          }
          return;
        }

        if (token.type == 'OperatorToken' && token.value == 'or') {
          const v2 = stack.pop();
          const v1 = stack.pop();
          stack.push(v1 || v2);
          return;
        }

        if (token.type == 'OperatorToken' && token.value == 'and') {
          const v2 = stack.pop();
          const v1 = stack.pop();
          stack.push(v1 && v2);
          return;
        }

        if (token.type == 'OperatorToken' && token.value == 'not') {
          const v = stack.pop();
          stack.push(!v);
          return;
        }

        if (token.type == 'OperatorToken' && token.value == '+') {
          const v2 = stack.pop();
          const v1 = stack.pop();
          stack.push(v1 + v2);
          return;
        }

        if (token.type == 'OperatorToken' && token.value == '-') {
          const v2 = stack.pop();
          const v1 = stack.pop();
          stack.push(v1 - v2);
          return;
        }

        if (token.type == 'OperatorToken' && token.value == '*') {
          const v2 = stack.pop();
          const v1 = stack.pop();
          stack.push(v1 * v2);
          return;
        }

        if (token.type == 'OperatorToken' && token.value == '/') {
          const v2 = stack.pop();
          const v1 = stack.pop();
          stack.push(v1 / v2);
          return;
        }

        if (token.type == 'OperatorToken' && token.value == '>') {
          const v2 = stack.pop();
          const v1 = stack.pop();
          stack.push(v1 > v2);
          return;
        }

        if (token.type == 'OperatorToken' && token.value == '==') {
          const v2 = stack.pop();
          const v1 = stack.pop();
          stack.push(v1 == v2);
          return;
        }

        if (token.type == 'OperatorToken' && token.value == '!=') {
          const v2 = stack.pop();
          const v1 = stack.pop();
          stack.push(v1 != v2);
          return;
        }

        if (token.type == 'OperatorToken' && token.value == '>') {
          const v2 = stack.pop();
          const v1 = stack.pop();
          stack.push(v1 > v2);
          return;
        }

        if (token.type == 'OperatorToken' && token.value == '>=') {
          const v2 = stack.pop();
          const v1 = stack.pop();
          stack.push(v1 >= v2);
          return;
        }

        if (token.type == 'OperatorToken' && token.value == '<') {
          const v2 = stack.pop();
          const v1 = stack.pop();
          stack.push(v1 < v2);
          return;
        }

        if (token.type == 'OperatorToken' && token.value == '<=') {
          const v2 = stack.pop();
          const v1 = stack.pop();
          stack.push(v1 <= v2);
          return;
        }

        if (token.type == 'OperatorToken' && token.value == '=~') {
          const v2 = stack.pop();
          const v1 = stack.pop();
          stack.push(new RegExp(v2).test(v1 || ''));
        }
      });
      return stack.pop();
    } catch (err) {
      console.warn('*** caught error', err);
      return false;
    }
  };
}

export { parse };
