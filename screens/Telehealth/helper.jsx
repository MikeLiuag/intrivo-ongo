export const displayNameToName = (displayName, list) =>
  list.filter((e) => e.displayName === displayName)[0].name;

export default { displayNameToName };
