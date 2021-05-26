import { Grid } from '@material-ui/core';
import { useSnackbar } from 'components/Feedback';
import { ScreenTitle } from 'components/Screen';
import { SetupContainer, SetupContainerFooterBtnItem, SetupStep } from 'components/Setup';
import { ThemesAccordion } from 'components/Theme';
import { Log } from 'core';
import { eventThemeToUpdate, EventThemeUpdate } from 'core/api';
import React, { FC, useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { routes } from 'screens/consts';
import { useSelector, useStoreManager } from 'store';
import { StyleProps, Styles } from 'styles';
import { errToStr } from 'utils';

const log = Log('screens.Dashboard.Onboarding.Theme');

interface Props extends StyleProps {
  steps: SetupStep[];
  onCloseClick?: () => void;
}

export const OnboardingThemeScreen: FC<Props> = ({ steps, onCloseClick }) => {
  const styles = getStyles();
  const history = useHistory();
  const { showSnackbar } = useSnackbar();

  const [expanded, setExpanded] = useState<string | undefined>();
  const [selected, setSelected] = useState<string | undefined>();
  const [editForm, setEditForm] = useState<EventThemeUpdate | undefined>();
  const [processing, setProcessing] = useState<boolean | undefined>();

  const items = useSelector(s => s.events.themes);
  const manager = useStoreManager();

  useEffect(() => {
    updateData();
  }, []);

  const updateData = async () => {
    try {
      log.debug('updating themes');
      const newItems = await manager.events.updateThemes();
      log.debug('updating themes done');
      if (newItems.length) {
        setExpanded(newItems[0].id);
      }
    } catch (err: unknown) {
      log.err(err);
    }
  };

  const handleSelectedChange = (id?: string) => {
    setSelected(id);
    if (id) {
      const curItem = items.find(itm => itm.id === id);
      if (curItem) {
        setEditForm(eventThemeToUpdate(curItem));
      }
    } else {
      setEditForm(undefined);
    }
  };

  const handleFooterBtnClick = async (btn: SetupContainerFooterBtnItem) => {
    if (btn.id === 'back') {
      history.push(routes.dashboard.onboarding.team);
    }
    if (btn.id === 'continue') {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    if (!editForm) {
      return history.push(routes.dashboard.onboarding.event);
    }
    if (selected) {
      try {
        setProcessing(true);
        log.info('updating theme, id=', selected, ', data=', editForm);
        await manager.events.modifyTheme(selected, editForm);
        log.info('updating theme done, id=', selected);
        showSnackbar(`Theme updated`, 'success');
        setProcessing(false);
        return history.push(routes.dashboard.onboarding.event);
      } catch (err: unknown) {
        setProcessing(false);
        log.err('updating theme err, id=', selected, ', data=', editForm, ', err=', err);
        showSnackbar(`Updating theme error: ${errToStr(err)}`, 'error');
      }
    }
  };

  const leftBtns: SetupContainerFooterBtnItem[] = [
    {
      id: 'back',
      type: 'contained',
      title: 'back',
      startIcon: 'chevron-circle-left',
    },
  ];

  const rightBtns: SetupContainerFooterBtnItem[] = [
    // {
    //   id: 'save',
    //   type: 'text',
    //   title: 'Save & Continue Later',
    // },
    {
      id: 'continue',
      type: 'contained',
      title: 'continue',
      disabled: !selected,
      processing,
      endIcon: 'chevron-circle-right',
    },
  ];

  return (
    <>
      <ScreenTitle title="Select Theme" />
      <SetupContainer
        title="Add theme of your event"
        steps={steps}
        curStepIndex={2}
        onCloseClick={onCloseClick}
        footer={{ leftBtns, rightBtns }}
        onFooterBtnClick={handleFooterBtnClick}
      >
        <Grid style={styles.container}>
          <ThemesAccordion
            items={items}
            expanded={expanded}
            selected={selected}
            editForm={editForm}
            onExpandedChange={setExpanded}
            onSelectedChange={handleSelectedChange}
            onEditFormChange={setEditForm}
          />
        </Grid>
      </SetupContainer>
    </>
  );
};

const getStyles = (): Styles => ({
  container: {
    display: 'flex',
    flexDirection: 'column',
    padding: '25px 0 33px',
  },
});

export default OnboardingThemeScreen;
