import { ObjectSchema } from 'realm';

const schema_auth_user: ObjectSchema = {
  name: 'auth_user',
  primaryKey: 'objID',
  properties: {
    objID: 'int',
    email: 'string',
    senha: 'string'
  },
};

export default schema_auth_user
;