// screens/CrearUsuario.js
import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Alert } from 'react-native';
import { Button } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs, doc, setDoc } from 'firebase/firestore';
import app from '../firebaseConfig';

export default function CrearUsuario() {
  const [nombre, setNombre] = useState('');
  const [email, setEmail] = useState('');
  const [rol, setRol] = useState('');
  const [adminId, setAdminId] = useState(null);
  const navigation = useNavigation();

  const auth = getAuth(app);
  const db = getFirestore(app);

  useEffect(() => {
    const user = auth.currentUser;
    if (user) {
      setAdminId(user.uid);
    }
  }, []);

  const handleCrear = async () => {
    if (!nombre || !email || !rol) {
      Alert.alert('Error', 'Por favor completa todos los campos.');
      return;
    }

    if (!adminId) {
      Alert.alert('Error', 'No se pudo obtener el ID del administrador.');
      return;
    }

    try {
      // Verificar límite de usuarios (máximo 4 por administrador)
      const q = query(collection(db, 'usuarios'), where('adminId', '==', adminId));
      const snapshot = await getDocs(q);

      if (snapshot.size >= 4) {
        Alert.alert('Límite alcanzado', 'Ya has creado el máximo de 4 usuarios para esta cuenta.');
        return;
      }

      // Crear usuario en Firebase Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, '123456');
      const newUser = userCredential.user;

      // Registrar datos en Firestore
      await setDoc(doc(db, 'usuarios', newUser.uid), {
        nombre,
        email,
        rol,
        adminId,
        uid: newUser.uid
      });

      Alert.alert('Éxito', 'Usuario creado correctamente.');
      navigation.goBack();
    } catch (error) {
      Alert.alert('Error al crear usuario', error.message);
    }
  };

  const handleCancelar = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Crear Usuario</Text>
      <TextInput
        placeholder="Nombre"
        value={nombre}
        onChangeText={setNombre}
        style={styles.input}
      />
      <TextInput
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        style={styles.input}
      />
      <Text style={styles.label}>Rol</Text>
      <View style={styles.pickerContainer}>
        <Picker selectedValue={rol} onValueChange={(value) => setRol(value)}>
          <Picker.Item label="Selecciona un rol..." value="" />
          <Picker.Item label="Administrador" value="administrador" />
          <Picker.Item label="Lavador" value="lavador" />
          <Picker.Item label="Control de Calidad" value="calidad" />
          <Picker.Item label="Observador" value="observador" />
        </Picker>
      </View>
      <Button mode="contained" onPress={handleCrear} style={styles.button}>
        Crear Usuario
      </Button>
      <Button mode="outlined" onPress={handleCancelar} style={styles.cancelButton}>
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
  button: { marginTop: 10, backgroundColor: '#6200ee' },
  cancelButton: { marginTop: 10, borderColor: '#6200ee' },
});
