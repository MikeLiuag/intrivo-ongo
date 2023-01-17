const special = [
  'zeroth',
  'first',
  'second',
  'third',
  'fourth',
  'fifth',
  'sixth',
  'seventh',
  'eighth',
  'ninth',
  'tenth',
  'eleventh',
  'twelfth',
  'thirteenth',
  'fourteenth',
  'fifteenth',
  'sixteenth',
  'seventeenth',
  'eighteenth',
  'nineteenth',
];
const deca = ['twent', 'thirt', 'fort', 'fift', 'sixt', 'sevent', 'eight', 'ninet'];

export const stringifyNumber = (n) => {
  if (n < 20) return special[n];
  if (n % 10 === 0) return `${deca[Math.floor(n / 10) - 2]}ieth`;
  return `${deca[Math.floor(n / 10) - 2]}y-${special[n % 10]}`;
};

// Apply styles to a translation
// How to call:
//  <Text style={...styles}>
//    {parseHtmlForBold(t(description), tagStyleObj).map(e => createElement(Text, {style: e.style}, e.child))}
//  </Text>
// tagStyleObj: an object that contains a key which represents the tag to modify,
//  and a value that is the style that should be applied to the text between the tags.
//  For exapmle, to apply red font, the text would contain: <red>Turn this text red</red>
//    and the tagstyleobj = { red: {color: 'red' } }.
//    The tagStyleObj can contain multiple tags, each having multiple styles, but tags
//      cannot be nested
export const parseHtmlForTags = (
  stringToParse = '',
  tagStyleObj = { b: { fontFamily: 'Museo_700' }, a: { fontFamily: 'Museo_700' } }
) => {
  const tagsToFind = Object.keys(tagStyleObj);

  const validURL = `[A-Za-z0-9-_.!~*'()/:?#&=[\\]]*`;

  const reOpeningTags = '<'
    .concat(tagsToFind.reduce((acc, t) => acc.concat('|').concat(t), '(b'))
    .concat(`)\\s?([a-zA-Z]+="${validURL}")*>`);
  const reMiddle = '(.*?)';
  const reClosingTags = '</'
    .concat(tagsToFind.reduce((acc, t) => acc.concat('|').concat(t), '(b'))
    .concat(')>');
  const re = reOpeningTags.concat(reMiddle).concat(reClosingTags);

  const matches = stringToParse?.match(new RegExp(re, 'g')) || [];

  const elements = [];
  let tempString = stringToParse;

  // for each match, search the string for the match, and split the string into 3 parts
  //    before the match
  //    the match
  //    after the match
  //  Repeat the process for the string after the match
  matches.forEach((m) => {
    const tagToSearch = m;

    const indexOfMatch = tempString.indexOf(tagToSearch);
    const s = [
      tempString.slice(0, indexOfMatch),
      tempString.slice(indexOfMatch, indexOfMatch + tagToSearch.length),
      tempString.slice(indexOfMatch + tagToSearch.length),
    ];

    const match = tagToSearch.match(new RegExp(re, ''));
    const tag = match[1];

    const attrs = {};
    if (match[2]) {
      const [, attrKey, attrValue] = match[2].match(new RegExp(`([a-zA-Z]+)="(${validURL})"`, ''));
      attrs[attrKey] = attrValue;
    }

    const styleToApply = tagStyleObj[tag];
    elements[elements.length] = { style: {}, child: s[0] };
    elements[elements.length] = {
      name: tag,
      attributes: attrs,
      style: styleToApply,
      child: match[3],
    };
    tempString = s[2] || '';
  });

  if (tempString.length > 0) {
    elements[elements.length] = { style: {}, child: tempString };
  }
  return elements;
};

export const DEFAULT_DOB = '2000-01-01';
export const convertDateStringToLocalTimezoneObject = (dateString) => {
  try {
    // date string is in format YYYY-MM-DD
    const dateComopnents = dateString.split('-');
    if (dateComopnents.length !== 3) return undefined;

    const year = +dateComopnents[0];
    const monthIndex = +dateComopnents[1] - 1;
    const date = +dateComopnents[2];

    const adjustdDateObj = new Date(year, monthIndex, date);

    return adjustdDateObj;
  } catch {
    return undefined;
  }
};

export const convertDateObjectToDateString = (dateObj) => {
  try {
    return `${dateObj.getFullYear()}-${dateObj.getMonth() < 9 ? '0' : ''}${
      dateObj.getMonth() + 1
    }-${dateObj.getDate() < 10 ? '0' : ''}${dateObj.getDate()}`;
  } catch {
    return undefined;
  }
};
