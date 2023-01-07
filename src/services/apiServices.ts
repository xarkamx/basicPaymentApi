import Db from "../db";

export class ApiKeysService {
  db: any;
  tableName: string;
  constructor(readonly appId: string) {
    this.db = Db.getInstance();
    this.tableName = "api_keys";
  }

  async getAll() {
    return this.db(this.tableName).select("*").where({ type: "public" });
  }

  async create(data: ApiKeys) {
    data.appId = this.appId;
    return this.db(this.tableName).insert(data);
  }

  async getKeyByProvider(provider: string, type: string) {
    return this.db(this.tableName)
      .select("*")
      .where({ provider, type, appId: this.appId })
      .orderBy("id", "desc")
      .first();
  }
}
type ApiKeys = {
  provider: string;
  value: string;
  type: string;
  appId?: string;
};
