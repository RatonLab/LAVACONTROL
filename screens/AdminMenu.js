import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';

export default function AdminMenu() {
  const navigation = useNavigation();

  const handleLogout = () => {
    signOut(auth)
      .then(() => navigation.replace('Login'))
      .catch(err => {
        console.error(err);
        Alert.alert('Error', 'No se pudo cerrar sesión.');
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Panel de Administrador</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AdminHome')}
      >
        <Text style={styles.buttonText}>Gestión de Usuarios</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('AdminStatsMenu')}
      >
        <Text style={styles.buttonText}>Estadísticas</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.logoutButton]}
        onPress={handleLogout}
      >
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#2196F3',
    textAlign: 'center',
    marginBottom: 40
  },
  button: {
    backgroundColor: '#E3F2FD',
    paddingVertical: 16,
    borderRadius: 8,
    marginBottom: 20
  },
  logoutButton: {
    backgroundColor: '#F44336'
  },
  buttonText: {
    color: '#1E88E5',
    fontSize: 18,
    textAlign: 'center'
  }
});
