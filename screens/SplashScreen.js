import React, { useEffect } from 'react';
import { View, Image, StyleSheet, ActivityIndicator, Alert } from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, getFirestore } from 'firebase/firestore';
import { auth } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';

export default function SplashScreen() {
  const navigation = useNavigation();
  const db = getFirestore();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setTimeout(async () => {
        if (user) {
          if (!user.emailVerified) {
            Alert.alert(
              'Correo no verificado',
              'Debes verificar tu correo antes de ingresar.'
            );
            navigation.replace('Login');
            return;
          }

          try {
            const docRef = doc(db, 'usuarios', user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              const data = docSnap.data();
              const rol = data.rol?.toLowerCase();

              if (rol === 'administrador') {
                navigation.replace('AdminHome');
              } else if (rol === 'lavador') {
                navigation.replace('LavadorHome');
              } else if (rol === 'calidad') {
                navigation.replace('ControlCalidadHome');
              } else if (rol === 'observador') {
                navigation.replace('ObservadorHome');
              } else {
                Alert.alert('Error de rol', 'Rol no reconocido.');
                navigation.replace('Login');
              }
            } else {
              Alert.alert('Usuario no registrado en Firestore.');
              navigation.replace('Login');
            }
          } catch (error) {
            Alert.alert('Error', 'Problema al obtener datos del usuario.');
            navigation.replace('Login');
          }
        } else {
          navigation.replace('Login');
        }
      }, 2000); // Mostrar el logo
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <ActivityIndicator size="large" color="#2196F3" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 260, // logo grande como me pediste
    height: 260,
    resizeMode: 'contain',
  },
});
