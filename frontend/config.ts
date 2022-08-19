export interface DappConfiguration {
  chainId: number;
  beproContractAddress: string;
  sablierContractAddress: string;

  autoconnect: boolean;
  switchNetwork: boolean;
  addNetwork: boolean;
  disconnectOnSwitchAccount: boolean;
  disconnectOnChangeNetwork: boolean;
}

export const dappConfig: DappConfiguration = {
  chainId: parseInt((process.env.NEXT_PUBLIC_CHAIN_ID as string) || '1337'),
  beproContractAddress:
    (process.env.NEXT_PUBLIC_BEPRO_CONTRACT_ADDRESS as string) ||
    '0x37ebdd9B2adC5f8af3993256859c1Ea3BFE1465e',
  sablierContractAddress:
    (process.env.NEXT_PUBLIC_SABLIER_CONTRACT_ADDRESS as string) ||
    '0x37ebdd9B2adC5f8af3993256859c1Ea3BFE1465e',
  autoconnect: false,
  switchNetwork: true,
  addNetwork: true,
  disconnectOnSwitchAccount: true,
  disconnectOnChangeNetwork: true,
};
