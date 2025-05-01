import { ObjectSchema } from 'realm';

const schema_coord_user: ObjectSchema = {
  name: 'UsuarioCoord',
  primaryKey: 'objID',
  properties: {
    objID: 'string',
    point: 'string',
    point_coordinates_pro: 'mixed'
  },
};

export default schema_coord_user;