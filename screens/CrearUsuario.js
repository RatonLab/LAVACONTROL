// screens/CrearUsuario.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { UserService } from '../services/UserService';
import { useNavigation } from '@react-navigation/native';

export default function CrearUsuario() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [rol, setRol] = useState('');
  const navigation = useNavigation();

  const handleCreate = async () => {
    if (!nombre || !email || !rol) {
      Alert.alert('Campos incompletos', 'Por favor completa todos los campos.');
      return;
    }

    try {
      await UserService.createUser({ nombre, email, rol });
      Alert.alert('Éxito', 'Usuario creado correctamente');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo crear el usuario');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Usuario</Text>

      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        value={nombre}
        onChangeText={setNombre}
      />

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
      />

      <Picker
        selectedValue={rol}
        onValueChange={(itemValue) => setRol(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Selecciona un rol..." value="" />
        <Picker.Item label="Administrador" value="administrador" />
        <Picker.Item label="Lavador" value="lavador" />
        <Picker.Item label="Control de Calidad" value="control_calidad" />
        <Picker.Item label="Observador" value="observador" />
      </Picker>

      <Button title="Crear Usuario" onPress={handleCreate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: {
    borderWidth: 1, borderColor: '#ccc', borderRadius: 5,
    padding: 10, marginBottom: 15
  },
  picker: { marginBottom: 20 }
});
