/* eslint-disable import/prefer-default-export */
const getCurrentUser = ({ user }) => {
  const { users, usersLookup } = user;

  return usersLookup[users[0]];
};

export { getCurrentUser };
