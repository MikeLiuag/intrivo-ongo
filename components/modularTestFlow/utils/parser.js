import { parse } from './parseModularTestLogic';

const parseForVars = (str, vars = {}) => {
  console.log('*** PARSING', str, vars);
  if (str === undefined || str === null) return null;

  if (typeof str === 'number') return str;

  if (typeof str !== 'string')
    throw new Error(`Input to parseString() must of type string: ${typeof str} ${str}`);

  if (str.substring(0, 2) === '{{' && str.substring(str.length - 2) === '}}') {
    const inside = str.slice(2, str.length - 2);
    console.log('*** ...inside first', inside);
    const condition = parse(inside);
    const val = condition(vars);
    console.log('*** ...returning', val);
    return condition(vars);
  }

  const parsedStr = str.replace(/{{.*}}/g, (match) => {
    const inside = match.slice(2, match.length - 2);
    console.log('*** ...inside second', inside);
    const condition = parse(inside);
    const val = condition(vars);
    console.log('*** ...returning', val);
    return condition(vars);
  });

  console.log('*** ...finished parsing', parsedStr);
  return parsedStr;
};

export default parseForVars;
