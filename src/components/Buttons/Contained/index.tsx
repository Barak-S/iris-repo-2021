import { Button, CircularProgress, makeStyles } from '@material-ui/core';
import { LineAwesomeIcon, LineAwesomeIconType } from 'components/Icons';
import React, { FC } from 'react';
import { colors, mc, ms, StyleProps, Styles, useHover } from 'styles';
import { select } from 'utils';

interface Props extends StyleProps {
  className?: string;
  disabled?: boolean;
  color?: Color;
  size?: Size;
  shadow?: boolean;
  processing?: boolean;
  startIcon?: LineAwesomeIconType;
  endIcon?: LineAwesomeIconType;
  onClick?: () => void;
}

type Color = 'inherit' | 'primary' | 'secondary' | 'default' | 'red';
type Size = 'medium' | 'large';

export const ContainedButton: FC<Props> = ({
  className,
  style,
  disabled,
  startIcon,
  endIcon,
  shadow = true,
  color = 'primary',
  processing,
  size = 'large',
  children,
  onClick,
}) => {
  const classes = useStyles();
  const mainColor = select(color, {
    default: undefined,
    inherit: undefined,
    primary: undefined,
    secondary: undefined,
    red: colors.rustyRed,
  });
  const hoverColor = select(color, {
    default: colors.coolBlueTwo,
    inherit: colors.coolBlueTwo,
    primary: colors.coolBlueTwo,
    secondary: undefined,
    red: colors.withAlpha(colors.rustyRed, 0.7),
  });
  const styles = getStyles(mainColor, hoverColor, shadow);
  const { hover, hoverProps } = useHover();
  return (
    <Button
      className={mc(size === 'medium' && classes.containerMedium, size === 'large' && classes.containerLarge, className)}
      style={ms(styles.container, hover && styles.hover, style)}
      variant="contained"
      color={color !== 'red' ? color : undefined}
      disabled={disabled}
      startIcon={startIcon && <LineAwesomeIcon type={startIcon} />}
      endIcon={endIcon && <LineAwesomeIcon type={endIcon} />}
      onClick={onClick}
      {...hoverProps}
    >
      {processing ? <CircularProgress color="secondary" size={20} /> : children}
    </Button>
  );
};

const getStyles = (mainColor: string | undefined, hoverColor: string | undefined, shadow: boolean): Styles => ({
  container: {
    width: '100%',
    color: colors.white,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    boxShadow: shadow ? `0 3px 5px 0 ${colors.withAlpha(colors.black, 0.3)}` : undefined,
    borderRadius: 6,
    backgroundColor: mainColor,
  },
  hover: {
    backgroundColor: hoverColor,
  },
});

const useStyles = makeStyles({
  containerLarge: {
    minHeight: 52,
    fontSize: 15,
    lineHeight: 1.4,
    '& .MuiIcon-root': {
      transform: 'translateY(-1px)',
    },
  },
  containerMedium: {
    height: 34,
    fontSize: 13,
    '& .MuiButton-label': {
      display: 'flex',
      alignItems: 'center',
      height: '100%',
    },
    '& .MuiIcon-root': {
      fontSize: 'inherit',
      marginTop: -2,
    },
  },
});

export type ContainedButtonProps = Props;
export default ContainedButton;
