import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signOut } from 'firebase/auth';
import { db } from '../firebaseConfig';
import { collection, getDocs, updateDoc, doc } from 'firebase/firestore';

export default function AdminHome() {
  const navigation = useNavigation();
  const auth = getAuth();
  const [usuario, setUsuario] = useState(null);

  // 🔧 Corrección automática de usuarios sin nombre
  const corregirUsuariosSinNombre = async () => {
    const usuariosRef = collection(db, 'usuarios');
    const snapshot = await getDocs(usuariosRef);

    snapshot.forEach(async (usuario) => {
      const data = usuario.data();
      if (!data.nombre) {
        const nombreGenerado = data.email.split('@')[0];
        await updateDoc(doc(db, 'usuarios', usuario.id), {
          nombre: nombreGenerado,
        });
        console.log(`Nombre agregado al usuario: ${nombreGenerado}`);
      }
    });
  };

  useEffect(() => {
    corregirUsuariosSinNombre();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      Alert.alert('Error al cerrar sesión', error.message);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Bienvenido, Administrador</Text>

      <Text style={styles.section}>Gestión de Usuarios</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('ListarUsuarios')}>
        <Text style={styles.buttonText}>Ver y Editar Usuarios</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CrearUsuario')}>
        <Text style={styles.buttonText}>Crear Usuario</Text>
      </TouchableOpacity>

      <Text style={styles.section}>Estadísticas</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AdminStatsMenu')}>
        <Text style={styles.buttonText}>Ver Panel Estadístico</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
    textAlign: 'center',
    marginBottom: 30,
  },
  section: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#E3F2FD',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  buttonText: {
    fontSize: 16,
    color: '#0D47A1',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logoutButton: {
    marginTop: 30,
    backgroundColor: '#FF5252',
    padding: 15,
    borderRadius: 10,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
