import { ObjectSchema } from 'realm';

const schema_login: ObjectSchema = {
  name: 'Login',
  primaryKey: 'objID',
  properties: {
    objID: 'int',
    idTillatelse: 'string',
    token: 'string',
    forOgEtternavn: 'string',
    bruker: 'mixed',
    brukertype: 'string',
    expire: 'date',
  },
};

export default schema_login;