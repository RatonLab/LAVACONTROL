// screens/EditarUsuario.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Button } from 'react-native-paper';
import { UserService } from '../services/UserService';

export default function EditarUsuario({ route, navigation }) {
  const { usuario } = route.params;

  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [rol, setRol] = useState('');

  useEffect(() => {
    if (usuario) {
      setNombre(usuario.nombre || '');
      setEmail(usuario.email || '');
      setRol(usuario.rol || '');
    }
  }, [usuario]);

  const handleActualizar = async () => {
    if (!nombre || !email || !rol) {
      Alert.alert('Error', 'Completa todos los campos.');
      return;
    }

    try {
      await UserService.updateUser(usuario.id, { nombre, email, rol });
      Alert.alert('Éxito', 'Usuario actualizado correctamente.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error', 'No se pudo actualizar el usuario.');
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
        editable={false}
        style={[styles.input, { backgroundColor: '#eee' }]}
      />
      <Text style={styles.label}>Selecciona un rol</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={rol} onValueChange={setRol}>
          <Picker.Item label="Selecciona un rol..." value="" />
          <Picker.Item label="Administrador" value="administrador" />
          <Picker.Item label="Lavador" value="lavador" />
          <Picker.Item label="Control de Calidad" value="calidad" />
          <Picker.Item label="Observador" value="observador" />
        </Picker>
      </View>
      <Button mode="contained" onPress={handleActualizar} style={styles.button}>
        Actualizar Usuario
      </Button>
      <Button mode="outlined" onPress={() => navigation.goBack()} style={styles.cancelButton}>
        Cancelar
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { backgroundColor: '#f1f1f1', padding: 12, borderRadius: 8, marginBottom: 15 },
  label: { marginBottom: 5, fontWeight: 'bold' },
  pickerContainer: { backgroundColor: '#f1f1f1', borderRadius: 8, marginBottom: 20 },
  button: { marginTop: 10, backgroundColor: '#2196F3' },
  cancelButton: { marginTop: 10 },
});
