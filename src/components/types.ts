export type iconTypes =
  | 'close'
  | 'briefcase'
  | 'home'
  | 'market'
  | 'profile'
  | 'rightArrow'
  | 'send'
  | 'trade'
  | 'upArrow'
  | 'verified'
  | 'withdraw';

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
  name: iconTypes;
  width: number;
  height: number;
  color: string;
}

export interface IconTextButtonProps {
  label: string;
  icon: iconTypes;
  containerStyle?: any;
  onPress: () => void;
}

export interface TabBarCustomButtonProps {
  children: React.ReactNode;
  onPress: () => void;
}

export interface TabIconProps {
  focused: boolean;
  icon: iconTypes;
  label: string;
  isTrade?: boolean;
}
