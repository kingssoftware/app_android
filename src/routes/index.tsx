// import {AppState} from 'react-native';
import {StatusBar} from 'react-native';
// import {useState, useEffect, useContext, useRef} from 'react';
//import { _user } from '../services/login_services';

//import AuthContextData from '../context';
import StackLogin from './screens_routes/stack.login';
// import StackProf from './screens_routes/stack.profissional';
// import StackCli from './screens_routes/stack.cliente';

//import { SignalRService } from '../class/signalr_services';

const Routes = () => {
  // const appState = useRef(AppState.currentState);
  // const [brukertype, setBrukerType] = useState<string>();
  // const [loading, setLoading] = useState(true);

  //const { isLogged, check, userLogout } = useContext(AuthContextData);

  // Verifica o login do usuário ao montar o componente
  // useEffect(() => {
  //   const verifyUserLogin = async () => {
  //     await check();
  //     setLoading(false);
  //   };
  //   verifyUserLogin();
  // }, []);

  // // Verifica o status de login e carrega o tipo de usuário
  // useEffect(() => {
  //   const verifyLoginStatus = async () => {
  //     if (!isLogged) {
  //       await userLogout();
  //     } else {
  //       await loadingTypeUser();
  //     }
  //   };

  //   if (!loading) verifyLoginStatus();
  // }, [isLogged, loading]);

  // // Carrega o tipo de usuário
  // const loadingTypeUser = async () => {
  //   const us = await _user();
  //   setBrukerType(us.brukertype);
  // };

  // // Exemplo de uso com um hook
  // useEffect(() => {
  //   let isMounted = true;
  //   // Instância do serviço para usar durante o ciclo de vida do componente
  //   const signalRService = new SignalRService();
  //   if (isLogged && brukertype) {
  //     const setupSignalR = async () => {
  //       const us = await _user();
  //       try {
  //         // Inicia a conexão com o SignalR
  //         await signalRService.startConnection();
  //         console.log('✅ Conectado ao SignalR via SignalRService');

  //         // Se o usuário for do tipo profissional, registra-o no grupo passando os dados desejados
  //         if (brukertype === 'Profesjonell') {
  //           await signalRService.AddProfInGroup({ id: us.bruker.id });
  //           console.log('✅ Profissional registrado no grupo');
  //         }
  //       } catch (err) {
  //         if (isMounted) {
  //           console.error('❌ Erro ao configurar SignalR:', err);
  //         }
  //       }
  //     };

  //     setupSignalR();
  //   }

  //   // Cleanup: encerra a conexão quando o componente desmontar.
  //   return () => {
  //     isMounted = false;
  //     signalRService.stopConnection().then(() =>
  //       console.log('🔌 SignalR desconectado.')
  //     );
  //   };
  // }, [isLogged, brukertype]);

  // useEffect(() => {
  //   const subscription = AppState.addEventListener('change', nextAppState => {
  //     if (appState.current !== nextAppState) {
  //       console.log('Estado do aplicativo:', nextAppState);
  //       if (nextAppState === 'active') {
  //         console.log('O aplicativo está ativo e o celular está desbloqueado!');
  //       } else if (nextAppState === 'background') {
  //         console.log('O aplicativo está em segundo plano.');
  //       } else if (nextAppState === 'inactive') {
  //         // Instância do serviço para usar durante o ciclo de vida do componente
  //         const signalRService = new SignalRService();
  //         const setupSignalR = async () => {
  //           console.log('O aplicativo está inativo.');

  //           const us = await _user();
  //           // Se o usuário for do tipo profissional, registra-o no grupo passando os dados desejados
  //           if (brukertype === 'Profesjonell') {
  //             await signalRService.RemoveProfInGroup({ id: us.bruker.id });
  //             console.log('✅ Profissional registrado no grupo');
  //           }
  //         }

  //         setupSignalR();
  //       }
  //     }
  //     appState.current = nextAppState;
  //   });

  //   // Limpeza do listener ao desmontar o componente
  //   return () => {
  //     subscription.remove();
  //   };
  // }, []);

  // Exibe um indicador de carregamento enquanto verifica o login
  // if (loading) {
  //   return (
  //     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  //       <ActivityIndicator size="large" color="#0000ff" animating={true} />
  //     </View>
  //   );
  // }

  // // Determina o componente de navegação com base no login e tipo de usuário
  let StackComponent = <StackLogin />;
  // if (isLogged) {
  //   if (brukertype === 'Bruker') {
  //     StackComponent = <StackCli />;
  //   } else if (brukertype === 'Profesjonell') {
  //     StackComponent = <StackProf />;
  //   }
  // }

  return (
    <>
      <StatusBar
        barStyle="dark-content"
        backgroundColor="#ffffff"
        translucent={false}
      />
      {StackComponent}
    </>
  );
};

export default Routes;
