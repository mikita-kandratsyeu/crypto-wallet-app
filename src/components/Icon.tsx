// @ts-nocheck
import React from 'react';
import { colors } from '../constants';
import Close from '../../assets/icons/close.svg';
import Briefcase from '../../assets/icons/briefcase.svg';
import Home from '../../assets/icons/home.svg';
import Market from '../../assets/icons/market.svg';
import Profile from '../../assets/icons/profile.svg';
import RightArrow from '../../assets/icons/right-arrow.svg';
import Send from '../../assets/icons/send.svg';
import Trade from '../../assets/icons/trade.svg';
import UpArrow from '../../assets/icons/up-arrow.svg';
import Verified from '../../assets/icons/verified.svg';
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

  const SvgIcon = icons[capitalizeFirstLetter(name)];

  return <SvgIcon fill={color} width={width} height={height} />;
};
