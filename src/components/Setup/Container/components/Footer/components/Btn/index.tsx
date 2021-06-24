import { ContainedButton, TextButton } from 'components/Buttons';
import { LineAwesomeIconType } from 'components/Icons';
import React, { FC } from 'react';
import { ms, StyleProps, Styles, colors } from 'styles';

interface Props extends StyleProps {
  item: SetupContainerFooterBtnItem;
  onClick?: (itm: SetupContainerFooterBtnItem) => void;
}

export interface SetupContainerFooterBtnItem {
  id: string;
  type?: 'contained' | 'text';
  title: string;
  disabled?: boolean;
  processing?: boolean;
  startIcon?: LineAwesomeIconType;
  endIcon?: LineAwesomeIconType;
}

export const SetupContainerFooterBtn: FC<Props> = ({ style, item, onClick }) => {
  const { title, disabled, startIcon, endIcon, processing } = item;
  return item.type === 'contained' ? (
    <ContainedButton
      style={ms(styles.container, style)}
      size="medium"
      disabled={disabled}
      startIcon={startIcon}
      processing={processing}
      endIcon={endIcon}
      onClick={() => onClick && onClick(item)}
    >
      {title}
    </ContainedButton>
  ) : (
    <TextButton style={ms(styles.container, styles.textBtn, style)} disabled={disabled} onClick={() => onClick && onClick(item)}>
      {title}
    </TextButton>
  );
};

const styles: Styles = {
  container: {},
  textBtn: {
    paddingLeft: 15,
    paddingRight: 15,
    color: colors.IRISteal,
  },
};

export type SetupContainerFooterBtnProps = Props;
export default SetupContainerFooterBtn;
