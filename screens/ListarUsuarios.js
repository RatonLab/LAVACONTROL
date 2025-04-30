import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator, StyleSheet, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Button } from 'react-native-paper';
import { UserService } from '../services/UserService';
import UserCard from '../components/UserCard';

export default function ListarUsuarios() {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const cargarUsuarios = async () => {
    try {
      const data = await UserService.getAllUsers();
      setUsuarios(data);
    } catch (error) {
      Alert.alert('Error', 'No se pudieron cargar los usuarios');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    Alert.alert('Confirmar', '¿Estás seguro que deseas eliminar este usuario?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Eliminar',
        onPress: async () => {
          try {
            await UserService.deleteUser(id);
            cargarUsuarios();
          } catch (error) {
            Alert.alert('Error', 'No se pudo eliminar el usuario');
          }
        },
      },
    ]);
  };

  const handleEdit = (usuario) => {
    navigation.navigate('EditarUsuario', { usuario });
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', cargarUsuarios);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Usuarios Registrados</Text>
      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : usuarios.length === 0 ? (
        <Text style={styles.subtitulo}>No hay usuarios registrados.</Text>
      ) : (
        <FlatList
          data={usuarios}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => {
            if (!item || !item.nombre || !item.email || !item.rol) return null;
            return (
              <UserCard
                nombre={item.nombre}
                email={item.email}
                rol={item.rol}
                onEdit={() => handleEdit(item)}
                onDelete={() => handleDelete(item.id)}
              />
            );
          }}
        />
      )}
      <Button mode="contained" onPress={() => navigation.goBack()} style={styles.botonVolver}>
        Volver al menú
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitulo: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 20,
  },
  botonVolver: {
    marginTop: 20,
    backgroundColor: '#2196F3',
  },
});
