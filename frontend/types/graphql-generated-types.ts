
     /**
   * ==================================================================
   * This file is generated by script 'gen-inputs'                     |
   * Do not edit this file directly, any changes will be overwritten   |
   * ==================================================================
   * @generated on 2022-08-18T20:28:15.954Z
   */
  
export type Maybe<T> = T | undefined;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /**
   * ==================================================================
   * This file is generated by script 'gen-inputs'                     |
   * Do not edit this file directly, any changes will be overwritten   |
   * ==================================================================
   * @generated on 2022-08-18T20:28:13.208Z
   */
  DateTime: any;
};

export type BatchPayload = {
  __typename?: 'BatchPayload';
  count: Scalars['Int'];
};

export type DateTimeFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['DateTime']>;
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type EnumStreamStatusFieldUpdateOperationsInput = {
  set?: InputMaybe<StreamStatus>;
};

export type EnumStreamStatusFilter = {
  equals?: InputMaybe<StreamStatus>;
  in?: InputMaybe<Array<StreamStatus>>;
  not?: InputMaybe<NestedEnumStreamStatusFilter>;
  notIn?: InputMaybe<Array<StreamStatus>>;
};

export type IntFieldUpdateOperationsInput = {
  decrement?: InputMaybe<Scalars['Int']>;
  divide?: InputMaybe<Scalars['Int']>;
  increment?: InputMaybe<Scalars['Int']>;
  multiply?: InputMaybe<Scalars['Int']>;
  set?: InputMaybe<Scalars['Int']>;
};

export type IntFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type NestedDateTimeFilter = {
  equals?: InputMaybe<Scalars['DateTime']>;
  gt?: InputMaybe<Scalars['DateTime']>;
  gte?: InputMaybe<Scalars['DateTime']>;
  in?: InputMaybe<Array<Scalars['DateTime']>>;
  lt?: InputMaybe<Scalars['DateTime']>;
  lte?: InputMaybe<Scalars['DateTime']>;
  not?: InputMaybe<NestedDateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars['DateTime']>>;
};

export type NestedEnumStreamStatusFilter = {
  equals?: InputMaybe<StreamStatus>;
  in?: InputMaybe<Array<StreamStatus>>;
  not?: InputMaybe<NestedEnumStreamStatusFilter>;
  notIn?: InputMaybe<Array<StreamStatus>>;
};

export type NestedFloatFilter = {
  equals?: InputMaybe<Scalars['Float']>;
  gt?: InputMaybe<Scalars['Float']>;
  gte?: InputMaybe<Scalars['Float']>;
  in?: InputMaybe<Array<Scalars['Float']>>;
  lt?: InputMaybe<Scalars['Float']>;
  lte?: InputMaybe<Scalars['Float']>;
  not?: InputMaybe<NestedFloatFilter>;
  notIn?: InputMaybe<Array<Scalars['Float']>>;
};

export type NestedIntFilter = {
  equals?: InputMaybe<Scalars['Int']>;
  gt?: InputMaybe<Scalars['Int']>;
  gte?: InputMaybe<Scalars['Int']>;
  in?: InputMaybe<Array<Scalars['Int']>>;
  lt?: InputMaybe<Scalars['Int']>;
  lte?: InputMaybe<Scalars['Int']>;
  not?: InputMaybe<NestedIntFilter>;
  notIn?: InputMaybe<Array<Scalars['Int']>>;
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

/**
 * ==================================================================
 * This file is generated by script 'gen-inputs'                     |
 * Do not edit this file directly, any changes will be overwritten   |
 * ==================================================================
 * @generated on 2022-08-18T20:28:13.273Z
 */
export type Node = {
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  updatedAt: Scalars['DateTime'];
};

export type PageInfo = {
  __typename?: 'PageInfo';
  pageCount?: Maybe<Scalars['Int']>;
  perPage?: Maybe<Scalars['Int']>;
  recordCount?: Maybe<Scalars['Int']>;
};

export type Query = {
  __typename?: 'Query';
  stream: Stream;
  streams: Array<Stream>;
  streamsPageInfo: PageInfo;
  withdrawFromStream: WithdrawFromStream;
  withdrawsFromStream: Array<WithdrawFromStream>;
  withdrawsFromStreamPageInfo: PageInfo;
};


export type QueryStreamArgs = {
  id: Scalars['ID'];
};


export type QueryStreamsArgs = {
  orderBy?: InputMaybe<StreamOrderByWithRelationInput>;
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<StreamWhereInput>;
};


export type QueryStreamsPageInfoArgs = {
  perPage?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<StreamWhereInput>;
};


export type QueryWithdrawFromStreamArgs = {
  id: Scalars['ID'];
};


export type QueryWithdrawsFromStreamArgs = {
  orderBy?: InputMaybe<WithdrawFromStreamOrderByWithRelationInput>;
  page?: InputMaybe<Scalars['Int']>;
  perPage?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<WithdrawFromStreamWhereInput>;
};


export type QueryWithdrawsFromStreamPageInfoArgs = {
  perPage?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<WithdrawFromStreamWhereInput>;
};

export enum QueryMode {
  Default = 'default',
  Insensitive = 'insensitive'
}

export enum SortOrder {
  Asc = 'asc',
  Desc = 'desc'
}

export type Stream = Node & {
  __typename?: 'Stream';
  createdAt: Scalars['DateTime'];
  deposit: Scalars['Int'];
  id: Scalars['ID'];
  recipient: Scalars['String'];
  sender: Scalars['String'];
  startTime: Scalars['DateTime'];
  status: StreamStatus;
  stopTime: Scalars['DateTime'];
  streamId: Scalars['Int'];
  tokenAddress: Scalars['String'];
  updatedAt: Scalars['DateTime'];
  withdrawsFromStream?: Maybe<Array<WithdrawFromStream>>;
};

export type StreamCreateInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  deposit: Scalars['Int'];
  id?: InputMaybe<Scalars['String']>;
  recipient: Scalars['String'];
  sender: Scalars['String'];
  startTime: Scalars['DateTime'];
  status?: InputMaybe<StreamStatus>;
  stopTime: Scalars['DateTime'];
  streamId: Scalars['Int'];
  tokenAddress: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
  withdrawsFromStream?: InputMaybe<WithdrawFromStreamCreateNestedManyWithoutStreamInput>;
};

export type StreamCreateManyInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  deposit: Scalars['Int'];
  id?: InputMaybe<Scalars['String']>;
  recipient: Scalars['String'];
  sender: Scalars['String'];
  startTime: Scalars['DateTime'];
  status?: InputMaybe<StreamStatus>;
  stopTime: Scalars['DateTime'];
  streamId: Scalars['Int'];
  tokenAddress: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type StreamCreateNestedOneWithoutWithdrawsFromStreamInput = {
  connect?: InputMaybe<StreamWhereUniqueInput>;
  connectOrCreate?: InputMaybe<StreamCreateOrConnectWithoutWithdrawsFromStreamInput>;
  create?: InputMaybe<StreamUncheckedCreateWithoutWithdrawsFromStreamInput>;
};

export type StreamCreateOrConnectWithoutWithdrawsFromStreamInput = {
  create: StreamUncheckedCreateWithoutWithdrawsFromStreamInput;
  where: StreamWhereUniqueInput;
};

export type StreamCreateWithoutWithdrawsFromStreamInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  deposit: Scalars['Int'];
  id?: InputMaybe<Scalars['String']>;
  recipient: Scalars['String'];
  sender: Scalars['String'];
  startTime: Scalars['DateTime'];
  status?: InputMaybe<StreamStatus>;
  stopTime: Scalars['DateTime'];
  streamId: Scalars['Int'];
  tokenAddress: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type StreamOrderByWithRelationInput = {
  createdAt?: InputMaybe<SortOrder>;
  deposit?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  recipient?: InputMaybe<SortOrder>;
  sender?: InputMaybe<SortOrder>;
  startTime?: InputMaybe<SortOrder>;
  status?: InputMaybe<SortOrder>;
  stopTime?: InputMaybe<SortOrder>;
  streamId?: InputMaybe<SortOrder>;
  tokenAddress?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
  withdrawsFromStream?: InputMaybe<WithdrawFromStreamOrderByRelationAggregateInput>;
};

export type StreamRelationFilter = {
  is?: InputMaybe<StreamWhereInput>;
  isNot?: InputMaybe<StreamWhereInput>;
};

export enum StreamScalarFieldEnum {
  CreatedAt = 'createdAt',
  Deposit = 'deposit',
  Id = 'id',
  Recipient = 'recipient',
  Sender = 'sender',
  StartTime = 'startTime',
  Status = 'status',
  StopTime = 'stopTime',
  StreamId = 'streamId',
  TokenAddress = 'tokenAddress',
  UpdatedAt = 'updatedAt'
}

export enum StreamStatus {
  Active = 'ACTIVE',
  Canceled = 'CANCELED',
  Paused = 'PAUSED'
}

export type StreamUncheckedCreateWithoutWithdrawsFromStreamInput = {
  createdAt?: InputMaybe<Scalars['DateTime']>;
  deposit: Scalars['Int'];
  id?: InputMaybe<Scalars['String']>;
  recipient: Scalars['String'];
  sender: Scalars['String'];
  startTime: Scalars['DateTime'];
  status?: InputMaybe<StreamStatus>;
  stopTime: Scalars['DateTime'];
  streamId: Scalars['Int'];
  tokenAddress: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type StreamUncheckedUpdateManyInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deposit?: InputMaybe<IntFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  recipient?: InputMaybe<StringFieldUpdateOperationsInput>;
  sender?: InputMaybe<StringFieldUpdateOperationsInput>;
  startTime?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  status?: InputMaybe<EnumStreamStatusFieldUpdateOperationsInput>;
  stopTime?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  streamId?: InputMaybe<IntFieldUpdateOperationsInput>;
  tokenAddress?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type StreamUncheckedUpdateWithoutWithdrawsFromStreamInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deposit?: InputMaybe<IntFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  recipient?: InputMaybe<StringFieldUpdateOperationsInput>;
  sender?: InputMaybe<StringFieldUpdateOperationsInput>;
  startTime?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  status?: InputMaybe<EnumStreamStatusFieldUpdateOperationsInput>;
  stopTime?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  streamId?: InputMaybe<IntFieldUpdateOperationsInput>;
  tokenAddress?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type StreamUpdateInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deposit?: InputMaybe<IntFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  recipient?: InputMaybe<StringFieldUpdateOperationsInput>;
  sender?: InputMaybe<StringFieldUpdateOperationsInput>;
  startTime?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  status?: InputMaybe<EnumStreamStatusFieldUpdateOperationsInput>;
  stopTime?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  streamId?: InputMaybe<IntFieldUpdateOperationsInput>;
  tokenAddress?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  withdrawsFromStream?: InputMaybe<WithdrawFromStreamUpdateManyWithoutStreamNestedInput>;
};

export type StreamUpdateManyMutationInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deposit?: InputMaybe<IntFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  recipient?: InputMaybe<StringFieldUpdateOperationsInput>;
  sender?: InputMaybe<StringFieldUpdateOperationsInput>;
  startTime?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  status?: InputMaybe<EnumStreamStatusFieldUpdateOperationsInput>;
  stopTime?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  streamId?: InputMaybe<IntFieldUpdateOperationsInput>;
  tokenAddress?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type StreamUpdateOneRequiredWithoutWithdrawsFromStreamNestedInput = {
  connect?: InputMaybe<StreamWhereUniqueInput>;
  connectOrCreate?: InputMaybe<StreamCreateOrConnectWithoutWithdrawsFromStreamInput>;
  create?: InputMaybe<StreamUncheckedCreateWithoutWithdrawsFromStreamInput>;
  update?: InputMaybe<StreamUncheckedUpdateWithoutWithdrawsFromStreamInput>;
  upsert?: InputMaybe<StreamUpsertWithoutWithdrawsFromStreamInput>;
};

export type StreamUpdateWithoutWithdrawsFromStreamInput = {
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  deposit?: InputMaybe<IntFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  recipient?: InputMaybe<StringFieldUpdateOperationsInput>;
  sender?: InputMaybe<StringFieldUpdateOperationsInput>;
  startTime?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  status?: InputMaybe<EnumStreamStatusFieldUpdateOperationsInput>;
  stopTime?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  streamId?: InputMaybe<IntFieldUpdateOperationsInput>;
  tokenAddress?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type StreamUpsertWithoutWithdrawsFromStreamInput = {
  create: StreamUncheckedCreateWithoutWithdrawsFromStreamInput;
  update: StreamUncheckedUpdateWithoutWithdrawsFromStreamInput;
};

export type StreamWhereInput = {
  AND?: InputMaybe<Array<StreamWhereInput>>;
  NOT?: InputMaybe<Array<StreamWhereInput>>;
  OR?: InputMaybe<Array<StreamWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  deposit?: InputMaybe<IntFilter>;
  id?: InputMaybe<StringFilter>;
  recipient?: InputMaybe<StringFilter>;
  sender?: InputMaybe<StringFilter>;
  startTime?: InputMaybe<DateTimeFilter>;
  status?: InputMaybe<EnumStreamStatusFilter>;
  stopTime?: InputMaybe<DateTimeFilter>;
  streamId?: InputMaybe<IntFilter>;
  tokenAddress?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  withdrawsFromStream?: InputMaybe<WithdrawFromStreamListRelationFilter>;
};

export type StreamWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
  streamId?: InputMaybe<Scalars['Int']>;
};

export type StringFieldUpdateOperationsInput = {
  set?: InputMaybe<Scalars['String']>;
};

export type StringFilter = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  gt?: InputMaybe<Scalars['String']>;
  gte?: InputMaybe<Scalars['String']>;
  in?: InputMaybe<Array<Scalars['String']>>;
  lt?: InputMaybe<Scalars['String']>;
  lte?: InputMaybe<Scalars['String']>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars['String']>>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type TransactionBlockStatusCreateInput = {
  blockNumber: Scalars['Int'];
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  txIndex: Scalars['Int'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type TransactionBlockStatusCreateManyInput = {
  blockNumber: Scalars['Int'];
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  txIndex: Scalars['Int'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type TransactionBlockStatusOrderByWithRelationInput = {
  blockNumber?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  txIndex?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum TransactionBlockStatusScalarFieldEnum {
  BlockNumber = 'blockNumber',
  CreatedAt = 'createdAt',
  Id = 'id',
  TxIndex = 'txIndex',
  UpdatedAt = 'updatedAt'
}

export type TransactionBlockStatusUncheckedUpdateManyInput = {
  blockNumber?: InputMaybe<IntFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  txIndex?: InputMaybe<IntFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type TransactionBlockStatusUpdateInput = {
  blockNumber?: InputMaybe<IntFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  txIndex?: InputMaybe<IntFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type TransactionBlockStatusUpdateManyMutationInput = {
  blockNumber?: InputMaybe<IntFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  txIndex?: InputMaybe<IntFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type TransactionBlockStatusWhereInput = {
  AND?: InputMaybe<Array<TransactionBlockStatusWhereInput>>;
  NOT?: InputMaybe<Array<TransactionBlockStatusWhereInput>>;
  OR?: InputMaybe<Array<TransactionBlockStatusWhereInput>>;
  blockNumber?: InputMaybe<IntFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  txIndex?: InputMaybe<IntFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type TransactionBlockStatusWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};

export enum TransactionIsolationLevel {
  ReadCommitted = 'ReadCommitted',
  ReadUncommitted = 'ReadUncommitted',
  RepeatableRead = 'RepeatableRead',
  Serializable = 'Serializable'
}

export type WithdrawFromStream = Node & {
  __typename?: 'WithdrawFromStream';
  amount: Scalars['Int'];
  createdAt: Scalars['DateTime'];
  id: Scalars['ID'];
  recipient: Scalars['String'];
  stream: Stream;
  updatedAt: Scalars['DateTime'];
};

export type WithdrawFromStreamCreateInput = {
  amount: Scalars['Int'];
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  recipient: Scalars['String'];
  stream: StreamCreateNestedOneWithoutWithdrawsFromStreamInput;
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type WithdrawFromStreamCreateManyInput = {
  amount: Scalars['Int'];
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  recipient: Scalars['String'];
  streamId: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type WithdrawFromStreamCreateManyStreamInput = {
  amount: Scalars['Int'];
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  recipient: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type WithdrawFromStreamCreateManyStreamInputEnvelope = {
  data: Array<WithdrawFromStreamCreateManyStreamInput>;
  skipDuplicates?: InputMaybe<Scalars['Boolean']>;
};

export type WithdrawFromStreamCreateNestedManyWithoutStreamInput = {
  connect?: InputMaybe<Array<WithdrawFromStreamWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<WithdrawFromStreamCreateOrConnectWithoutStreamInput>>;
  create?: InputMaybe<Array<WithdrawFromStreamCreateWithoutStreamInput>>;
  createMany?: InputMaybe<WithdrawFromStreamCreateManyStreamInputEnvelope>;
};

export type WithdrawFromStreamCreateOrConnectWithoutStreamInput = {
  create: WithdrawFromStreamUncheckedCreateWithoutStreamInput;
  where: WithdrawFromStreamWhereUniqueInput;
};

export type WithdrawFromStreamCreateWithoutStreamInput = {
  amount: Scalars['Int'];
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  recipient: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type WithdrawFromStreamListRelationFilter = {
  every?: InputMaybe<WithdrawFromStreamWhereInput>;
  none?: InputMaybe<WithdrawFromStreamWhereInput>;
  some?: InputMaybe<WithdrawFromStreamWhereInput>;
};

export type WithdrawFromStreamOrderByRelationAggregateInput = {
  _count?: InputMaybe<SortOrder>;
};

export type WithdrawFromStreamOrderByWithRelationInput = {
  amount?: InputMaybe<SortOrder>;
  createdAt?: InputMaybe<SortOrder>;
  id?: InputMaybe<SortOrder>;
  recipient?: InputMaybe<SortOrder>;
  stream?: InputMaybe<StreamOrderByWithRelationInput>;
  streamId?: InputMaybe<SortOrder>;
  updatedAt?: InputMaybe<SortOrder>;
};

export enum WithdrawFromStreamScalarFieldEnum {
  Amount = 'amount',
  CreatedAt = 'createdAt',
  Id = 'id',
  Recipient = 'recipient',
  StreamId = 'streamId',
  UpdatedAt = 'updatedAt'
}

export type WithdrawFromStreamScalarWhereInput = {
  AND?: InputMaybe<Array<WithdrawFromStreamScalarWhereInput>>;
  NOT?: InputMaybe<Array<WithdrawFromStreamScalarWhereInput>>;
  OR?: InputMaybe<Array<WithdrawFromStreamScalarWhereInput>>;
  amount?: InputMaybe<IntFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  recipient?: InputMaybe<StringFilter>;
  streamId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type WithdrawFromStreamUncheckedCreateNestedManyWithoutStreamInput = {
  connect?: InputMaybe<Array<WithdrawFromStreamWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<WithdrawFromStreamCreateOrConnectWithoutStreamInput>>;
  create?: InputMaybe<Array<WithdrawFromStreamCreateWithoutStreamInput>>;
  createMany?: InputMaybe<WithdrawFromStreamCreateManyStreamInputEnvelope>;
};

export type WithdrawFromStreamUncheckedCreateWithoutStreamInput = {
  amount: Scalars['Int'];
  createdAt?: InputMaybe<Scalars['DateTime']>;
  id?: InputMaybe<Scalars['String']>;
  recipient: Scalars['String'];
  updatedAt?: InputMaybe<Scalars['DateTime']>;
};

export type WithdrawFromStreamUncheckedUpdateManyInput = {
  amount?: InputMaybe<IntFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  recipient?: InputMaybe<StringFieldUpdateOperationsInput>;
  streamId?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type WithdrawFromStreamUncheckedUpdateManyWithoutStreamNestedInput = {
  connect?: InputMaybe<Array<WithdrawFromStreamWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<WithdrawFromStreamCreateOrConnectWithoutStreamInput>>;
  create?: InputMaybe<Array<WithdrawFromStreamCreateWithoutStreamInput>>;
  createMany?: InputMaybe<WithdrawFromStreamCreateManyStreamInputEnvelope>;
  delete?: InputMaybe<Array<WithdrawFromStreamWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<WithdrawFromStreamScalarWhereInput>>;
  disconnect?: InputMaybe<Array<WithdrawFromStreamWhereUniqueInput>>;
  set?: InputMaybe<Array<WithdrawFromStreamWhereUniqueInput>>;
  update?: InputMaybe<Array<WithdrawFromStreamUpdateWithWhereUniqueWithoutStreamInput>>;
  updateMany?: InputMaybe<Array<WithdrawFromStreamUpdateManyWithWhereWithoutStreamInput>>;
  upsert?: InputMaybe<Array<WithdrawFromStreamUpsertWithWhereUniqueWithoutStreamInput>>;
};

export type WithdrawFromStreamUncheckedUpdateManyWithoutWithdrawsFromStreamInput = {
  amount?: InputMaybe<IntFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  recipient?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type WithdrawFromStreamUncheckedUpdateWithoutStreamInput = {
  amount?: InputMaybe<IntFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  recipient?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type WithdrawFromStreamUpdateInput = {
  amount?: InputMaybe<IntFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  recipient?: InputMaybe<StringFieldUpdateOperationsInput>;
  stream?: InputMaybe<StreamUpdateOneRequiredWithoutWithdrawsFromStreamNestedInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type WithdrawFromStreamUpdateManyMutationInput = {
  amount?: InputMaybe<IntFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  recipient?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type WithdrawFromStreamUpdateManyWithWhereWithoutStreamInput = {
  data: WithdrawFromStreamUncheckedUpdateManyWithoutWithdrawsFromStreamInput;
  where: WithdrawFromStreamScalarWhereInput;
};

export type WithdrawFromStreamUpdateManyWithoutStreamNestedInput = {
  connect?: InputMaybe<Array<WithdrawFromStreamWhereUniqueInput>>;
  connectOrCreate?: InputMaybe<Array<WithdrawFromStreamCreateOrConnectWithoutStreamInput>>;
  create?: InputMaybe<Array<WithdrawFromStreamCreateWithoutStreamInput>>;
  createMany?: InputMaybe<WithdrawFromStreamCreateManyStreamInputEnvelope>;
  delete?: InputMaybe<Array<WithdrawFromStreamWhereUniqueInput>>;
  deleteMany?: InputMaybe<Array<WithdrawFromStreamScalarWhereInput>>;
  disconnect?: InputMaybe<Array<WithdrawFromStreamWhereUniqueInput>>;
  set?: InputMaybe<Array<WithdrawFromStreamWhereUniqueInput>>;
  update?: InputMaybe<Array<WithdrawFromStreamUpdateWithWhereUniqueWithoutStreamInput>>;
  updateMany?: InputMaybe<Array<WithdrawFromStreamUpdateManyWithWhereWithoutStreamInput>>;
  upsert?: InputMaybe<Array<WithdrawFromStreamUpsertWithWhereUniqueWithoutStreamInput>>;
};

export type WithdrawFromStreamUpdateWithWhereUniqueWithoutStreamInput = {
  data: WithdrawFromStreamUncheckedUpdateWithoutStreamInput;
  where: WithdrawFromStreamWhereUniqueInput;
};

export type WithdrawFromStreamUpdateWithoutStreamInput = {
  amount?: InputMaybe<IntFieldUpdateOperationsInput>;
  createdAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
  id?: InputMaybe<StringFieldUpdateOperationsInput>;
  recipient?: InputMaybe<StringFieldUpdateOperationsInput>;
  updatedAt?: InputMaybe<DateTimeFieldUpdateOperationsInput>;
};

export type WithdrawFromStreamUpsertWithWhereUniqueWithoutStreamInput = {
  create: WithdrawFromStreamUncheckedCreateWithoutStreamInput;
  update: WithdrawFromStreamUncheckedUpdateWithoutStreamInput;
  where: WithdrawFromStreamWhereUniqueInput;
};

export type WithdrawFromStreamWhereInput = {
  AND?: InputMaybe<Array<WithdrawFromStreamWhereInput>>;
  NOT?: InputMaybe<Array<WithdrawFromStreamWhereInput>>;
  OR?: InputMaybe<Array<WithdrawFromStreamWhereInput>>;
  amount?: InputMaybe<IntFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<StringFilter>;
  recipient?: InputMaybe<StringFilter>;
  stream?: InputMaybe<StreamWhereInput>;
  streamId?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type WithdrawFromStreamWhereUniqueInput = {
  id?: InputMaybe<Scalars['String']>;
};
