import { List, makeStyles, MenuItem, Theme, useTheme } from '@material-ui/core';
import { LineAwesomeIcon, LineAwesomeIconType } from 'components/Icons';
import React, { FC } from 'react';
import { colors, mx, StyleProps } from 'styles';

interface Props extends StyleProps {
  activeTab?: DashboardAppBarBtn;
  setActiveTab?: (name: DashboardAppBarBtn) => void;
  onMenuBtnClick?: (name: DashboardAppBarBtn) => void;
  onClick?: () => void;
  onLogoutClick?: () => void;
  hiddenBtns?: DashboardAppBarBtn[];
  logoutVisible?: boolean;
  iconsVisibile?: boolean;
}

export type DashboardAppBarBtn = 'events' | 'analytics' | 'users' | 'profile' | 'notes' | undefined;

interface BtnData {
  name: DashboardAppBarBtn;
  icon: LineAwesomeIconType;
  label: string;
}

export const AppBarMenu: FC<Props> = ({
  activeTab,
  hiddenBtns,
  logoutVisible = true,
  iconsVisibile = true,
  onClick,
  onLogoutClick,
  onMenuBtnClick,
  setActiveTab,
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const buttons: BtnData[] = [
    {
      name: 'events',
      icon: 'calendar-check',
      label: 'events',
    },
    {
      name: 'analytics',
      icon: 'chart-line',
      label: 'analytics',
    },
    {
      name: 'users',
      icon: 'id-card',
      label: 'user management',
    },
    {
      name: 'profile',
      icon: 'user',
      label: 'profile',
    },
    {
      name: 'notes',
      icon: 'sticky-note',
      label: 'notes',
    },
  ];

  const handleMenuButtonClick = (name: DashboardAppBarBtn) => () => {
    onMenuBtnClick && onMenuBtnClick(name);
    setActiveTab && setActiveTab(name);
  };

  const isBtnHidden = (name: DashboardAppBarBtn) => Boolean(hiddenBtns && hiddenBtns.find(itm => itm === name));

  return (
    <List className={classes.container} component="nav" onClick={onClick}>
      {buttons.map(({ name, icon, label }) => {
        const isSelected = name === activeTab;

        return !isBtnHidden(name) ? (
          <MenuItem key={name} component="button" selected={isSelected} onClick={handleMenuButtonClick(name)}>
            {iconsVisibile && <LineAwesomeIcon type={icon} />}
            {label}
          </MenuItem>
        ) : null;
      })}
      {logoutVisible && (
        <MenuItem component="button" onClick={onLogoutClick}>
          <LineAwesomeIcon type="sign-out-alt" />
          {'logout'}
        </MenuItem>
      )}
    </List>
  );
};

const useStyles = (theme: Theme) =>
  makeStyles({
    container: {
      display: 'flex',
      flexDirection: 'column',
      padding: 0,
      [theme.breakpoints.up('md')]: {
        flexDirection: 'row',
      },
      '& .MuiButtonBase-root': {
        textTransform: 'capitalize',
        display: 'none',
        '&.Mui-selected, &:hover': {
          transition: '0.2s ease-in',
          color: colors.white,
          '&::after': {
            content: '""',
            width: '100%',
            backgroundColor: colors.IRISyellow,
            display: 'block',
            height: 7,
            left: 0,
            top: 65,
            bottom: 0,
            position: 'absolute',
          },
          [theme.breakpoints.up('md')]: {
            backgroundColor: colors.IRISteal,
            fontSize: 18,
          },
        },
        [theme.breakpoints.up('md')]: {
          display: 'flex',
          padding: '0 40px',
          fontWeight: 500,
          fontSize: 18,
          color: colors.tint4,
          ...mx.borderRight(1, 'solid', colors.silver),
        },
        [theme.breakpoints.up('lg')]: {
          padding: '0 70px',
        },
      },
    },
  })();

export type AppBarMenuProps = Props;
export default AppBarMenu;
