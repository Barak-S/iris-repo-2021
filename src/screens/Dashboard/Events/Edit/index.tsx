import { makeStyles, Theme, useTheme } from '@material-ui/core';
import { VerticalSplitter } from 'components/Data';
import { eventToDateStr } from 'components/Event/utils';
import { useSnackbar } from 'components/Feedback';
import { SidebarTabs, SideTab } from 'components/Navigation/SidebarTabs';
import { ScreenFooter, ScreenTitle } from 'components/Screen';
import { Log } from 'core';
import { Event, eventItemToUpdate, EventUpdate } from 'core/api';
import React, { FC, useState } from 'react';
import { Redirect, Route, Switch, useParams } from 'react-router-dom';
import { routes } from 'screens/consts';
import EditSetupSession from 'screens/Dashboard/Session';
import { useSelector, useStoreManager } from 'store';
import { colors, scrollToTop, StyleProps } from 'styles';

import EditEventProfile from './Profile';
import EditEventSettings from './Settings';

const log = Log('screens.Dashboard.events.edit.profile');

type Props = StyleProps;

export const DashboardEventsEditScreen: FC<Props> = () => {
  const theme = useTheme();
  const classes = useStyles(theme);

  const tabs: SideTab[] = [
    {
      index: 0,
      label: 'Profile',
      link: '/profile',
      icon: 'passport',
    },
    {
      index: 1,
      label: 'Settings',
      link: '/settings',
      icon: 'cog',
    },
    {
      index: 2,
      label: 'Registration',
      link: '/registration',
      icon: 'clipboard-list',
    },
    {
      index: 3,
      label: 'Session',
      link: '/sessions',
      icon: 'calendar-plus',
    },
    {
      index: 4,
      label: 'Sponsor',
      link: '/sponsors',
      icon: 'thumbs-up',
    },
  ];

  const { id: itemId } = useParams<{ id: string }>();
  const manager = useStoreManager();
  const { showSnackbar } = useSnackbar();

  const items = useSelector(s => s.events.items);
  const curItem = items.find(itm => itm.id === itemId);

  const [data, setData] = useState<EventUpdate>(eventItemToUpdate(curItem));
  const [processing, setProcessing] = useState<boolean>(false);

  const handleDataChange = (newData: Partial<Event>) => {
    setData(v => ({ ...v, ...newData }));
  };

  const handleSubmitClick = async () => {
    try {
      log.info('updating data');
      setProcessing(true);
      await manager.events.modifyItem(itemId, data);
      setProcessing(false);
      log.info('updating data done');
      showSnackbar('Event updated', 'success');
      scrollToTop();
    } catch (err: unknown) {
      log.err('updating data err=', err);
      setProcessing(false);
      showSnackbar('Updating event error', 'error');
    }
  };

  return (
    <>
      <ScreenTitle />
      <div className={classes.container}>
        <SidebarTabs tabs={tabs} initialRoute={routes.dashboard.events.getEdit(itemId)}>
          <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
            <div className={classes.eventSettingsBanner}>
              <span className={classes.banner}>{'Event Settings'}</span>
              <div className={classes.eventOverview}>
                <span className={classes.eventTitle}>{data.name}</span>
                <VerticalSplitter style={{ height: '100%', paddingLeft: 15 }} />
                <span className={classes.eventDate}>{eventToDateStr(data)}</span>
              </div>
            </div>
            <div className={classes.content}>
              <Switch>
                <Route
                  path={routes.dashboard.events.getEditProfile(itemId)}
                  render={() => (
                    <EditEventProfile
                      data={data}
                      processing={processing}
                      onChange={handleDataChange}
                      onSubmit={handleSubmitClick}
                    />
                  )}
                />
                <Route path={routes.dashboard.events.getEditSettings(itemId)} render={() => <EditEventSettings />} />
                <Route
                  path={routes.dashboard.events.getEditRegistration(itemId)}
                  render={() => <div>{'Edit Registration Page'}</div>}
                />
                <Route path={routes.dashboard.events.getEditSessions(itemId)} render={() => <EditSetupSession />} />
                <Route path={routes.dashboard.events.getEditSponsors(itemId)} render={() => <div>{'Edit Sponsors Page'}</div>} />
                <Redirect to={routes.dashboard.events.getEditProfile(itemId)} />
              </Switch>
            </div>
          </div>
        </SidebarTabs>
      </div>
      <ScreenFooter theme="light" />
    </>
  );
};

const useStyles = (theme: Theme) =>
  makeStyles({
    container: {
      width: '100%',
    },
    eventSettingsBanner: {
      height: 91,
      width: '100%',
      backgroundColor: colors.whiteTwo,
      boxShadow: '0px 3px 4px #0000001D',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
    },
    content: {
      padding: 41,
      paddingTop: 24,
      display: 'flex',
      justifyContent: 'center',
    },
    banner: {
      color: colors.warmPurple,
      fontSize: 12,
      fontWeight: 500,
      textTransform: 'uppercase',
      letterSpacing: '0.96px',
      paddingLeft: 41,
    },
    eventOverview: {
      display: 'flex',
      flexDirection: 'row',
    },
    eventTitle: {
      color: colors.marineBlue,
      fontSize: 22,
      fontWeight: 500,
      paddingLeft: 41,
    },
    eventDate: {
      color: colors.coolBlue,
      fontSize: 22,
      letterSpacing: '1.32px',
      paddingLeft: 12.5,
      fontWeight: 500,
    },
  })();

export default DashboardEventsEditScreen;
