import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert, Image, ActivityIndicator } from 'react-native';
import { getAuth, signOut, onAuthStateChanged } from 'firebase/auth';
import app from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';

const auth = getAuth(app);

export default function AdminHome() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true); // Nueva bandera de carga

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoading(false); // Si está autenticado, carga pantalla
      } else {
        navigation.replace('Login'); // Si no, lo manda al Login
      }
    });

    return unsubscribe; // Limpieza al salir
  }, []);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.replace('Login');
      })
      .catch((error) => {
        Alert.alert('Error al cerrar sesión', error.message);
      });
  };

  const handleGestionUsuarios = () => {
    Alert.alert('Gestión de Usuarios', 'Aquí podrás crear, eliminar y asignar roles.');
  };

  const handleVerEstadisticas = () => {
    Alert.alert('Estadísticas', 'Aquí podrás visualizar estadísticas globales y por usuario.');
  };

  const handleVerRegistros = () => {
    Alert.alert('Registros', 'Aquí podrás consultar todos los lavados registrados.');
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <Text style={styles.title}>Bienvenido Administrador</Text>

      <TouchableOpacity style={styles.button} onPress={handleGestionUsuarios}>
        <Text style={styles.buttonText}>Gestión de Usuarios</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleVerEstadisticas}>
        <Text style={styles.buttonText}>Visualizar Estadísticas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleVerRegistros}>
        <Text style={styles.buttonText}>Ver Registros</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.button, styles.signOutButton]} onPress={handleSignOut}>
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#333',
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    width: '100%',
    borderRadius: 8,
    marginBottom: 15,
    alignItems: 'center',
  },
  signOutButton: {
    backgroundColor: '#FF5252',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
