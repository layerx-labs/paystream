import { list, listPageInfo } from '../common';
import { withdrawFromStream } from './get-one';

const resolver = {
  Query: {
    withdrawFromStream,
    withdrawsFromStream: list({ model: 'withdrawFromStream' }),
    withdrawsFromStreamPageInfo: listPageInfo({ model: 'withdrawFromStream' }),
  },
};

export default resolver;
