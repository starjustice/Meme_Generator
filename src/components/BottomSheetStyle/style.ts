import {makeStyles} from '../../utils';

export const styles = makeStyles(({color, spacing, fonts}) => ({
  container: {
    backgroundColor: color.backgroundDark,
    padding: spacing.l,
    borderTopWidth: 1,
    borderColor: color.border,
    flex: 1,
    justifyContent: 'space-around',
  },
  sliderWrapper: {
    alignItems: 'center',
    paddingHorizontal: spacing.xl,
  },
  slider: {
    width: '100%',
  },
  fontSizeLabel: {
    color: color.backgroundCanvas,
    marginBottom: spacing.l,
    fontSize: fonts.l,
  },
  toggleWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: spacing.m,
  },
  colorPickerWrapper: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: spacing.s,
  },
  colorCircle: {
    width: 30,
    height: 30,
    borderRadius: spacing.xl,
    borderWidth: 1,
    borderColor: color.backgroundCanvas,
  },
  italic: {fontStyle: 'italic'},
  bold: {fontWeight: 'bold'},
}));
