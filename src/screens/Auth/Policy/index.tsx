import { makeStyles, Theme, useTheme } from '@material-ui/core';
import { Splitter, Text, TextLink, View } from 'components/Common';
import { ContentPolicy } from 'components/Content';
import { BackgroundedContainer } from 'components/Layout';
import { ScreenFooter, ScreenTitle } from 'components/Screen';
import React, { FC } from 'react';
import { routes } from 'screens/consts';
import { colors, StyleProps } from 'styles';

type Props = StyleProps;

export const AuthPolicyScreen: FC<Props> = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <>
      <ScreenTitle title="Privacy Policy" />
      <BackgroundedContainer style={{ minHeight: '100vh', justifyContent: 'flex-start' }}>
        <View className={classes.header} row>
          <Text className={classes.headerText}>{'Have an account?'}</Text>
          <TextLink className={classes.textLink} href={routes.auth.signin}>
            {'log in'}
          </TextLink>
          <Splitter style={{ marginRight: 19 }} />
          <TextLink className={classes.signupLink} href={routes.auth.signup}>
            {'Sign up'}
          </TextLink>
        </View>
        <ContentPolicy />
      </BackgroundedContainer>
      <ScreenFooter theme="light" />
    </>
  );
};

export const useStyles = (theme: Theme) =>
  makeStyles({
    textLink: {
      textTransform: 'capitalize',
      marginRight: 19,
      position: 'relative',
      display: 'block',
    },
    header: {
      position: 'relative',
      top: 0,
      padding: 20,
      width: '100%',
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 15,

      [theme.breakpoints.up('sm')]: {
        justifyContent: 'flex-end',
        padding: '35px 80px',
        fontSize: 18,
      },
    },
    headerText: {
      color: colors.coolGrey,
      marginRight: 17,
    },
    loginLink: {
      textTransform: 'capitalize',
      marginRight: 38,
      position: 'relative',
    },
    signupLink: {
      color: colors.brownishGrey,
    },
  })();

export type AuthPolicyScreenProps = Props;
export default AuthPolicyScreen;
