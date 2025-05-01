import { ObjectSchema } from 'realm';

const schema_perguntas: ObjectSchema = {
  name: 'Perguntas',
  primaryKey: 'objID',
  properties: {
    objID: 'int',
    pergunta: 'string',
    resposta: 'string'
  },
};

export default schema_perguntas
;