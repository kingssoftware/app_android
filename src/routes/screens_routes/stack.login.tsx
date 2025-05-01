import React from 'react';
import Login from '../../screens/login';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {RootStackParamList} from '../../types/navigation';
// import Register from '../../operations/RegisterUser';
// import { Text, TouchableOpacity } from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();

// Tipando as props da função de opções
// type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

export default function StackLogin() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={() => ({
            headerShown: true, // Exibe o cabeçalho
            headerTransparent: true, // Torna o cabeçalho transparente
            headerTitle: '', // Remove o título do cabeçalho
            headerTitleAlign: 'center', // Alinha o título (não usado, mas mantido)
            headerStyle: {
              backgroundColor: 'transparent', // Estilo compatível
              borderBottomWidth: 0, // Remove a borda inferior
            },
            headerTintColor: 'whitesmoke', // Cor do texto do título (não será visível, pois o título está vazio)
          })}
        />

        {/* <Stack.Screen
          name="Register"
          component={Register}
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
        /> */}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
