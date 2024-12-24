import { ReactElement, useRef, useState, cloneElement } from 'react';
import {
  Text,
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
  NativeSyntheticEvent,
  TextInputFocusEventData,
  TouchableWithoutFeedback,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, Typography } from '@/constants';

interface CustomInputProps extends TextInputProps {
  icon?: ReactElement;
  placeholder: string;
  isPassword?: boolean;
  invalidityStatus?: string;
}

export default function CustomInput({
  icon,
  autoFocus,
  isPassword,
  invalidityStatus,
  ...props
}: CustomInputProps): JSX.Element {
  const inputRef = useRef<TextInput>(null!);
  const [isFocused, setIsFocused] = useState<boolean>(autoFocus || false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(true);
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    setIsFocused(false);
  };

  return (
    <TouchableWithoutFeedback onPress={() => inputRef.current.focus()}>
      <View style={[styles.inputContainer]}>
        <View
          style={[
            styles.inputWrapper,
            {
              alignItems: props.multiline ? 'flex-start' : 'center',
              borderColor: invalidityStatus
                ? Colors.ALERT
                : isFocused
                  ? Colors.PRIMARY
                  : Colors.GRAY_MEDIUM,
              backgroundColor: invalidityStatus
                ? Colors.ALERT_LIGHT
                : isFocused
                  ? Colors.LIGHT_BLUE
                  : Colors.GRAY_LIGHT,
            },
          ]}
        >
          {icon &&
            cloneElement(icon, {
              size: 20,
              color: invalidityStatus
                ? Colors.ALERT
                : isFocused
                  ? Colors.PRIMARY
                  : Colors.GRAY_MEDIUM,
            })}
          <TextInput
            {...props}
            ref={inputRef}
            caretHidden={false}
            style={[
              styles.input,
              { textAlignVertical: props.multiline ? 'top' : 'center' },
            ]}
            selectionColor={Colors.BLACK}
            onBlur={(e) => handleBlur(e)}
            onFocus={(e) => handleFocus(e)}
            secureTextEntry={isPassword && !isPasswordVisible}
          />
          {isPassword && (
            <TouchableWithoutFeedback
              onPress={() => setIsPasswordVisible((curr) => !curr)}
            >
              <Ionicons
                name={!isPasswordVisible ? 'eye-outline' : 'eye-off-outline'}
                size={22}
                color="#b3b3b3"
              />
            </TouchableWithoutFeedback>
          )}
        </View>
        {invalidityStatus ? (
          <View style={styles.invalidityTextWrapper}>
            <Text style={styles.invalidityText}>{invalidityStatus}</Text>
          </View>
        ) : (
          <View></View>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputWrapper: {
    gap: 10,
    paddingHorizontal: Spacing.SCALE_16,
    paddingVertical: Spacing.SCALE_8,
    borderRadius: 8,
    borderWidth: 1.5,
    borderStyle: 'solid',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    backgroundColor: Colors.LIGHT_BLUE,
  },
  invalidityTextWrapper: {
    width: '100%',
    paddingTop: 3,
    paddingHorizontal: 5,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  invalidityText: {
    fontSize: 10,
    color: Colors.ALERT,
  },
  input: {
    fontSize: Typography.FONT_SIZE_14,
    flex: 1,
    color: Colors.PRIMARY,
  },
});
