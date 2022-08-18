import { list, listPageInfo } from '../common';
import { stream } from './get-one';

const resolver = {
  Query: {
    stream,
    streams: list({ model: 'stream' }),
    streamsPageInfo: listPageInfo({ model: 'stream' }),
  },
};

export default resolver;
