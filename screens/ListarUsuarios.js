// screens/ListarUsuarios.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, Alert, StyleSheet } from 'react-native';
import { getAllUsers, updateUserRole, deleteUser } from '../services/UserService';
import UserCard from '../components/UserCard';

export default function ListarUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  const cargarUsuarios = async () => {
    setLoading(true);
    const lista = await getAllUsers();
    setUsuarios(lista);
    setLoading(false);
  };

  useEffect(() => {
    cargarUsuarios();
  }, []);

  const cambiarRol = async (uid, nuevoRol) => {
    await updateUserRole(uid, nuevoRol);
    cargarUsuarios();
  };

  const confirmarEliminacion = (uid) => {
    Alert.alert(
      '¿Eliminar usuario?',
      'Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Eliminar', style: 'destructive', onPress: () => eliminarUsuario(uid) }
      ]
    );
  };

  const eliminarUsuario = async (uid) => {
    await deleteUser(uid);
    cargarUsuarios();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Usuarios Registrados</Text>

      {loading ? (
        <ActivityIndicator size="large" color="#2196F3" />
      ) : (
        <FlatList
          data={usuarios}
          keyExtractor={(item) => item.uid}
          renderItem={({ item }) => (
            <UserCard
              usuario={item}
              onCambiarRol={(nuevoRol) => cambiarRol(item.uid, nuevoRol)}
              onEliminar={() => confirmarEliminacion(item.uid)}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  titulo: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 }
});
