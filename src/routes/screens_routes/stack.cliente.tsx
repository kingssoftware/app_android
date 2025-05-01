import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootNavigationClienteRoutes } from '../../types/navigation';

import Cliente from '../../screens/cliente';
import { CameraPage } from '../../component/Camera';
import { Text, TouchableOpacity } from 'react-native';
import { Details } from '../../screens/details';
import Agendamentos from '../../screens/agendamentos';
import RegisterUser from '../../operations/User';
import ClienteSolicitation from '../../screens/cliente_solicitation';

const Stack = createNativeStackNavigator<RootNavigationClienteRoutes>();

// Tipando as props da função de opções
type AgendamentoScreenNavigationProp = NativeStackNavigationProp<RootNavigationClienteRoutes, 'agendamento'>;
type LoginScreenNavigationProp = NativeStackNavigationProp<RootNavigationClienteRoutes, 'home_cliente'>;
type HomeSolicitationScreenNavigationProp = NativeStackNavigationProp<RootNavigationClienteRoutes, 'home_solicitation'>;
type RegisterScreenNavigationProp = NativeStackNavigationProp<RootNavigationClienteRoutes, 'register_user'>;
type CameraScreenNavigationProp = NativeStackNavigationProp<RootNavigationClienteRoutes, 'camera'>;
type DetailsScreenNavigationProp = NativeStackNavigationProp<RootNavigationClienteRoutes, 'detalhes'>;



export default function StackCli() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home_cliente">
        <Stack.Screen
          name="home_cliente"
          component={Cliente}
          options={({ navigation }: { navigation: LoginScreenNavigationProp }) => ({
            headerShown: false, // Exibe o cabeçalho
            headerTitle: '', // Remove o título do cabeçalho
            headerTitleAlign: 'center', // Alinha o título (não usado, mas mantido)
            headerTintColor: 'whitesmoke', // Cor do texto do título (não será visível, pois o título está vazio)
          })}
        />

      <Stack.Screen
          name="home_solicitation"
          component={ClienteSolicitation}
          options={({ navigation }: { navigation: HomeSolicitationScreenNavigationProp }) => ({
            headerShown: false, // Exibe o cabeçalho
            headerTitle: '', // Remove o título do cabeçalho
            headerTitleAlign: 'center', // Alinha o título (não usado, mas mantido)
            headerTintColor: 'whitesmoke', // Cor do texto do título (não será visível, pois o título está vazio)
          })}
        />

        <Stack.Screen
          name="register_user"
          component={RegisterUser}
          options={({ navigation }: { navigation: RegisterScreenNavigationProp }) => ({
            headerShown: true, 
            headerTitle: '', 
            headerTitleAlign: 'center', 
            headerTintColor: 'whitesmoke', 
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ marginLeft: 10 }}
              >
                <Text style={{ color: 'black', fontSize: 16 }}>Gå tilbake</Text>
              </TouchableOpacity>
            ),
          })}
        />


        <Stack.Screen
          name="camera"
          component={CameraPage}
          options={({ navigation }: { navigation: CameraScreenNavigationProp }) => ({
            headerShown: true, 
            headerTitle: '', 
            headerTitleAlign: 'center', 
            headerTintColor: 'whitesmoke', 
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ marginLeft: 10 }}
              >
                <Text style={{ color: 'black', fontSize: 16 }}>Gå tilbake</Text>
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen
          name="agendamento"
          component={Agendamentos}
          options={({ navigation }: { navigation: AgendamentoScreenNavigationProp }) => ({
            headerShown: true, 
            headerTitle: '', 
            headerTitleAlign: 'center', 
            headerTintColor: 'whitesmoke', 
            headerLeft: () => (
              <TouchableOpacity
                onPress={() => navigation.goBack()}
                style={{ marginLeft: 10 }}
              >
                <Text style={{ color: 'black', fontSize: 16 }}>Gå tilbake</Text>
              </TouchableOpacity>
            ),
          })}
        />

        <Stack.Screen
          name="detalhes"
          component={Details}
          options={({ navigation }: { navigation: DetailsScreenNavigationProp }) => ({
            headerShown: true, 
            headerTitle: '', 
            headerTitleAlign: 'center', 
            headerTintColor: 'whitesmoke', 
            headerLeft: () => {
              console.log('Renderizando headerLeft');
              return (
                <TouchableOpacity
                  onPress={() => {navigation.goBack()}}
                  style={{ marginLeft: 10}}
                >
                  <Text style={{ color: 'black', fontSize: 16, zIndex: 100 }}>Gå tilbake</Text>
                </TouchableOpacity>
              );
            },
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

