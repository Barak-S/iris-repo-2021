import { View } from 'components/Common';
import { FormControlSection, FormCountryInput, FormDragnDropImage, FormRow, FormTextInput } from 'components/Form';
import { LineAwesomeIcon } from 'components/Icons';
import { OrganizationUpdate } from 'core/api';
import { modCloudinaryUrl } from 'core/cloudinary';
import React, { ChangeEvent, FC } from 'react';
import { buildStyles, colors, ms, StyleProps, withDensity } from 'styles';
import { GenericFormErrors, GenericFormProcessing } from 'utils';

type FormData = OrganizationUpdate;
type FormErrors = GenericFormErrors<FormData>;
type FormProcessing = GenericFormProcessing<FormData>;

interface Props extends StyleProps {
  data?: FormData;
  errors?: FormErrors;
  processing?: FormProcessing;
  onChange?: (data: OrganizationUpdate) => void;
  onLogoFileSelect?: (file: File) => void;
}

interface Props extends StyleProps {
  data?: OrganizationUpdate;
  errors?: GenericFormErrors<OrganizationUpdate>;
  processing?: GenericFormProcessing<OrganizationUpdate>;
  onChange?: (data: OrganizationUpdate) => void;
  onLogoFileSelect?: (file: File) => void;
}

export const OrganizationEditForm: FC<Props> = ({ style, data, errors, processing, onChange, onLogoFileSelect }) => {
  const styles = useStyles();

  const handleTextFieldChanged = (key: keyof OrganizationUpdate) => (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    onChange && onChange({ ...data, [key]: event.currentTarget.value });
  };

  const handleDataChange = <K extends keyof FormData>(key: K) => (val: FormData[K]) => {
    onChange && onChange(data ? { ...data, [key]: val } : { [key]: val });
  };

  return (
    <View style={[styles.container, style]}>
      <FormControlSection borderTop={false} title="Logo" description="Lorem ipsum dolor sit amet, 600 x 200px and 1MB or less">
        <FormDragnDropImage
          style={styles.logo}
          src={data?.logo ? modCloudinaryUrl(data.logo, { transform: { width: withDensity(535), crop: 'fill' } }) : undefined}
          processing={processing?.logo}
          onFileSelect={onLogoFileSelect}
        />
      </FormControlSection>
      <FormControlSection
        borderTop={false}
        title="Info"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elitsed."
      >
        <FormRow>
          <FormTextInput
            required
            label="Name"
            value={data?.name || ''}
            error={!!errors?.name}
            helperText={errors?.name}
            onChange={handleTextFieldChanged('name')}
          />
        </FormRow>
        <FormRow>
          <FormTextInput
            style={styles.half}
            required
            label="phone number"
            value={data?.phone || ''}
            error={!!errors?.phone}
            helperText={errors?.phone}
            onChange={handleTextFieldChanged('phone')}
          />
          <FormCountryInput
            style={ms(styles.half, styles.lastChild)}
            required
            label="country"
            value={data?.country || ''}
            onChange={handleDataChange('country')}
          />
        </FormRow>
        <FormRow>
          <FormTextInput
            style={styles.half}
            required
            label="state"
            value={data?.state || ''}
            error={!!errors?.state}
            helperText={errors?.state}
            onChange={handleTextFieldChanged('state')}
          />
          <FormTextInput
            style={ms(styles.half, styles.lastChild)}
            required
            label="city"
            value={data?.city || ''}
            error={!!errors?.city}
            helperText={errors?.city}
            onChange={handleTextFieldChanged('city')}
          />
        </FormRow>
        <FormRow>
          <FormTextInput
            label="website"
            adornmentType="transparent"
            value={data?.website || ''}
            error={!!errors?.website}
            helperText={errors?.website}
            iconStart={<LineAwesomeIcon type="globe" style={{ color: colors.greyish }} />}
            onChange={handleTextFieldChanged('website')}
          />
        </FormRow>
        <FormRow>
          <FormTextInput
            label="Contact Email"
            adornmentType="transparent"
            value={data?.email || ''}
            error={!!errors?.email}
            helperText={errors?.email}
            iconStart={<LineAwesomeIcon type="envelope-open-text" style={{ color: colors.greyish }} />}
            onChange={handleTextFieldChanged('email')}
          />
        </FormRow>
      </FormControlSection>
    </View>
  );
};

const useStyles = buildStyles(({ isMobile }) => ({
  container: {
    paddingBottom: 56,
  },
  logo: {
    height: 140,
  },
  half: {
    width: '100%',
    maxWidth: isMobile ? '100%' : '48%',
    ...(isMobile && { marginBottom: 30 }),
  },
  lastChild: {
    marginRight: 0,
    marginBottom: 0,
  },
}));

export type OrganizationEditFormData = FormData;
export type OrganizationEditFormErrors = FormErrors;
export type OrganizationEditFormProcessing = FormProcessing;
export default OrganizationEditForm;
