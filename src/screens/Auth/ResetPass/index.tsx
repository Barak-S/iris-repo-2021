import { Grid } from '@material-ui/core';
import { AuthFormContainer, AuthScreenBackground } from 'components/Auth';
import { Logo, ScreenTitle, Title, Text, View, useSnackbar } from 'components/Common';
import { PasswordInput } from 'components/Forms';
import React, { ChangeEvent, FC, useState } from 'react';
import { isCognitoErrResponse, useAuth } from 'core/api';
import { globalStyles, m, StyleProps } from 'styles';
import { errToStr, isDictEmpty, Log, validators } from 'utils';
import { SubmitButton } from 'components/Buttons';

import { styles } from './styles';
import { useQuery } from 'core/navigation';
import { useHistory } from 'react-router-dom';
import { routes } from 'screens/consts';

const log = Log('screens.AuthResetPass');

type Props = StyleProps;

interface FormData {
  password?: string;
  confirmPassword?: string;
}

type FormErrs = Partial<Record<keyof FormData, string>> & { request?: string };

const getFormErrs = (data: FormData): FormErrs | undefined => {
  const confirmPassValidatorsErr = validators.getPasswordErr(data.confirmPassword, {
    required: true,
    requiredMsg: 'Password confirmation',
  });
  const passesNotSameErr = data.password !== data.confirmPassword ? 'Passwords should be the same' : undefined;
  const errs: FormErrs = {
    password: validators.getPasswordErr(data.password, { required: true, requiredMsg: 'Password required' }),
    confirmPassword: confirmPassValidatorsErr || passesNotSameErr,
  };
  return !isDictEmpty(errs) ? errs : undefined;
};

export const AuthResetPass: FC<Props> = () => {
  const query = useQuery();
  const history = useHistory();

  const [data, setData] = useState<FormData>({});
  const [errs, setErrs] = useState<FormErrs | undefined>(undefined);
  const [processing, setProcessing] = useState<boolean>(false);
  const [passVisible, setPassVisible] = useState<boolean>(false);

  const { password, confirmPassword } = data;
  const { forgotPasswordSubmit } = useAuth();
  const { showSnackbar } = useSnackbar();

  const handleTextFieldChanged = (key: keyof FormData) => (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { value } = event.currentTarget;
    setData({ ...data, [key]: value });
  };

  const handleSubmitPress = async () => {
    const curErrs = getFormErrs(data);
    if (curErrs) {
      return setErrs(curErrs);
    }
    if (!password) {
      return;
    }
    const { username, code, email } = query;
    if (!username || !code || !email) {
      return setErrs({ request: 'Required data is not specified at url' });
    }
    log.debug('handle submit press');
    try {
      setErrs(undefined);
      setProcessing(true);

      log.debug('sending forgot password request');
      await forgotPasswordSubmit(username, code, password);
      log.debug('sending forgot password request done');

      showSnackbar('The password has been changed', 'success');
      history.push({ pathname: routes.signin, state: { email } });
    } catch (err) {
      log.err(err);
      setProcessing(false);
      setErrs({ request: isCognitoErrResponse(err) ? err.message : errToStr(err) });
    }
  };

  const submitDissabled = !password || !confirmPassword || !!errs;

  return (
    <>
      <ScreenTitle title="Password Recovery" />
      <AuthScreenBackground>
        <Logo style={styles.logo} />
        <AuthFormContainer style={{ maxWidth: 592 }}>
          <Grid container direction="column" justify="center" style={{ marginBottom: 20 }}>
            <Title type="h3" style={m(globalStyles.authTitle, styles.authTitle)}>
              Reset Your Password
            </Title>
            <Text style={m(globalStyles.authSubtitle, styles.authSubtitle)}>Enter a new password below.</Text>
            <Grid item xs={12} style={globalStyles.inputItem}>
              <PasswordInput
                value={password || ''}
                label="Password"
                disabled={processing}
                visible={passVisible}
                valid={!validators.getPasswordErr(password)}
                error={!!errs?.password}
                helperText={errs?.password}
                InputProps={{ inputProps: { maxLength: 100 } }}
                onChange={handleTextFieldChanged('password')}
                onChangeVisibleClick={() => setPassVisible(val => !val)}
              />
            </Grid>
            <Grid item style={m(globalStyles.inputItem, styles.passHint)}>
              <Text style={globalStyles.passHint}>
                {`Password length must be minimum 8 characters,
                                    should be alphanumeric with 1 special character.`}
              </Text>
            </Grid>
            <Grid item xs={12} style={globalStyles.inputItem}>
              <PasswordInput
                value={confirmPassword || ''}
                label="Confirm Password"
                disabled={processing}
                visible={passVisible}
                error={!!errs?.confirmPassword}
                helperText={errs?.confirmPassword}
                valid={!validators.getPasswordErr(confirmPassword)}
                InputProps={{ inputProps: { maxLength: 100 } }}
                onChange={handleTextFieldChanged('confirmPassword')}
                onChangeVisibleClick={() => setPassVisible(val => !val)}
              />
            </Grid>
          </Grid>
          <Grid container justify="center" spacing={2}>
            <View
              style={errs?.request ? globalStyles.authErrWrap : undefined}
              justifyContent="center"
              alignItems="center"
            >
              {!!errs?.request && <Text style={globalStyles.authErr}>{errs.request}</Text>}
            </View>
          </Grid>
          <Grid container justify="center" spacing={2}>
            <Grid item xs={12} sm={6} style={globalStyles.inputItem}>
              <SubmitButton
                processing={processing}
                disabled={processing || submitDissabled}
                onClick={handleSubmitPress}
              >
                submit
              </SubmitButton>
            </Grid>
          </Grid>
        </AuthFormContainer>
      </AuthScreenBackground>
    </>
  );
};

export default AuthResetPass;
