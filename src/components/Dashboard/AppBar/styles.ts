import { makeStyles, Theme } from '@material-ui/core';
import { colors, mx, Styles } from 'styles';

export const styles: Styles = {
  logoWrap: {
    height: '100%',
    padding: 10,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    ...mx.borderRight(1, 'solid', colors.lightBlueGrey),
    boxSizing: 'border-box',
  },
  rightSection: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 'inherit',
    height: '100%',
  },
  supportLink: {
    height: '100%',
    textDecoration: 'none',
  },
};

export const useStyles = (theme: Theme) =>
  makeStyles({
    menuWrap: {
      height: 60,
      backgroundColor: colors.whiteTwo,
      ...mx.borderBottom(1, 'solid', colors.lightBlueGrey),
      ...mx.borderTop(1, 'solid', colors.lightBlueGrey),
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',
      alignItems: 'center',
      paddingRight: 10,
      fontSize: 20,
      [theme.breakpoints.up('md')]: {
        height: 69,
        fontSize: 18,
      },
      [theme.breakpoints.up('lg')]: {
        height: 73,
        justifyContent: 'space-between',
        paddingRight: 36,
      },
    },
    logo: {
      width: '100%',
      maxWidth: 44,
      [theme.breakpoints.up('lg')]: {
        maxWidth: 50,
      },
    },
    mainSection: {
      position: 'relative',
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'row',
      fontSize: 'inherit',
      [theme.breakpoints.up('lg')]: {},
      '& .MuiTabs-indicator': {
        backgroundColor: 'transparent',
      },
      '& .Mui-selected': {
        backgroundColor: colors.white,
        color: colors.marineBlue,
      },
    },
  })();
