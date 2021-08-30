export interface Holdings {
  id: string;
  qty: number;
}

export interface Profile {
  id: number;
  email: string;
}

export interface Settings {
  launchScreen: string;
  currency: string;
  appearance: string;
  language: string;
  faceId: boolean;
}

export const holdings: Holdings[] = [
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

export const profile: Profile = {
  id: 8888888,
  email: 'byprogrammers@gmail.com',
};

export const settings: Settings = {
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
