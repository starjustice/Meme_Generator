import {makeStyles} from '../../utils';

export const styles = makeStyles(({spacing, color}) => ({
  base: {
    borderRadius: 30,
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.m,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.s,
  },
  filled: {
    backgroundColor: color.buttonBase,
  },
  outline: {
    borderWidth: 1,
    borderColor: color.buttonBase,
    backgroundColor: 'transparent',
  },
  label: {
    fontWeight: '500',
  },
}));
