// screens/AdminListUsers.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';

export default function AdminListUsers() {
  const [usuarios, setUsuarios] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'usuarios'));
        const listaUsuarios = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setUsuarios(listaUsuarios);
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    };

    fetchUsuarios();
  }, []);

  const renderItem = ({ item }) => {
    const userToSend = {
      id: item.id,
      nombre: item.nombre,
      correo: item.correo || item.email,
      rol: item.rol,
    };

    return (
      <TouchableOpacity
        style={styles.item}
        onPress={() => {
          console.log('🧾 Enviando usuario a EditarUsuario:', userToSend);
          navigation.navigate('EditarUsuario', { user: userToSend });
        }}
      >
        <Text style={styles.nombre}>{userToSend.nombre}</Text>
        <Text style={styles.correo}>{userToSend.correo}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>👤 Usuarios Registrados</Text>
      <FlatList
        data={usuarios}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.lista}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 20,
    textAlign: 'center'
  },
  lista: { paddingBottom: 20 },
  item: {
    backgroundColor: '#E3F2FD',
    padding: 15,
    borderRadius: 8,
    marginBottom: 12,
  },
  nombre: { fontSize: 18, fontWeight: 'bold' },
  correo: { fontSize: 14, color: '#555' },
});
