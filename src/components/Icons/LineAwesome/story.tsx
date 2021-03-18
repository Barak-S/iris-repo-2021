import React from 'react';
import { colors, sbAutoDetectActionProps, Story, StoryMeta } from 'styles';

import LineAwesomeIcon, { LineAwesomeIconProps as Props } from '.';

export default ((): StoryMeta<Props> => ({
  title: 'components/Icons/LineAwesome',
  component: LineAwesomeIcon,
  args: {
    type: 'skull-crossbones',
  },
  argTypes: {
    color: {
      control: 'color',
      defaultValue: colors.back,
    },
    size: {
      control: 'range',
      defaultValue: 30,
      min: 0,
      max: 100,
      step: 1,
    },
  },
  parameters: {
    layout: 'centered',
    ...sbAutoDetectActionProps,
  },
}))();

export const Basic: Story<Props> = props => <LineAwesomeIcon {...props} />;
