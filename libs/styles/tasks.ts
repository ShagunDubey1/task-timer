import { Colors, Spacing, Typography } from '@/constants';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.FOREGROUND,
    padding: Spacing.SCALE_16,
    width: '100%',
  },
  title: {
    marginVertical: Spacing.SCALE_10,
    fontWeight: '800',
    fontSize: Typography.FONT_SIZE_16,
    color: Colors.PRIMARY,
  },
});