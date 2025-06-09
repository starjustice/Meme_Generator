import {makeStyles} from '../../utils';

export const styles = makeStyles(({color, spacing, canvasSize}) => ({
  wrapper: {
    flex: 1,
    backgroundColor: color.backgroundLighterCanvas,
  },
  gestureArea: {
    flex: 1,
  },
  canvas: {
    width: canvasSize.width,
    height: canvasSize.height,
    alignSelf: 'center',
    marginTop: '40%',
    backgroundColor: color.backgroundCanvas,
    borderRadius: spacing.xxl,
    overflow: 'visible',
    borderWidth: 1,
    borderColor: color.border,
  },
}));
