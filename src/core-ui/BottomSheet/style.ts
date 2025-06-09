import {makeStyles} from '../../utils';

export const styles = makeStyles(({color, spacing}) => ({
  container: {
    borderTopLeftRadius: spacing.xl,
    borderTopRightRadius: spacing.xl,
    padding: spacing.xl,
    backgroundColor: color.backgroundDark,
  },
}));
