import { action } from '@storybook/addon-actions';
import { View } from 'components/Common';
import { LineAwesomeIcon } from 'components/Icons';
import React, { FC, useState } from 'react';
import { sbAutoDetectActionProps, Story, StoryMeta } from 'styles';

import FormPasswordInput, { FormPasswordInputProps as Props } from '.';

export default ((): StoryMeta<Props> => ({
  title: 'components/Form/PasswordInput',
  component: FormPasswordInput,
  args: {
    label: 'Password',
  },
  parameters: {
    layout: 'centered',
    ...sbAutoDetectActionProps,
  },
}))();

const FormPasswordInputWrap: FC<Omit<Props, 'value' | 'onChange' | 'onChangeVisibleClick' | 'visible'>> = props => {
  const [value, setValue] = useState<string>('12345678');
  const [visible, setVisible] = useState<boolean>(false);

  const handleChangeVisibleClick = () => {
    action('onChangeVisibleClick')();
    setVisible(!visible);
  };

  return (
    <FormPasswordInput
      value={value}
      visible={visible}
      onChange={event => setValue(event.currentTarget.value)}
      onChangeVisibleClick={handleChangeVisibleClick}
      {...props}
    />
  );
};

export const Basic: Story<Props> = props => (
  <View column style={{ width: 300 }}>
    <FormPasswordInputWrap {...props} />
    <FormPasswordInputWrap {...props} style={{ marginTop: 30 }} iconStart={<LineAwesomeIcon type="lock" />} />
  </View>
);

export const Valid: Story<Props> = props => (
  <View column style={{ width: 300 }}>
    <FormPasswordInputWrap {...props} valid />
    <FormPasswordInputWrap {...props} style={{ marginTop: 30 }} iconStart={<LineAwesomeIcon type="lock" />} valid />
  </View>
);

// eslint-disable-next-line max-len
const helperText = `Password length must be minimum 8 characters, should be alphanumeric with 1 special character. Password length must be minimum 8 characters, should be alphanumeric with 1 special character.`;

export const Error: Story<Props> = props => (
  <View column style={{ width: 300 }}>
    <FormPasswordInputWrap {...props} error helperText={helperText} />
    <FormPasswordInputWrap
      {...props}
      style={{ marginTop: 30 }}
      iconStart={<LineAwesomeIcon type="lock" />}
      error
      helperText={helperText}
    />
  </View>
);
