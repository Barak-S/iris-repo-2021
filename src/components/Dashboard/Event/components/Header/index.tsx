import { Grid, Link, makeStyles, Theme, useTheme } from '@material-ui/core';
import { VerticalSplitter } from 'components/Data';
import { LineAwesomeIcon } from 'components/Icons';
import React, { FC } from 'react';
import { colors, StyleProps } from 'styles';

import ItemMenu from './components/Menu';

interface Props extends StyleProps {
  url: string;
  onClick?: (url: string) => void;
  onEditClick?: () => void;
  onCloneClick?: () => void;
  onArchiveClick?: () => void;
  onRemoveClick?: () => void;
}

export const DashboardEventHeader: FC<Props> = ({
  style,
  url,

  onClick,
  onEditClick,
  onCloneClick,
  onArchiveClick,
  onRemoveClick,
}) => {
  const theme = useTheme();
  const classes = useStyles(theme);

  return (
    <Grid className={classes.container} style={style}>
      <input type="text" onClick={() => !!onClick && onClick(url)} className={classes.input} value={url} disabled />
      <Link href={url} target="_blank">
        <LineAwesomeIcon className={classes.copyIcon} type="external-link-alt" />
      </Link>
      <VerticalSplitter style={{ height: 33 }} />
      <ItemMenu
        onEditClick={onEditClick}
        onCloneClick={onCloneClick}
        onArchiveClick={onArchiveClick}
        onRemoveClick={onRemoveClick}
      />
    </Grid>
  );
};

const useStyles = (theme: Theme) =>
  makeStyles({
    container: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      width: '100%',
      [theme.breakpoints.up('md')]: {
        marginBottom: 65,
        justifyContent: 'flex-end',
      },
      [theme.breakpoints.up('lg')]: {
        marginBottom: 0,
      },
    },
    input: {
      width: '100%',
      minWidth: 215,
      border: 'none',
      background: 'none',
      color: colors.marineBlue,
      cursor: 'pointer',
      marginRight: 8,
      textTransform: 'none',
      whiteSpace: 'nowrap',
      textAlign: 'left',
      textOverflow: 'ellipsis',
      fontSize: 15,
      '&:hover': {
        textDecoration: 'none',
      },
      [theme.breakpoints.up('lg')]: {
        minWidth: 'initial',
        textAlign: 'right',
        fontSize: 16,
      },
      '&.MuiLink-root': {
        display: 'flex',
        alignItems: 'center',
        transform: 'translateY(4px)',
        fontSize: 12,
        [theme.breakpoints.up('lg')]: {
          fontSize: 16,
        },
      },
      '& .MuiIcon-root': {
        transform: 'translateY(-2px)',
        fontSize: 16,
        marginLeft: 5,
        [theme.breakpoints.up('lg')]: {
          fontSize: 33,
        },
      },
    },
    copyIcon: {
      color: colors.marineBlue,
      marginRight: 5,
    },
  })();

export type DashboardEventHeaderProps = Props;
export default DashboardEventHeader;
