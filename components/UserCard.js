import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { MaterialIcons } from '@expo/vector-icons';

export default function UserCard({ usuario, onEliminar }) {
  const navigation = useNavigation();

  const irAEditar = () => {
    navigation.navigate('EditarUsuario', { userId: usuario.id });
  };

  return (
    <View style={styles.card}>
      <Text style={styles.nombre}>{usuario.nombre || 'Sin nombre'}</Text>
      <Text style={styles.info}>Correo: {usuario.email}</Text>
      <Text style={styles.info}>Rol: {usuario.rol}</Text>
      <Text style={styles.info}>Local: {usuario.local || '-'}</Text>
      <Text style={styles.info}>Área: {usuario.area || '-'}</Text>

      <View style={styles.actions}>
        <TouchableOpacity style={styles.botonEditar} onPress={irAEditar}>
          <MaterialIcons name="edit" size={20} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.botonEliminar} onPress={() => onEliminar(usuario.id)}>
          <MaterialIcons name="delete" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    marginVertical: 8,
    elevation: 3,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  info: {
    fontSize: 14,
    color: '#555',
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  botonEditar: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  botonEliminar: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 5,
  },
});
