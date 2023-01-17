import { colors } from '../../theme';

export const statusColors = {
  approved: { color: colors.statusGreen },
  rejected: { color: colors.statusOrange },
  pending: { color: colors.greyGrey },
  received: { color: colors.greyGrey },
};

export const statusText = {
  approved: 'prescribed',
  rejected: 'not prescribed',
  pending: 'Pending',
  received: 'Received',
};
