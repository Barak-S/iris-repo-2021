import { Grid } from '@material-ui/core';
import { Text, Title } from 'components/Common';
import React, { FC } from 'react';
import { colors, StyleProps, Styles } from 'styles';

import { FormTooltip } from '../Tooltip';

interface Props extends StyleProps {
  title?: string;
  description?: string;
  hint?: string;
}

export const FormControlInfo: FC<Props> = ({ title, description, hint }) => {
  const styles = getStyles();
  return (
    <>
      <Grid style={styles.titleWrapper}>
        {title && (
          <Title type="h5" style={styles.title}>
            {title}
          </Title>
        )}
        {hint && <FormTooltip title={hint} />}
      </Grid>
      {description && <Text style={styles.description}>{description}</Text>}
    </>
  );
};

const getStyles = (): Styles => ({
  titleWrapper: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 16,
  },
  title: {
    color: colors.marineBlue,
    fontSize: 'inherit',
    fontWeight: 500,
  },
  description: {
    color: colors.brownishGrey,
    lineHeight: 1.4,
    marginBottom: 20,
  },
});

export type FormControlInfoProps = Props;
export default FormControlInfo;
