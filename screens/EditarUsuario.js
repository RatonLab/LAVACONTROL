import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function EditarUsuario() {
  const navigation = useNavigation();
  const route = useRoute();
  const { userId } = route.params; // 📦 Recibimos el ID del usuario

  const [email, setEmail] = useState('');
  const [rol, setRol] = useState('');
  const [local, setLocal] = useState('');
  const [area, setArea] = useState('');

  useEffect(() => {
    const cargarDatosUsuario = async () => {
      try {
        const userRef = doc(db, 'usuarios', userId);
        const userSnap = await getDoc(userRef);

        if (userSnap.exists()) {
          const userData = userSnap.data();
          setEmail(userData.email || '');
          setRol(userData.rol || '');
          setLocal(userData.local || '');
          setArea(userData.area || '');
        } else {
          Alert.alert('Error', 'Usuario no encontrado');
          navigation.goBack();
        }
      } catch (error) {
        console.error('Error cargando usuario:', error);
        Alert.alert('Error', 'No se pudo cargar la información del usuario');
      }
    };

    cargarDatosUsuario();
  }, []);

  const handleGuardarCambios = async () => {
    try {
      const userRef = doc(db, 'usuarios', userId);
      await updateDoc(userRef, {
        email,
        rol,
        local,
        area,
      });

      Alert.alert('Éxito', 'Usuario actualizado correctamente');
      navigation.goBack();
    } catch (error) {
      console.error('Error actualizando usuario:', error);
      Alert.alert('Error', 'No se pudo actualizar el usuario');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Usuario</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Rol (lavador, calidad, observador)"
        value={rol}
        onChangeText={setRol}
      />
      <TextInput
        style={styles.input}
        placeholder="Local (ej: Local 1)"
        value={local}
        onChangeText={setLocal}
      />
      <TextInput
        style={styles.input}
        placeholder="Área (ej: Mecánica, Ventas)"
        value={area}
        onChangeText={setArea}
      />

      <TouchableOpacity style={styles.button} onPress={handleGuardarCambios}>
        <Text style={styles.buttonText}>Guardar Cambios</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonBack} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff', justifyContent: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonBack: {
    backgroundColor: '#2196F3',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
});
