const getTotalWallet = (myHoldings: any[]) =>
  myHoldings.reduce((a: number, b: any) => a + (b.total || 0), 0);

const getValueChange = (myHoldings: any[]) =>
  myHoldings.reduce(
    (a: number, b: any) => a + (b.holding_value_change_7d || 0),
    0,
  );

export { getTotalWallet, getValueChange };
