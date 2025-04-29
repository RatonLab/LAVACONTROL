// screens/CrearUsuario.js

import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { db } from '../firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

export default function CrearUsuario() {
  const [email, setEmail] = useState('');
  const [rol, setRol] = useState('');
  const navigation = useNavigation();

  const handleCrearUsuario = async () => {
    if (!email || !rol) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }

    try {
      const usuariosRef = collection(db, 'usuarios');
      await addDoc(usuariosRef, {
        email: email.toLowerCase(),
        rol: rol.toLowerCase(),
        estadoCuenta: 'activa', // Puedes agregar más campos si quieres
      });

      Alert.alert('Éxito', 'Usuario creado correctamente.');
      setEmail('');
      setRol('');
    } catch (error) {
      console.error('Error al crear usuario:', error);
      Alert.alert('Error', 'No se pudo crear el usuario.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Usuario</Text>

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Rol (lavador, calidad, observador)"
        value={rol}
        onChangeText={setRol}
      />

      <TouchableOpacity style={styles.button} onPress={handleCrearUsuario}>
        <Text style={styles.buttonText}>Crear Usuario</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonBack} onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Volver</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#4CAF50',
    marginBottom: 30,
  },
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
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
