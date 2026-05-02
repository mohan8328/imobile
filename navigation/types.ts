export type RootStackParamList = {
  Main: undefined;
  Notifications: undefined;
  Profile: undefined;
  Search: undefined;
  ScanPay: undefined;
  SendMoney: undefined;
  Bills: undefined;
  Recharge: undefined;
  CardManage: undefined;
  CardDetails: undefined;
};

declare global {
  namespace ReactNavigation {
    interface RootParamList extends RootStackParamList {}
  }
}
