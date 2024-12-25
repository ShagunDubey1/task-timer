import {
  KeyboardAvoidingView,
  ScrollView,
  Text,
  View,
  Image,
} from 'react-native';
import React, { useCallback, useState } from 'react';
import { Colors, Spacing } from '@/constants';
import { styles } from '@/libs/styles/login';
import { Link, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Logo } from '@/assets/images';
import CustomButton from '@/libs/components/CustomButton';
import { LoginFormProps } from '@/libs/schemas/login.schema';
import { ALERT_TYPE, Dialog } from 'react-native-alert-notification';
import { useMutation } from '@tanstack/react-query';
import QueryKeys from '@/constants/querykeys';
import { loginRequest } from '@/libs/services/login';
import { AxiosError } from 'axios';
import { saveToken } from '@/libs/utils/secureStore';
import literals from '@/constants/literals';
import useLoginForm from '@/libs/hooks/useLoginForm';
import CustomInput from '@/libs/components/CustomInput';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { useAuthStore } from '@/stores/useAuthStore';

const LoginScreen = () => {
  const { setIsAuthenticated } = useAuthStore();
  
  const [loginDetails, setLoginDetails] = useState<LoginFormProps>({
    username: 'mavehealth',
    password: '0Eq2LjfABRY95',
  });

  const LoginForm = useLoginForm(loginDetails);

  const { mutate: loginMutate, status: loginStatus } = useMutation({
    mutationFn: () => loginRequest(loginDetails),
    mutationKey: [QueryKeys.USER_LOGIN],
    onSuccess: async (data) => {
      const { access_token, refresh_token } = data;

      try {
        await saveToken(literals.SecureStorageKeys.ACCESS_TOKEN, access_token);
        await saveToken(
          literals.SecureStorageKeys.REFRESH_TOKEN,
          refresh_token
        );
        setIsAuthenticated(true);
        router.push('/tasks');
      } catch (error) {
        Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Error!',
          textBody: 'Some error occurred while logging in! Please try again.',
          button: 'OK',
        });
        console.log('Error storing auth token - ', error);
      }
    },
    onError: (err) => {
      const error = err as AxiosError;
      console.log(err.message);

      if (error.response?.status === 404) {
        return Dialog.show({
          type: ALERT_TYPE.DANGER,
          title: 'Invalid Credentials',
          textBody: 'Please enter correct username and password!',
          button: 'OK',
        });
      }

      return Dialog.show({
        type: ALERT_TYPE.WARNING,
        title: 'Something went wrong!',
        textBody: 'There was some problem logging in, please try again later.',
        button: 'OK',
      });
    },
  });

  const handleInputChange = useCallback(
    (inputName: keyof LoginFormProps, value: string): void => {
      setLoginDetails((curr) => {
        curr[inputName] = value;
        return { ...curr };
      });
    },
    []
  );

  const onSubmit = () => {
    if (LoginForm.validate()) loginMutate();
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: Colors.WHITE }}
      // behavior="height"
    >
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          backgroundColor: Colors.WHITE,
          padding: Spacing.SCALE_16,
        }}
      >
        <View style={styles.container}>
          {/* --Title-wrapper-- */}
          <View style={styles.wrrapper}>
            <View style={styles.logoWrapper}>
              <Image source={Logo} style={styles.logo} />
              <Text style={styles.logoText}>Task Timer</Text>
            </View>
            <View style={styles.textWrapper}>
              <Text style={styles.bigText}>Welcome Back!</Text>
              <Text style={styles.smallText}>Sign In to your account</Text>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <View style={styles.formInputsContainer}>
              <CustomInput
                placeholder="Email"
                autoCapitalize="none"
                keyboardType="email-address"
                icon={<Entypo name="email" />}
                invalidityStatus={LoginForm.inputValidity['username'] ?? ''}
                onChangeText={(value) => handleInputChange('username', value)}
              />
              <CustomInput
                isPassword
                autoCapitalize="none"
                placeholder="Password"
                keyboardType="default"
                icon={<MaterialIcons name="password" />}
                invalidityStatus={LoginForm.inputValidity['password'] ?? ''}
                onChangeText={(value) => handleInputChange('password', value)}
              />
            </View>
          </View>

          <View style={styles.btnWrapper}>
            <CustomButton
              text="sign in"
              onpress={onSubmit}
              type="primary"
              isLoading={loginStatus === 'pending'}
            />
            <Text style={styles.link}>
              Don’t have account?{' '}
              <Link href="/">
                <Text style={{ color: '#263657' }}>Sing Up</Text>
              </Link>
            </Text>
          </View>
        </View>
      </ScrollView>
      <StatusBar style="dark" />
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
