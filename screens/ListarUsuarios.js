import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { UserService } from '../services/UserService';
import UserCard from '../components/UserCard';

export default function ListarUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const cargar = async () => {
      try {
        await UserService.asignarAdminIdSiFalta();
        const data = await UserService.getAllUsers();
        setUsuarios(data);
      } catch (error) {
        console.error('Error al cargar usuarios:', error);
      } finally {
        setLoading(false);
      }
    };

    cargar();
  }, []);

  const handleEliminar = async (userId) => {
    await UserService.deleteUser(userId);
    const data = await UserService.getAllUsers();
    setUsuarios(data);
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Buscando usuarios...</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Usuarios Registrados</Text>
      {usuarios.length === 0 ? (
        <Text style={styles.noUsers}>No hay usuarios registrados.</Text>
      ) : (
        usuarios.map((usuario) => (
          <UserCard key={usuario.id} usuario={usuario} onEliminar={handleEliminar} />
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'stretch',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 20,
  },
  noUsers: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center',
    marginTop: 30,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#666',
  },
});
