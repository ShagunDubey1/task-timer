import { useState } from 'react';
import { LoginFormProps } from '../schemas/login.schema';

type InputValidityStateProp = {
  [k in keyof LoginFormProps]: string;
};

export default function useLoginForm(loginDetails: LoginFormProps) {
  const [inputValidity, setInputValidity] = useState<InputValidityStateProp>({
    username: '',
    password: '',
  });

  function validate(): boolean {
    const tempInputValidity: InputValidityStateProp = {
      username: '',
      password: '',
    };

    if (!loginDetails.username)
      tempInputValidity.username = 'Please enter a username.';
    else tempInputValidity.username = '';

    if (!loginDetails.password.length)
      tempInputValidity.password = 'Please enter your password.';
    else tempInputValidity.password = '';

    setInputValidity(tempInputValidity);

    return (
      Object.keys(tempInputValidity).length > 0 &&
      Object.values(tempInputValidity).every(
        (invalidityMessage) => invalidityMessage === ''
      )
    );
  }

  return {
    validate,
    inputValidity: inputValidity,
  } as const;
}
