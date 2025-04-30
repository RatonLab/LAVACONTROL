import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, Alert, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { UserService } from '../services/UserService';

export default function EditarUsuario({ route, navigation }) {
  const { usuario } = route.params;
  const [nombre, setNombre] = useState(usuario.nombre || '');
  const [email, setEmail] = useState(usuario.email || '');
  const [rol, setRol] = useState(usuario.rol || '');

  const rolesDisponibles = ['lavador', 'administrador', 'calidad', 'observador'];

  const actualizarUsuario = async () => {
    if (!nombre || !email || !rol) {
      Alert.alert('Campos incompletos', 'Por favor completa todos los campos.');
      return;
    }

    try {
      await UserService.updateUser(usuario.id, { nombre, email, rol });
      Alert.alert('Usuario actualizado', 'El usuario ha sido actualizado correctamente.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'Hubo un problema al actualizar el usuario.');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Usuario</Text>
      <TextInput
        placeholder="Nombre completo"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
      />
      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <Picker selectedValue={rol} onValueChange={setRol} style={styles.picker}>
        <Picker.Item label="Selecciona un rol" value="" />
        {rolesDisponibles.map(r => (
          <Picker.Item key={r} label={r.charAt(0).toUpperCase() + r.slice(1)} value={r} />
        ))}
      </Picker>
      <Button title="Actualizar Usuario" onPress={actualizarUsuario} color="#2196F3" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginBottom: 15,
    borderRadius: 5
  },
  picker: {
    marginBottom: 15
  }
});
