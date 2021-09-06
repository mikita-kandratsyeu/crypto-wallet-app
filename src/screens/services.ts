import { Alert, AlertButton } from 'react-native';

const getTotalWallet = (myHoldings: any[]) =>
  myHoldings.reduce((a: number, b: any) => a + (b.total || 0), 0);

const getValueChange = (myHoldings: any[]) =>
  myHoldings.reduce(
    (a: number, b: any) => a + (b.holding_value_change_7d || 0),
    0,
  );

const showAlert = ({
  title,
  body,
  buttons,
}: {
  title: string;
  body: string;
  buttons?: AlertButton[];
}) => Alert.alert(title, body, buttons);

export { getTotalWallet, getValueChange, showAlert };
