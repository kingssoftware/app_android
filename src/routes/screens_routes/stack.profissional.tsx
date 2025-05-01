import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootNavigationProfRoutes } from '../../types/navigation';

import Profissional from '../../screens/profissional';
import Register from '../../operations/RegisterUser';
import { Text, TouchableOpacity } from 'react-native';
import Agendamentos from '../../screens/agendamentos';
import RegisterUser from '../../operations/User';

const Stack = createNativeStackNavigator<RootNavigationProfRoutes>();

// Tipando as props da função de opções
type LoginScreenNavigationProp = NativeStackNavigationProp<RootNavigationProfRoutes, 'home_profissional'>;
type RegisterScreenNavigationProp = NativeStackNavigationProp<RootNavigationProfRoutes, 'register_user'>;
type AgendamentoScreenNavigationProp = NativeStackNavigationProp<RootNavigationProfRoutes, 'agendamento'>;


export default function StackProf() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="home_profissional">
        <Stack.Screen
          name="home_profissional"
          component={Profissional}
          options={({ navigation }: { navigation: LoginScreenNavigationProp }) => ({
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
      </Stack.Navigator>

    </NavigationContainer>
  );
}

