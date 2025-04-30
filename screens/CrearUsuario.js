import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { UserService } from '../services/UserService';
import { useNavigation } from '@react-navigation/native';

export default function CrearUsuario() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [rol, setRol] = useState('');
  const navigation = useNavigation();

  const crearUsuario = async () => {
    if (!nombre || !email || !rol) {
      Alert.alert('Campos incompletos', 'Por favor completa todos los campos.');
      return;
    }

    try {
      await UserService.createUser({ nombre, email, rol });
      Alert.alert('Éxito', 'Usuario creado correctamente.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'No se pudo crear el usuario: ' + error.message);
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
        autoCapitalize="none"
      />

      <Text style={styles.label}>Rol:</Text>
      <View style={styles.pickerContainer}>
        <Picker
          selectedValue={rol}
          onValueChange={(itemValue) => setRol(itemValue)}
        >
          <Picker.Item label="Selecciona un rol..." value="" />
          <Picker.Item label="Administrador" value="administrador" />
          <Picker.Item label="Lavador" value="lavador" />
          <Picker.Item label="Control de Calidad" value="calidad" />
          <Picker.Item label="Observador" value="observador" />
        </Picker>
      </View>

      <Button
        mode="contained"
        onPress={crearUsuario}
        style={styles.button}
      >
        Crear Usuario
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#f1f1f1',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  pickerContainer: {
    backgroundColor: '#f1f1f1',
    borderRadius: 8,
    marginBottom: 20,
  },
  button: {
    marginTop: 10,
    padding: 8,
  },
});
