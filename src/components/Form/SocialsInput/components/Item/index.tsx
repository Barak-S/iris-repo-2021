import { IconButton, makeStyles } from '@material-ui/core';
import { View } from 'components/Common';
import { FormSocialSelect, FormTextInput } from 'components/Form';
import { LineAwesomeIcon } from 'components/Icons';
import { Social, SocialType } from 'core/api';
import React, { ChangeEvent, FC } from 'react';
import { colors, ms, mx, StyleProps, Styles, useScreenSizes } from 'styles';
import { isStr } from 'utils';

interface Props extends StyleProps {
  item: Social;
  onChange: (newItem: Social) => void;
  onRemove: (item: Social) => void;
}

const isSocialType = (val: unknown): val is SocialType =>
  isStr(val) && ['facebook', 'twitter', 'linkedin', 'instagram', 'google', 'youtube', 'custom'].includes(val);

const socialNameToPlaceholder = (val: string): string => {
  switch (val) {
    case 'twitter':
      return 'https://twitter.com/...';
    case 'facebook':
      return 'https://facebook.com/...';
    case 'instagram':
      return 'https://instagram.com/...';
    case 'linkedin':
      return 'https://linkedin.com/in/...';
    case 'youtube':
      return 'https://www.youtube.com/channel/...';
    default:
      return 'https://';
  }
};

export const FormSocialInput: FC<Props> = ({ item, style, onRemove, onChange }) => {
  const handleUrlChange = (e: ChangeEvent<HTMLInputElement>) => onChange({ ...item, url: e.currentTarget.value });

  const handleSocialChange = (val: SocialType | undefined) => {
    if (val) {
      onChange({ ...item, name: val });
    }
  };

  const { isMobile } = useScreenSizes();
  const styles = getStyles(isMobile);
  const classes = useStyles();

  return (
    <View style={ms(styles.container, style)} row={!isMobile} column={isMobile} alignItems={!isMobile ? 'center' : 'flex-start'}>
      <FormSocialSelect
        style={styles.select}
        classes={{
          iconBtn: classes.selectAdornment,
          root: classes.selectRoot,
        }}
        value={isSocialType(item.name) ? item.name : 'custom'}
        onChange={handleSocialChange}
      />
      <FormTextInput
        style={styles.input}
        fullWidth
        value={item.url}
        onChange={handleUrlChange}
        placeholder={socialNameToPlaceholder(item.name)}
      />
      <IconButton size="small" onClick={() => onRemove(item)} style={styles.removeBtn}>
        <LineAwesomeIcon type="times-circle" />
      </IconButton>
    </View>
  );
};

const getStyles = (isMobile: boolean): Styles => ({
  container: {},
  select: {
    color: colors.brownishGrey,
    maxWidth: 190,
    marginRight: isMobile ? 0 : 20,
    marginBottom: isMobile ? 20 : 0,
  },
  input: {
    marginRight: isMobile ? 0 : 20,
    marginBottom: isMobile ? 20 : 0,
  },
  removeBtn: {
    ...mx.square(24),
  },
});

const useStyles = () =>
  makeStyles({
    selectAdornment: {
      '&.MuiButtonBase-root': {
        background: colors.veryLightPinkThree,
      },
    },
    selectRoot: {
      fontSize: 16,
    },
  })();

export default FormSocialInput;
