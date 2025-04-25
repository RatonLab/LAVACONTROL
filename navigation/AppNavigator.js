import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Importar pantallas
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AdminHome from '../screens/AdminHome';
import LavadorHome from '../screens/LavadorHome';
import RegistrarLavado from '../screens/RegistrarLavado';
import ControlCalidadHome from '../screens/ControlCalidadHome';
import ObservadorHome from '../screens/ObservadorHome';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: 'Iniciar sesión' }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: 'Crear cuenta' }}
        />
        <Stack.Screen
          name="AdminHome"
          component={AdminHome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="LavadorHome"
          component={LavadorHome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegistrarLavado"
          component={RegistrarLavado}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ControlCalidadHome"
          component={ControlCalidadHome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ObservadorHome"
          component={ObservadorHome}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
