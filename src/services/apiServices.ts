import Db from "../db";

export class ApiKeysService {
  db: any;
  tableName: string;
  constructor(readonly mail: string) {
    this.db = Db.getInstance();
    this.tableName = "api_keys";
  }

  async getAll() {
    return this.db(this.tableName)
      .select("*")
      .where({ type: "public", email: this.mail });
  }

  async create(data: ApiKeys) {
    data.email = this.mail;
    return this.db(this.tableName).insert(data);
  }

  async getKeyByProvider(provider: string, type: string) {
    return this.db(this.tableName)
      .select("*")
      .where({ provider, type, email: this.mail })
      .orderBy("id", "desc")
      .first();
  }
}
type ApiKeys = {
  provider: string;
  value: string;
  type: string;
  email?: string;
};
