import React, { FC } from 'react';
import { StyleProps } from 'styles';
import { makeStyles, Theme, useTheme } from '@material-ui/core';
import { ContentTerms } from 'components/Content';
import { ScreenTitle } from 'components/Common';
import { BackgroundedContainer } from 'components/Layout';

type Props = StyleProps;

export const DashboardTermsScreen: FC<Props> = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <>
      <ScreenTitle title="Terms" />
      <BackgroundedContainer>
        <ContentTerms className={classes.content} />
      </BackgroundedContainer>
    </>
  );
};

const useStyles = (theme: Theme) =>
  makeStyles({
    content: {
      margin: '55px 35px',
    },
  })();

export type DashboardTermsScreenProps = Props;
export default DashboardTermsScreen;
