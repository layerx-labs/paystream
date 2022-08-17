import { Sablier, SablierMethods } from "paystream-sdk";
import useWeb3Mutation, {MapToReceipt} from "./useWeb3Mutation";

export type createStreamFuncName = 'createStream';
export type CreateStreamMethod = Pick<SablierMethods, createStreamFuncName>

