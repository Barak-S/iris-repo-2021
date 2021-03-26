import { makeStyles, Theme, useTheme } from '@material-ui/core';
import { Title } from 'components/Common';
import { DashboardScreenContainer } from 'components/Dashboard';
import { useSnackbar } from 'components/Feedback';
import { AccordionSections, FolderTabs } from 'components/Navigation';
import { ProfileAccountSection, ProfilePassSection, ProfileSettingsSection } from 'components/Profile';
import { ScreenTitle } from 'components/Screen';
import { Log } from 'core';
import { AccountProfilePatch, accountProfileToPatch } from 'core/api';
import React, { FC, useState } from 'react';
import { useSelector, useStoreManager } from 'store';
import { colors, mx, StyleProps, Styles, useScreenSizes } from 'styles';

type Props = StyleProps;

const log = Log('screens.DashboardProfile');

export const DashboardProfileScreen: FC<Props> = ({ style }) => {
  const manager = useStoreManager();
  const curProfile = useSelector(s => s.profile.data);
  const [data, setData] = useState<AccountProfilePatch>(accountProfileToPatch(curProfile));

  const [processing, setProcessing] = useState<boolean>(false);
  const theme = useTheme();
  const classes = useStyles(theme);
  const { showSnackbar } = useSnackbar();
  const { isMobile } = useScreenSizes();

  /**
   * Handlers
   */

  const handleChange = (newData: AccountProfilePatch) => {
    setData({ ...data, ...newData });
  };

  const handleSubmit = async () => {
    try {
      setProcessing(true);
      log.info('submiting data');
      await manager.profile.modify(data);
      log.info('submiting data onde');
      setProcessing(false);
      showSnackbar('Profile has been updated!', 'success');
    } catch (err: unknown) {
      log.info('submiting data err=', err);
      setProcessing(false);
      showSnackbar('Saving data error', 'error');
    }
  };

  if (!curProfile) return null;

  return (
    <>
      <ScreenTitle title="Profile" />
      <DashboardScreenContainer style={style} className={classes.container}>
        <Title className={classes.title} type="h1">
          {'Profile'}
        </Title>
        {!isMobile ? (
          <FolderTabs
            style={styles.tabs}
            values={[
              {
                id: 0,
                name: 'Account',
                content: (
                  <ProfileAccountSection
                    profile={curProfile}
                    data={data}
                    processing={processing}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                  />
                ),
              },
              { id: 1, name: 'Password', content: <ProfilePassSection /> },
              {
                id: 2,
                name: 'Settings',
                content: (
                  <ProfileSettingsSection data={data} processing={processing} onChange={handleChange} onSubmit={handleSubmit} />
                ),
              },
            ]}
          />
        ) : (
          <AccordionSections
            style={styles.accordion}
            className={classes.accordion}
            sections={[
              {
                id: 0,
                title: 'Account',
                content: (
                  <ProfileAccountSection
                    profile={curProfile}
                    data={data}
                    processing={processing}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                  />
                ),
              },
              { id: 1, title: 'Password', content: <ProfilePassSection /> },
              {
                id: 2,
                title: 'Setting',
                content: (
                  <ProfileSettingsSection data={data} processing={processing} onChange={handleChange} onSubmit={handleSubmit} />
                ),
              },
            ]}
          />
        )}
      </DashboardScreenContainer>
    </>
  );
};

const styles: Styles = {
  tabs: {},
  accordion: {
    color: colors.brownishGrey,
    borderRadius: 10,
    minHeight: 76,
    background: 'linear-gradient(90deg, rgba(242,243,244,1) 0%, rgba(221,223,225,1) 100%)',
    boxShadow: 'none',
    fontWeight: 400,
    marginBottom: 5,
    marginTop: 0,
  },
};

const useStyles = (theme: Theme) =>
  makeStyles({
    container: {
      [theme.breakpoints.down('sm')]: {
        padding: '25px 10px',
      },
    },
    title: {
      ...mx.font(50, colors.marineBlue),
      marginBottom: 38,
      [theme.breakpoints.down('sm')]: {
        ...mx.font(30, colors.marineBlue),
        marginBottom: 12,
      },
    },
    accordion: {
      height: 76,
      borderTopRightRadius: 10,
      borderTopLeftRadius: 10,
      '&:hover': {
        background: colors.paleGrey,
      },
    },
  })();

export type DashboardProfileScreenProps = Props;
export default DashboardProfileScreen;
