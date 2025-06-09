import {makeStyles} from '../../utils';

export const styles = makeStyles(({fonts, color, spacing, icons}) => ({
  container: {
    position: 'absolute',
  },
  text: {
    fontSize: fonts.l,
    fontWeight: 'bold',
    color: color.textNormal,
    padding: spacing.s,
    minWidth: 70,
  },
  selectedBox: {
    borderWidth: 0.5,
    borderColor: color.borderDrag,
    borderRadius: spacing.l,
  },
  input: {
    minWidth: 70,
  },
  controlButton: {
    position: 'absolute',
    backgroundColor: color.backgroundDark,
    borderRadius: spacing.l,
    padding: spacing.xs,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 2,
  },

  copyIcon: {top: -20, left: -17},
  deleteIcon: {top: -20, right: -17},

  buttonText: {
    color: 'white',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  resizeHandle: {
    position: 'absolute',
    width: icons.s,
    height: icons.s,
    right: -8,
    bottom: -8,
    backgroundColor: color.resize,
    borderRadius: spacing.s,
    zIndex: 10,
  },
}));
