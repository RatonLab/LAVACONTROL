import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';

export default function UserCard({ nombre, email, rol, onEdit, onDelete }) {
  return (
    <View style={styles.card}>
      <Text style={styles.nombre}>{nombre || 'Sin nombre'}</Text>
      <Text style={styles.detalle}>Correo: {email || 'Sin correo'}</Text>
      <Text style={styles.detalle}>Rol: {rol || 'Sin rol'}</Text>
      <View style={styles.botones}>
        <Button mode="outlined" onPress={onEdit} style={styles.boton}>Editar</Button>
        <Button mode="contained" onPress={onDelete} style={styles.botonEliminar}>Eliminar</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  nombre: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  detalle: {
    fontSize: 14,
    marginTop: 4,
  },
  botones: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
  },
  boton: {
    borderColor: '#007BFF',
    borderWidth: 1,
  },
  botonEliminar: {
    backgroundColor: '#e53935',
  },
});
