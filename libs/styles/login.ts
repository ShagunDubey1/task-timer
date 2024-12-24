import { Colors, Spacing, Typography } from '@/constants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  wrrapper: {
    alignItems: 'center',
  },
  logoWrapper: {
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.SCALE_10,
    marginTop: Spacing.SCALE_58,
  },
  logo: {
    width: 80,
    height: 80,
  },
  logoText: {
    fontWeight: 'bold',
    fontSize: Typography.FONT_SIZE_24,
    color: Colors.PRIMARY,
    alignSelf: 'center',
  },
  textWrapper: {
    alignItems: 'center',
    marginTop: Spacing.SCALE_12,
    gap: Spacing.SCALE_8,
  },
  bigText: {
    fontFamily: 'bold',
    fontSize: Typography.FONT_SIZE_24,
    color: Colors.BLACK,
  },
  smallText: {
    fontFamily: 'regular',
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.GRAY_MEDIUM,
  },
  inputContainer: {
    marginTop: Spacing.SCALE_58,
    width: '100%',
    paddingHorizontal: Spacing.SCALE_20,
    gap: Spacing.SCALE_16,
  },
  btnWrapper: {
    width: '100%',
    paddingHorizontal: Spacing.SCALE_20,
    marginTop: Spacing.SCALE_58,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.SCALE_40,
  },
  link: {
    fontSize: Typography.FONT_SIZE_14,
    fontFamily: 'bold',
    color: Colors.GRAY_MEDIUM,
  },
  lineWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.SCALE_8,
    paddingHorizontal: Spacing.SCALE_24,
    marginTop: Spacing.SCALE_40,
  },
  horizontalLine: {
    flexBasis: '40%',
    height: 1,
    backgroundColor: Colors.SILVER,
  },
  mainBodyContainer: {
    flex: 1,
    gap: 30,
    width: '100%',
    alignItems: 'center',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    justifyContent: 'flex-start',
    // backgroundColor: Colors.TERTIARY,
    // paddingHorizontal: Sizes.SCREEN_CONTAINER_PADDING,
    // paddingVertical: Sizes.SCREEN_CONTAINER_PADDING + 20,
  },
  formInputsContainer: {
    gap: 15,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});
