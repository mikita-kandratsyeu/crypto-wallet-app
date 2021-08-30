import React from 'react';
import { colors } from '../constants';
// @ts-ignore
import Close from '../../assets/icons/close.svg';
// @ts-ignore
import Briefcase from '../../assets/icons/briefcase.svg';
// @ts-ignore
import Home from '../../assets/icons/home.svg';
// @ts-ignore
import Market from '../../assets/icons/market.svg';
// @ts-ignore
import Profile from '../../assets/icons/profile.svg';
// @ts-ignore
import RightArrow from '../../assets/icons/right-arrow.svg';
// @ts-ignore
import Send from '../../assets/icons/send.svg';
// @ts-ignore
import Trade from '../../assets/icons/trade.svg';
// @ts-ignore
import UpArrow from '../../assets/icons/up-arrow.svg';
// @ts-ignore
import Verified from '../../assets/icons/verified.svg';
// @ts-ignore
import WithDraw from '../../assets/icons/withdraw.svg';
import { IconProps } from './types';

const capitalizeFirstLetter = (string: String) =>
  string.charAt(0).toUpperCase() + string.slice(1);

const icons: { [key: string]: any } = {
  Close,
  Briefcase,
  Home,
  Market,
  Profile,
  RightArrow,
  Send,
  Trade,
  UpArrow,
  Verified,
  WithDraw,
};

export const Icon: React.FC<IconProps> = props => {
  const { name, width = 15, height = 15, color = colors.white } = props;

  const Component = icons[capitalizeFirstLetter(name)];

  return Component ? (
    <Component fill={color} width={width} height={height} />
  ) : null;
};
