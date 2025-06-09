import {makeStyles} from '../../utils';

export const styles = makeStyles(({color, spacing}) => ({
  container: {
    padding: spacing.l,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: color.backgroundDark,
    height: 70,
  },
}));
