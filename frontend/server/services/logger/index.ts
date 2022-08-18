import Scribal from '@taikai/scribal';

const blackListParams = ['prismaSecret'];

export const scribal = new Scribal(blackListParams, '*');
