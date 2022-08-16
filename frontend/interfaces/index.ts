import { TransactionReceipt } from "@taikai/dappkit/dist/src/interfaces/web3-core";

export type ReceiptReactor = (receipt: TransactionReceipt) => {};
export type OnErrorReactor = (error: Error) => {};