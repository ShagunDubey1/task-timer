import { StyleSheet, Text, View } from 'react-native';
import React, { ReactNode } from 'react';
import { Colors, Spacing } from '@/constants';

const Overlay = ({ children }: { children: ReactNode }) => {
  return <View style={styles.container}>{children}</View>;
};

export default Overlay;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.WHITE,
    padding: Spacing.SCALE_16,
  },
});
