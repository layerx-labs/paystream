import { list, listPageInfo } from '../common';
import { withdrawFromStream } from './get-one';
import { createWithdrawFromStream } from './create';
import { deleteWithdrawFromStream } from './delete';

const resolver = {
  Query: {
    withdrawFromStream,
    withdrawsFromStream: list({ model: 'withdrawFromStream' }),
    withdrawsFromStreamPageInfo: listPageInfo({ model: 'withdrawFromStream' }),
  },
  Mutation: {
    createWithdrawFromStream,
    deleteWithdrawFromStream,
  },
};

export default resolver;
