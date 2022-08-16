import { objectsMerger, preventNullValues } from '../../../utils/objects';
import {
  IOrmAdapter,
  IOrmAdapterMethodsProps,
  ISelectionSetProps,
  OrmAdapterProps,
} from './database-types';

class OrmAdapter implements IOrmAdapter {
  _delegate;
  infoToSelect;
  tagToSelect;
  selectParser;

  constructor({
    delegate,
    infoToSelect,
    tagToSelect,
    selectParser,
  }: OrmAdapterProps) {
    this._delegate = delegate;
    this.infoToSelect = infoToSelect;
    this.tagToSelect = tagToSelect;
    this.selectParser = selectParser;
  }

  getSelectionSet({ info, gql, select }: ISelectionSetProps) {
    return objectsMerger(
      info ? this.infoToSelect(info).select : {},
      gql ? this.tagToSelect(gql).select : {},
      select ? this.selectParser(select) : {}
    );
  }

  async findMany({
    where,
    orderBy,
    page = 0,
    perPage = 20,
    info,
    gql,
    select,
  }: IOrmAdapterMethodsProps['findMany']) {
    const skip = page * perPage;
    const take = perPage;
    const selectionSet = this.getSelectionSet({ info, gql, select });
    const query = {
      where,
      skip,
      take,
      orderBy,
      select: Object.keys(selectionSet).length ? selectionSet : undefined,
    };
    return await this._delegate.findMany({
      ...query,
    });
  }

  async findManyPageInfo({
    where,
    perPage = 20,
  }: IOrmAdapterMethodsProps['findManyPageInfo']) {
    const query = {
      where,
    };
    const count = await this._delegate.count({
      ...query,
    });
    const pageCount =
      count % perPage == 0 ? count / perPage : Math.floor(count / perPage) + 1;
    return {
      perPage: perPage,
      recordCount: count,
      pageCount: pageCount,
    };
  }

  async find({ where, info, gql, select }: IOrmAdapterMethodsProps['find']) {
    const selectionSet = this.getSelectionSet({ info, gql, select });
    const query = {
      where,
      select: Object.keys(selectionSet).length ? selectionSet : undefined,
    };
    return await this._delegate.findUnique({
      ...query,
    });
  }

  async count({ where }: IOrmAdapterMethodsProps['count']) {
    const count = await this._delegate.count({
      where,
    });
    return count;
  }

  async create({ data, info, gql, select }: IOrmAdapterMethodsProps['create']) {
    const selectionSet = this.getSelectionSet({ info, gql, select });
    return await this._delegate.create({
      // Prevent creating records with explicit Null value
      data: preventNullValues(data),
      select: Object.keys(selectionSet).length ? selectionSet : undefined,
    });
  }

  async createMany({
    data,
    info,
    gql,
    select,
  }: IOrmAdapterMethodsProps['createMany']) {
    const selectionSet = this.getSelectionSet({ info, gql, select });
    return await this._delegate.createMany({
      data,
      select: Object.keys(selectionSet).length ? selectionSet : undefined,
    });
  }

  async update({
    data,
    where,
    info,
    gql,
    select,
  }: IOrmAdapterMethodsProps['update']) {
    const selectionSet = this.getSelectionSet({ info, gql, select });
    return await this._delegate.update({
      where,
      data,
      select: Object.keys(selectionSet).length ? selectionSet : undefined,
    });
  }

  async delete({
    where,
    info,
    gql,
    select,
  }: IOrmAdapterMethodsProps['delete']) {
    const selectionSet = this.getSelectionSet({ info, gql, select });
    return await this._delegate.delete({
      where,
      select: Object.keys(selectionSet).length ? selectionSet : undefined,
    });
  }

  async deleteMany({
    where,
    info,
    gql,
    select,
  }: IOrmAdapterMethodsProps['deleteMany']) {
    const selectionSet = this.getSelectionSet({ info, gql, select });
    return await this._delegate.deleteMany({
      where,
      select: Object.keys(selectionSet).length ? selectionSet : undefined,
    });
  }

  async updateMany({
    where,
    data,
    info,
    gql,
    select,
  }: IOrmAdapterMethodsProps['updateMany']) {
    const selectionSet = this.getSelectionSet({ info, gql, select });
    return await this._delegate.updateMany({
      where,
      data,
      select: Object.keys(selectionSet).length ? selectionSet : undefined,
    });
  }

  async upsert({
    where,
    update,
    create,
    info,
    gql,
    select,
  }: IOrmAdapterMethodsProps['upsert']) {
    const selectionSet = this.getSelectionSet({ info, gql, select });
    return await this._delegate.upsert({
      where,
      update,
      create,
      select: Object.keys(selectionSet).length ? selectionSet : undefined,
    });
  }
}

export default function makeOrmAdapter(props: OrmAdapterProps) {
  return new OrmAdapter(props);
}
