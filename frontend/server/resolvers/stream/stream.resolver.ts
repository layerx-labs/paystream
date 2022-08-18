import { list, listPageInfo } from '../common';
import { stream } from './get-one';
import { createStream } from './create';
import { updateStream } from './update';
import { deleteStream } from './delete';

const resolver = {
  Query: {
    stream,
    streams: list({ model: 'stream' }),
    streamsPageInfo: listPageInfo({ model: 'stream' }),
  },
  Mutation: {
    createStream,
    deleteStream,
    updateStream,
  },
};

export default resolver;
