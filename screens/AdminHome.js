// screens/AdminHome.js

import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert
} from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';

export default function AdminHome() {
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigation.replace('Login');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo cerrar sesión.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Bienvenido, Administrador</Text>

      <Text style={styles.sectionTitle}>Gestión de Usuarios</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CreateUser')}
      >
        <Text style={styles.buttonText}>Crear / Eliminar Usuario</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AssignRoles')}
      >
        <Text style={styles.buttonText}>Asignar Roles</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Estadísticas</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('StatsByLavador')}
      >
        <Text style={styles.buttonText}>Lavados por Lavador</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('StatsByLocal')}
      >
        <Text style={styles.buttonText}>Lavados por Local</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('StatsTimeByArea')}
      >
        <Text style={styles.buttonText}>Tiempo Promedio por Área</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Filtros</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('FilterByDate')}
      >
        <Text style={styles.buttonText}>Filtrar por Fecha</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('FilterByLavador')}
      >
        <Text style={styles.buttonText}>Filtrar por Lavador</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('FilterByLocal')}
      >
        <Text style={styles.buttonText}>Filtrar por Local</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    paddingBottom: 40,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2196F3',
    textAlign: 'center',
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    color: '#333',
  },
  button: {
    backgroundColor: '#E3F2FD',
    paddingVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 8,
    marginBottom: 12,
  },
  buttonText: {
    color: '#1E88E5',
    fontSize: 16,
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#F44336',
    marginTop: 30,
  },
});
