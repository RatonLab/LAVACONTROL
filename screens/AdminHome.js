import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

export default function AdminHome() {
  const navigation = useNavigation();
  const auth = getAuth();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        navigation.replace('Login');
      })
      .catch((error) => {
        Alert.alert('Error al cerrar sesión', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Gestión de Usuarios</Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('CrearUsuario')}
      >
        <Text style={styles.buttonText}>Crear Usuario</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('ListarUsuarios')}
      >
        <Text style={styles.buttonText}>Ver y Editar Usuarios</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleSignOut}
      >
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  button: {
    backgroundColor: '#2196F3',
    padding: 15,
    borderRadius: 8,
    marginBottom: 15,
  },
  buttonText: { color: '#fff', textAlign: 'center', fontWeight: 'bold' },
  logoutButton: {
    marginTop: 20,
    borderWidth: 1,
    borderColor: '#f44336',
    padding: 12,
    borderRadius: 8,
  },
  logoutText: { color: '#f44336', textAlign: 'center', fontWeight: 'bold' },
});
