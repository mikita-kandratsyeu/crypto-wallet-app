import { IHoldings, IProfile, ISettings } from '../types';

export const holdings: IHoldings[] = [
  {
    id: 'bitcoin',
    qty: 888,
  },
  {
    id: 'ethereum',
    qty: 188,
  },
  {
    id: 'dogecoin',
    qty: 88888,
  },
];

export const profile: IProfile = {
  id: 8888888,
  email: 'byprogrammers@gmail.com',
};

export const settings: ISettings = {
  launchScreen: 'Home',
  currency: 'USD',
  appearance: 'Dark',
  language: 'English',
  faceId: true,
};

const dummyData = {
  holdings,
  profile,
  settings,
};

export default dummyData;
