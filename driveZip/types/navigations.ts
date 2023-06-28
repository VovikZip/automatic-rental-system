export type AuthStackParamList = {
    Start: any;
    Login: any;
    Register: undefined
}

export type MainParamList = {
  Home: any;
  Scan: any;
  Rent: undefined;
}

export type AllScreenParamList = {

}

export interface RootStackParamList extends AuthStackParamList, MainParamList  {}

declare global {
    namespace ReactNavigation {
      interface RootParamList extends RootStackParamList {}
    }
  }