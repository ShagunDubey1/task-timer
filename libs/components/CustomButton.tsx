import {
  StyleSheet,
  Text,
  TouchableOpacity,
  GestureResponderEvent,
  ActivityIndicator,
} from 'react-native';
import React from 'react';
import { Colors, Spacing, Typography } from '@/constants';
import { isLoaded } from 'expo-font';

interface CustomButtonProps {
  text: string;
  onpress: (event: GestureResponderEvent) => void;
  type: 'primary' | 'secondary' | 'tertiary' | 'disabled';
  isLoading?: boolean;
}

type ButtonStyles = {
  [key in CustomButtonProps['type']]: {
    bg: string;
    txt: string;
  };
};

const buttonStyles: ButtonStyles = {
  primary: {
    bg: Colors.PRIMARY,
    txt: Colors.WHITE,
  },
  secondary: {
    bg: Colors.WHITE,
    txt: Colors.BLACK,
  },
  tertiary: {
    bg: Colors.GRAY_LIGHT,
    txt: Colors.PRIMARY,
  },
  disabled: {
    bg: '#E4E6ED',
    txt: '#888F9E',
  },
};

const CustomButton: React.FC<CustomButtonProps> = ({
  text,
  onpress,
  type,
  isLoading,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: buttonStyles[type].bg }]}
      onPress={onpress}
      disabled={type === 'disabled'}
    >
      {isLoading ? (
        <ActivityIndicator size={'small'} color={Colors.WHITE} />
      ) : (
        <Text style={[styles.btnText, { color: buttonStyles[type].txt }]}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default CustomButton;

const styles = StyleSheet.create({
  button: {
    width: '100%',
    alignItems: 'center',
    paddingVertical: Spacing.SCALE_18,
    borderRadius: 8,
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: Typography.FONT_SIZE_16,
    lineHeight: Typography.LINE_HEIGHT_18,
    textTransform: 'capitalize',
  },
});
