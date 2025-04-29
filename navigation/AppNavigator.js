import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// Pantallas principales
import SplashScreen from '../screens/SplashScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';

// Home por roles
import AdminMenu from '../screens/AdminMenu';
import AdminHome from '../screens/AdminHome';
import LavadorHome from '../screens/LavadorHome';
import ControlCalidadHome from '../screens/ControlCalidadHome';
import ControlCalidadUnidades from '../screens/ControlCalidadUnidades';
import ObservadorHome from '../screens/ObservadorHome';

// Registrar lavado
import RegistrarLavado from '../screens/RegistrarLavado';

// Menú de estadísticas
import AdminStatsMenu from '../screens/AdminStatsMenu';

// Estadísticas (Español)
import EstadisticaLavadosDiariosLavador from '../screens/EstadisticaLavadosDiariosLavador';
import EstadisticaLavadosMensualesLavador from '../screens/EstadisticaLavadosMensualesLavador';
import EstadisticaTiempoDiarioLavador from '../screens/EstadisticaTiempoDiarioLavador';
import EstadisticaTiempoMensualLavador from '../screens/EstadisticaTiempoMensualLavador';
import EstadisticaCantidadLavadosLocal from '../screens/EstadisticaCantidadLavadosLocal';
import EstadisticaCantidadLavadosArea from '../screens/EstadisticaCantidadLavadosArea';
import EstadisticaTiempoPromedioArea from '../screens/EstadisticaTiempoPromedioArea';
import EstadisticaControlCalidadDia from '../screens/EstadisticaControlCalidadDia';
import EstadisticaControlCalidadMes from '../screens/EstadisticaControlCalidadMes';
import EstadisticaControlCalidadLocal from '../screens/EstadisticaControlCalidadLocal';
import EstadisticaNoConformesLavador from '../screens/EstadisticaNoConformesLavador';
import EstadisticaNoConformesLocal from '../screens/EstadisticaNoConformesLocal';
import EstadisticaTopNoConformidadesMes from '../screens/EstadisticaTopNoConformidadesMes';

// Filtros (Placeholders)
import FiltroPorFecha from '../screens/FiltroPorFecha';
import FiltroPorLavador from '../screens/FiltroPorLavador';
import FiltroPorLocal from '../screens/FiltroPorLocal';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Splash">

        {/* Screens principales */}
        <Stack.Screen name="Splash" component={SplashScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={LoginScreen} options={{ title: 'Iniciar sesión' }} />
        <Stack.Screen name="Register" component={RegisterScreen} options={{ title: 'Crear cuenta' }} />
        
        {/* Menú por rol */}
        <Stack.Screen name="AdminMenu" component={AdminMenu} options={{ headerShown: false }} />
        <Stack.Screen name="AdminHome" component={AdminHome} options={{ title: 'Gestión de Usuarios' }} />
        <Stack.Screen name="LavadorHome" component={LavadorHome} options={{ headerShown: false }} />
        <Stack.Screen name="ControlCalidadHome" component={ControlCalidadHome} options={{ headerShown: false }} />
        <Stack.Screen name="ControlCalidadUnidades" component={ControlCalidadUnidades} options={{ title: 'Controlar Unidades' }} />
        <Stack.Screen name="ObservadorHome" component={ObservadorHome} options={{ headerShown: false }} />
        
        {/* Lavado */}
        <Stack.Screen name="RegistrarLavado" component={RegistrarLavado} options={{ title: 'Registrar Lavado' }} />

        {/* Menú estadísticas */}
        <Stack.Screen name="AdminStatsMenu" component={AdminStatsMenu} options={{ title: 'Estadísticas' }} />

        {/* Pantallas de estadísticas */}
        <Stack.Screen name="EstadisticaLavadosDiariosLavador" component={EstadisticaLavadosDiariosLavador} />
        <Stack.Screen name="EstadisticaLavadosMensualesLavador" component={EstadisticaLavadosMensualesLavador} />
        <Stack.Screen name="EstadisticaTiempoDiarioLavador" component={EstadisticaTiempoDiarioLavador} />
        <Stack.Screen name="EstadisticaTiempoMensualLavador" component={EstadisticaTiempoMensualLavador} />
        <Stack.Screen name="EstadisticaCantidadLavadosLocal" component={EstadisticaCantidadLavadosLocal} />
        <Stack.Screen name="EstadisticaCantidadLavadosArea" component={EstadisticaCantidadLavadosArea} />
        <Stack.Screen name="EstadisticaTiempoPromedioArea" component={EstadisticaTiempoPromedioArea} />
        <Stack.Screen name="EstadisticaControlCalidadDia" component={EstadisticaControlCalidadDia} />
        <Stack.Screen name="EstadisticaControlCalidadMes" component={EstadisticaControlCalidadMes} />
        <Stack.Screen name="EstadisticaControlCalidadLocal" component={EstadisticaControlCalidadLocal} />
        <Stack.Screen name="EstadisticaNoConformesLavador" component={EstadisticaNoConformesLavador} />
        <Stack.Screen name="EstadisticaNoConformesLocal" component={EstadisticaNoConformesLocal} />
        <Stack.Screen name="EstadisticaTopNoConformidadesMes" component={EstadisticaTopNoConformidadesMes} />

        {/* Filtros */}
        <Stack.Screen name="FiltroPorFecha" component={FiltroPorFecha} />
        <Stack.Screen name="FiltroPorLavador" component={FiltroPorLavador} />
        <Stack.Screen name="FiltroPorLocal" component={FiltroPorLocal} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}
