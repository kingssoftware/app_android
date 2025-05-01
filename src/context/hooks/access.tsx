// import moment from 'moment';
//import { _user, _userLoggout } from '../../services/login_services';
import {useState} from 'react';

export const useAccount = () => {
  const [isLogged, setIsLogged] = useState<boolean>(false);

  /**
   * Este método será utilizado para carregar as informações de acesso do usuário, como token válido ou data válida.
   * @returns valor booleano, referindo-se se o usuário pode estar logado ou não.
   */
  const check = async (): Promise<void> => {
    // try {
    //   const now = moment(); // Data atual
    //   const access: any = await _user();
    //   if (access) {
    //     const targetDate = moment(access.expire);
    //     const differenceInDays = targetDate.diff(now, 'days');

    //     // Essa comparação será utilizada para carregar os dados referentes aos dias.
    //     setIsLogged(differenceInDays >= 0 && differenceInDays <= 5);
    //   } else {
    //     setIsLogged(false);
    //   }
    // } catch (error) {
    //   console.debug('Erro no check: ', error);
    setIsLogged(false); // Caso haja erro, garantimos que o estado será false
    // }
  };

  const userLogout = async () => {
    // try {
    //   await _userLoggout();
    // } catch (error: any) {
    //   console.log('Error no context_provider hooks/ remove cultura', error);
    // }
  };

  return {isLogged, check, userLogout};
};
