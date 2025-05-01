import Realm from 'realm';

import schema_login from './models/schema_login';
import schema_perguntas from './models/schmea_perguntas';
import schema_coord_user from './models/schema_coord_user';
import schema_auth_user from './models/schema_auth_user';

const db_context = async (): Promise<Realm> => {
  const config = {
    path: 'Ateko',
    schema: [
      schema_auth_user,
      schema_coord_user,
      schema_login, 
      schema_perguntas
    ],
    schemaVersion: 9,
  };

  return await Realm.open(config);
};

export default db_context;
