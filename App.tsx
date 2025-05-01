import React, {useEffect} from 'react';
import Routes from './src/routes';

import {Alert, Linking, Platform} from 'react-native';
import {ContextProvider} from './src/context';
import {check, request, PERMISSIONS, RESULTS} from 'react-native-permissions';

const App = () => {
  useEffect(() => {
    // Solicita permissões específicas para iOS
    setTimeout(() => {
      requestPermissions();
    }, 1000);
  }, []);

  const requestPermissions = async () => {
    try {
      // Verificar se é Android antes de prosseguir
      if (Platform.OS === 'android') {
        // === Permissão da câmera ===
        const cameraStatus = await check(PERMISSIONS.ANDROID.CAMERA);
        if (cameraStatus !== RESULTS.GRANTED) {
          const cameraResult = await request(PERMISSIONS.ANDROID.CAMERA);
          if (cameraResult !== RESULTS.GRANTED) {
            handlePermissionDenied(
              'Permissão de Câmera',
              'O aplicativo precisa de acesso à câmera para funcionar corretamente.',
            );
            return;
          }
        }

        // === Permissão de localização ===
        const locationStatus = await check(
          PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
        );
        if (locationStatus !== RESULTS.GRANTED) {
          const locationResult = await request(
            PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION,
          );
          if (locationResult !== RESULTS.GRANTED) {
            handlePermissionDenied(
              'Permissão de Localização',
              'O aplicativo precisa de acesso à localização para encontrar endereços próximos.',
            );
            return;
          }
        }

        // === Permissão da galeria de fotos ===
        const photoLibraryStatus = await check(
          PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
        );
        if (photoLibraryStatus !== RESULTS.GRANTED) {
          const photoLibraryResult = await request(
            PERMISSIONS.ANDROID.READ_EXTERNAL_STORAGE,
          );
          if (photoLibraryResult !== RESULTS.GRANTED) {
            handlePermissionDenied(
              'Permissão de Galeria',
              'O aplicativo precisa de acesso à galeria para exibir suas fotos.',
            );
            return;
          }
        }
      }
    } catch (error) {
      console.error('Erro ao solicitar permissões:', error);
      Alert.alert(
        'Erro',
        'Ocorreu um erro ao configurar permissões. Tente novamente.',
      );
    }
  };

  const handlePermissionDenied = (title: string, message: string) => {
    Alert.alert(
      title,
      `${message} Por favor, conceda a permissão nas configurações do sistema.`,
      [
        {text: 'Cancelar', style: 'cancel'},
        {text: 'Abrir Configurações', onPress: () => Linking.openSettings()},
      ],
    );
  };

  return (
    <ContextProvider>
      <Routes />
    </ContextProvider>
  );
};

export default App;
