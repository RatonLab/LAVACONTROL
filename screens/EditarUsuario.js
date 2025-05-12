// screens/EditarUsuario.js
import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { UserService } from '../services/UserService';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function EditarUsuario() {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = route.params || {};

  console.log('📥 Datos recibidos en EditarUsuario:', route.params);

  if (!user || !user.id) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>
          ❌ No se recibió la información del usuario. Intenta desde la lista nuevamente.
        </Text>
        <Button title="Volver" onPress={() => navigation.goBack()} />
      </View>
    );
  }

  const [nombre, setNombre] = useState(user?.nombre || '');
  const [email, setEmail] = useState(user?.correo || user?.email || '');
  const [rol, setRol] = useState(user?.rol || '');

  const handleUpdate = async () => {
    if (!nombre || !rol) {
      Alert.alert('Campos incompletos', 'Por favor completa nombre y rol.');
      return;
    }

    try {
      await UserService.updateUser(user.id, { nombre, rol });
      Alert.alert('✅ Actualizado', 'Usuario actualizado correctamente');
      navigation.goBack();
    } catch (error) {
      console.error('❌ Error al actualizar usuario:', error);
      Alert.alert('Error', 'No se pudo actualizar el usuario');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Usuario</Text>

      <Text style={styles.label}>Nombre completo</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre completo"
        value={nombre}
        onChangeText={setNombre}
      />

      <Text style={styles.label}>Correo electrónico</Text>
      <TextInput
        style={[styles.input, styles.disabledInput]}
        value={email}
        editable={false}
        selectTextOnFocus={false}
      />

      <Text style={styles.label}>Rol</Text>
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

      <Button title="Actualizar Usuario" onPress={handleUpdate} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2196F3'
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#f9f9f9'
  },
  disabledInput: {
    backgroundColor: '#eee',
    color: '#888'
  },
  picker: {
    marginBottom: 20,
    backgroundColor: '#f9f9f9'
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff'
  },
  errorText: {
    fontSize: 18,
    color: '#c00',
    textAlign: 'center',
    marginBottom: 20
  }
});
