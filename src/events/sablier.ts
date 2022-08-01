
export interface CancelStreamEvent { returnValues: {'streamId': number;'sender': string;'recipient': string;'senderBalance': number;'recipientBalance': number;} }
export interface CreateStreamEvent { returnValues: {'streamId': number;'sender': string;'recipient': string;'deposit': number;'tokenAddress': string;'startTime': number;'stopTime': number;} }
export interface WithdrawFromStreamEvent { returnValues: {'streamId': number;'recipient': string;'amount': number;} }