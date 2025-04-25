import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { signOut } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';

export default function AdminHome() {
  const navigation = useNavigation();

  const handleLogout = async () => {
    await signOut(auth);
    navigation.replace('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bienvenido, Administrador</Text>
      <Button title="Cerrar sesión" onPress={handleLogout} color="#D9534F" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff'
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20
  }
});
