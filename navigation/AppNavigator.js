import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Pantallas generales
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

// Pantallas de roles
import AdminHome from '../screens/AdminHome';
import LavadorHome from '../screens/LavadorHome';
import RegistrarLavado from '../screens/RegistrarLavado'; // Asegúrate de tener este archivo
import ObservadorHome from '../screens/ObservadorHome';

// Control de Calidad
import ControlCalidadHome from '../screens/ControlCalidadHome';
import ControlCalidadUnidades from '../screens/ControlCalidadUnidades';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">
        {/* Pantallas Iniciales */}
        <Stack.Screen
          name="Splash"
          component={SplashScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: 'Crear Cuenta' }}
        />

        {/* Pantallas Administrador */}
        <Stack.Screen
          name="AdminHome"
          component={AdminHome}
          options={{ headerShown: false }}
        />

        {/* Pantallas Lavador */}
        <Stack.Screen
          name="LavadorHome"
          component={LavadorHome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="RegistrarLavado"
          component={RegistrarLavado}
          options={{ title: 'Registrar Lavado' }}
        />

        {/* Pantallas Observador */}
        <Stack.Screen
          name="ObservadorHome"
          component={ObservadorHome}
          options={{ headerShown: false }}
        />

        {/* Pantallas Control de Calidad */}
        <Stack.Screen
          name="ControlCalidadHome"
          component={ControlCalidadHome}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="ControlCalidadUnidades"
          component={ControlCalidadUnidades}
          options={{ title: 'Control de Unidades' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
