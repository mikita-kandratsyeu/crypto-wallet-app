import { Alert } from 'react-native';
import { messages } from '../constants';

const getTotalWallet = (myHoldings: any[]) =>
  myHoldings.reduce((a: number, b: any) => a + (b.total || 0), 0);

const getValueChange = (myHoldings: any[]) =>
  myHoldings.reduce(
    (a: number, b: any) => a + (b.holding_value_change_7d || 0),
    0,
  );

//TODO: Will refactor as a reusable 
const showAlert = () =>
  Alert.alert(messages.titleAlert, messages.bodyAlert, [
    {
      text: messages.buttonAlert,
      onPress: () => null,
      style: 'cancel',
    },
  ]);

export { getTotalWallet, getValueChange, showAlert };
