// screens/EditarUsuario.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Button, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { UserService } from '../services/UserService';
import { useNavigation, useRoute } from '@react-navigation/native';

export default function EditarUsuario() {
  const navigation = useNavigation();
  const route = useRoute();
  const { user } = route.params;

  const [nombre, setNombre] = useState(user?.nombre || '');
  const [email, setEmail] = useState(user?.email || '');
  const [rol, setRol] = useState(user?.rol || '');

  const handleUpdate = async () => {
    if (!nombre || !email || !rol) {
      Alert.alert('Campos incompletos', 'Por favor completa todos los campos.');
      return;
    }

    try {
      await UserService.updateUser(user.id, { nombre, email, rol });
      Alert.alert('Actualizado', 'Usuario actualizado correctamente');
      navigation.goBack();
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo actualizar el usuario');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Usuario</Text>

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
        editable={false}
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

      <Button title="Actualizar Usuario" onPress={handleUpdate} />
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
