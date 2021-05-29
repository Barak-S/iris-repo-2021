import { Grid } from '@material-ui/core';
import { View } from 'components/Common';
import { FormControlSection, FormDragnDropImage, FormSocialsInput, FormTextInput } from 'components/Form';
import { EventProfile } from 'core/api';
import { modCloudinaryUrl } from 'core/cloudinary';
import React, { ChangeEvent, FC } from 'react';
import { ms, StyleProps, Styles, withDensity } from 'styles';
import { GenericFormData, GenericFormErrors, GenericFormProcessing } from 'utils';

type FormData = GenericFormData<EventProfile>;
type FormErrors = GenericFormErrors<EventProfile>;
type FormProcessing = GenericFormProcessing<EventProfile>;

interface Props extends StyleProps {
  data?: FormData;
  errors?: FormErrors;
  processing?: FormProcessing;
  onLogoFileSelect?: (file: File) => void;
  onChange?: (data: FormData) => void;
}

export const EventBasicCreateFromProfile: FC<Props> = ({ style, data, processing, onLogoFileSelect, onChange }) => {
  const handleTextInputChnage = <K extends keyof FormData>(key: K) => (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.currentTarget.value;
    onChange && onChange(data ? { ...data, [key]: val } : { [key]: val });
  };

  const handleDataChnage = <K extends keyof FormData>(key: K) => (val: FormData[K]) => {
    onChange && onChange(data ? { ...data, [key]: val } : { [key]: val });
  };

  return (
    <View style={ms(styles.container, style)}>
      <FormControlSection
        title="Profile"
        hint="Lorem ipsum dolor sit amet."
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elitsed"
      >
        <Grid style={styles.rowBottomIndent} container spacing={2}>
          <Grid item md>
            <FormTextInput label="Phone" value={data?.phone || ''} onChange={handleTextInputChnage('phone')} />
          </Grid>
          <Grid item md>
            <FormTextInput label="Country" value={data?.country || ''} onChange={handleTextInputChnage('country')} />
          </Grid>
        </Grid>
        <Grid style={styles.rowBottomIndent} container spacing={2}>
          <Grid item md>
            <FormTextInput label="State" value={data?.state || ''} onChange={handleTextInputChnage('state')} />
          </Grid>
          <Grid item md>
            <FormTextInput label="City" value={data?.city || ''} onChange={handleTextInputChnage('city')} />
          </Grid>
        </Grid>
        <Grid style={styles.rowBottomIndent} container>
          <FormTextInput label="Contact Email" value={data?.email || ''} onChange={handleTextInputChnage('email')} />
        </Grid>
        <Grid style={styles.rowBottomIndent} container>
          <FormTextInput label="Website" value={data?.website || ''} onChange={handleTextInputChnage('website')} />
        </Grid>
        <Grid container>
          <FormSocialsInput items={data?.socials} onChange={handleDataChnage('socials')} />
        </Grid>
      </FormControlSection>
      <FormControlSection
        title="Logo"
        hint="Lorem ipsum dolor sit amet."
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elitsed"
      >
        <FormDragnDropImage
          style={styles.logo}
          src={data?.logo ? modCloudinaryUrl(data.logo, { transform: { width: withDensity(535), crop: 'fill' } }) : undefined}
          processing={processing?.logo}
          onFileSelect={onLogoFileSelect}
        />
      </FormControlSection>
    </View>
  );
};

const styles: Styles = {
  container: {},
  logo: {
    height: 140,
  },
  rowBottomIndent: {
    marginBottom: 20,
  },
};

export type EventBasicCreateFromProfileProps = Props;
export type EventBasicCreateFromProfileProcessing = FormProcessing;
export default EventBasicCreateFromProfile;
