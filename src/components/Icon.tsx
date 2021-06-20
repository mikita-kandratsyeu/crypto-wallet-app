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

import { iconTypes } from '../types';

export interface IIconProps {
  name: iconTypes;
  width: number;
  height: number;
  color: string;
}

export const Icon: React.FC<IIconProps> = ({
  name,
  width = 15,
  height = 15,
  color = colors.white,
}) => {
  switch (name) {
    case 'close':
      return <Close fill={color} width={width} height={height} />;
    case 'briefcase':
      return <Briefcase fill={color} width={width} height={height} />;
    case 'home':
      return <Home fill={color} width={width} height={height} />;
    case 'market':
      return <Market fill={color} width={width} height={height} />;
    case 'profile':
      return <Profile fill={color} width={width} height={height} />;
    case 'rightArrow':
      return <RightArrow fill={color} width={width} height={height} />;
    case 'send':
      return <Send fill={color} width={width} height={height} />;
    case 'trade':
      return <Trade fill={color} width={width} height={height} />;
    case 'upArrow':
      return <UpArrow fill={color} width={width} height={height} />;
    case 'verified':
      return <Verified fill={color} width={width} height={height} />;
    case 'withdraw':
      return <WithDraw fill={color} width={width} height={height} />;
    default:
      return null;
  }
};
