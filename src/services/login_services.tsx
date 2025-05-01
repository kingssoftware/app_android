import context_realm from '../db_context/index';
import {iLoginAcess} from '../types/iLogin';
import {iBruker} from '../types/iBruker';

/**
 * Este método será utilizado para carregar os dados do usuário ao realm db.
 * @param objeto refere-se ao objeto que contém os dados do usuário logado, como : token, nome do usuário, ata de expiração.
 */
export const _access = async (props: iLoginAcess) => {
  try {
    const realm = await context_realm();
    realm.write(() => {
      realm.create('Login', {
        objID: 1,
        idTillatelse: props.idTillatelse,
        token: props.token,
        forOgEtternavn: props.forOgEtternavn,
        bruker: props.bruker,
        brukertype: props.brukertype,
        expire: props.expire,
      });
    });
  } catch (error) {
    console.log(error);
  }
};

export const _updateBrukerImage = async (bruker: iBruker) => {
  try {
    const realm = await context_realm();
    realm.write(() => {
      const brukerToUpdate: any = realm.objectForPrimaryKey('Login', 1); // Supondo que objID é a chave primária
      if (brukerToUpdate && brukerToUpdate.bruker) {
        brukerToUpdate.bruker.forOgEtternavn = bruker.forOgEtternavn;
        brukerToUpdate.bruker.bilde = bruker.bilde;
        brukerToUpdate.bruker.telefonnummer = bruker.telefonnummer;
        brukerToUpdate.bruker.epost = bruker.epost;
      }
    });
  } catch (error) {
    console.log(error);
  }
};

/**
 * Este método será utilizado para carregar informações do usuário que está conectado ao banco off.
 * @returns dados relacionado ao usuário conectado.
 */
export const _user = async (): Promise<any> => {
  try {
    const realm = await context_realm();
    const access = await realm.objectForPrimaryKey('Login', 1);
    const accessObject = JSON.parse(JSON.stringify(access));

    return accessObject;
  } catch (error: any) {}
};

/**
 * Este método será utilizado para encerrar os dados do usuário que está conectado ao banco off.
 */
export const _userLoggout = async () => {
  const realm = await context_realm();
  realm.write(() => {
    const user = realm.objectForPrimaryKey('Login', 1);
    if (user) {
      realm.delete(user);
    }
  });
};
