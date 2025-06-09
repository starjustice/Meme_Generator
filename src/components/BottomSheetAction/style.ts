import {makeStyles} from '../../utils';

export const styles = makeStyles(({color, spacing}) => ({
  container: {
    borderTopLeftRadius: spacing.xl,
    borderTopRightRadius: spacing.xl,
    padding: spacing.xl,
    backgroundColor: color.backgroundDark,
  },

  option: {
    paddingVertical: spacing.xl,
    borderBottomWidth: 1,
    borderBottomColor: color.border,
    backgroundColor: 'transparent',
  },
}));
