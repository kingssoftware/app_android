import context_realm from '../db_context/index';
import { iUserCoords } from '../types/iUserCoords';

/**
 * Este método será utilizado para carregar os dados do usuário ao realm db.
 * @param objeto refere-se ao objeto que contém os dados do usuário logado, como: token, nome do usuário, data de expiração.
 */
export const _saveCoord = async (obj: iUserCoords) => {
  try {
    const realm = await context_realm();
    realm.write(() => {
      // Verifica se já existe um registro com o idBruker
      const existingCoord: any = realm.objectForPrimaryKey('UsuarioCoord', obj.idBruker); 
      if (existingCoord) {
        // Atualiza o registro existente
        existingCoord.point = obj.point;
        existingCoord.point_coordinates_pro = obj.point_coordinates_pro;
      } else {
        // Cria um novo registro
        realm.create('UsuarioCoord', {
          objID: obj.idBruker,
          point: obj.point,
          point_coordinates_pro: obj.point_coordinates_pro
        });
      }
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * Este método busca as coordenadas do usuário pelo idBruker.
 * @param id refere-se ao idBruker do usuário.
 */
export const _findUserCoord = async (id: string) => {
  try {
    const realm = await context_realm();
    const resp: any = realm.objectForPrimaryKey('UsuarioCoord', id); 

    const result = resp ? JSON.parse(JSON.stringify(resp)) : null;
    
    return result;
  } catch (error: any) {
    console.log(error);
    return null;
  }
};