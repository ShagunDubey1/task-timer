import { PixelRatio, Dimensions, ViewStyle } from 'react-native';

const WINDOW_WIDTH = Dimensions.get('window').width;

const guidelineBaseWidth = 376;

export const scaleSize = (size: number): number =>
  (WINDOW_WIDTH / guidelineBaseWidth) * size;

export const scaleFont = (size: number): number =>
  size * PixelRatio.getFontScale();

interface BoxShadowProps {
  color: string;
  offset?: { height: number; width: number };
  radius?: number;
  opacity?: number;
}

export function boxShadow({
  color,
  offset = { height: 2, width: 2 },
  radius = 8,
  opacity = 0.2,
}: BoxShadowProps): ViewStyle {
  return {
    shadowColor: color,
    shadowOffset: offset,
    shadowOpacity: opacity,
    shadowRadius: radius,
    elevation: radius,
  };
}
