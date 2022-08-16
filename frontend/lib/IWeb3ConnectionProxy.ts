import { Web3Connection } from "@taikai/dappkit";

export type Web3ConnectionProxyEvent = ConnectionEvent & DisconnectEvent & ChangeNetworkEvent & ChangeAccountEvent;

export type ConnectionEvent = {
    chainId: number;
    address: string;
}
export type DisconnectEvent = {}

export type ChangeNetworkEvent = {
    chainId: number;
}

export type ChangeAccountEvent = {
    address: string;
}

export interface Web3ConnectionProxyEventReactor {
    onConnectionEvent?(event: ConnectionEvent): void;
    onDisconnectEvent?(event: DisconnectEvent): void;
    onChangeNetworkEvent?(event: ChangeNetworkEvent): void;
    onChangeAccountEvent?(event: ChangeAccountEvent): void;
    onError?(e: Error): void;
}

export interface IWeb3ConnectionProxy {
    connect(): Promise<boolean>;
    disconnect(): void;
    isConnected(): boolean;
    isConnecting(): boolean;
    getAddress(): string;
    getChainId(): number;
    addNetwork(chainId: number): Promise<boolean>;
    switchNetwork(chainId: number): Promise<boolean>;
    onError(e: Error): void;
    subscribe(subscriber: Web3ConnectionProxyEventReactor): void;
    unsubscribe(subscriber: Web3ConnectionProxyEventReactor ): void;
    getConnection(): Web3Connection;
}
