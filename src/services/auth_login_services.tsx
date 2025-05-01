import context_realm from '../db_context/index';
import {iAuthLogin} from '../types/iAuthLogin';

/**
 * Este método será utilizado para armazenar os dados do registro do usuário na tela de login.
 */
export const _checked = async (props: iAuthLogin) => {
  try {
    const realm = await context_realm();
    realm.write(() => {
      // Remove credenciais existentes para evitar duplicatas
      realm.delete(realm.objects('auth_user'));
      // Salva nova credencial
      realm.create('auth_user', {
        objID: 1, // ID único
        email: props.email,
        senha: props.senha,
      });
    });
    realm.close();
    console.log('Credenciais salvas com sucesso:', props); // Log para depuração
  } catch (error) {
    console.error('Erro ao salvar credenciais no Realm:', error);
  }
};

/**
 * Este método será utilizado para limpar os dados de acesso do usuário na tela de login.
 */
export const _unchecked = async () => {
  try {
    const realm = await context_realm();
    realm.write(() => {
      // Deleta todas as credenciais do esquema Login
      realm.delete(realm.objects('auth_user'));
    });
    realm.close();
    console.log('Credenciais limpas com sucesso'); // Log para depuração
  } catch (error) {
    console.error('Erro ao limpar credenciais no Realm:', error);
  }
};

export const _authuser = async (): Promise<any> => {
  try {
    const realm = await context_realm();
    const access = await realm.objectForPrimaryKey('auth_user', 1);
    const accessObject = JSON.parse(JSON.stringify(access));

    return accessObject;
  } catch (error: any) {}
};
