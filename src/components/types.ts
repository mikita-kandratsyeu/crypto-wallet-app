import { Animated } from 'react-native';
import { icons } from './Icon';

export type IconTypes = keyof typeof icons;

export interface ChartProps {
  containerStyle?: any;
  chartPrices: any[];
}

export interface BalanceInfoProps {
  title: string;
  displayAmount: string | number;
  changePct: string | number;
  containerStyle?: any;
}

export interface IconProps {
  name: IconTypes;
  width?: number;
  height?: number;
  color: string;
}

export interface IconTextButtonProps {
  label: string;
  icon: IconTypes;
  containerStyle?: any;
  onPress: () => void;
}

export interface TabBarCustomButtonProps {
  children: React.ReactNode;
  onPress: () => void;
}

export interface TabIconProps {
  focused: boolean;
  icon: IconTypes;
  label: string;
  isTrade?: boolean;
}

export interface SwitcherProps {
  scrollX: Animated.Value;
  onPress: (index: number) => void;
}

export interface TextButtonProps {
  label: string;
  onPress: () => void;
  containerStyle?: any;
}

export interface TabIndicatorProps {
  measureLayout: any[];
  scrollX: Animated.Value;
}

export interface SectionTitleProps {
  title: string;
}

export interface SettingProps {
  title: string;
  value?: string;
  switchValue?: boolean;
  type?: 'button' | 'switch' | undefined;
  onPress?: () => void;
  onSwitchValueChange?: (value: boolean) => void;
}
