// screens/SplashScreen.js

import React, { useEffect } from 'react';
import {
  View,
  Image,
  StyleSheet,
  ActivityIndicator,
  Alert
} from 'react-native';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebaseConfig';

export default function SplashScreen({ navigation }) {
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // Mantener el splash unos segundos
      setTimeout(async () => {
        if (user) {
          try {
            const docRef = doc(db, 'usuarios', user.uid);
            const docSnap = await getDoc(docRef);

            if (docSnap.exists()) {
              const rol = docSnap.data().rol?.toLowerCase();

              if (rol === 'administrador') {
                navigation.replace('AdminMenu');
              } else if (rol === 'lavador') {
                navigation.replace('LavadorHome');
              } else if (rol === 'calidad') {
                navigation.replace('ControlCalidadHome');
              } else if (rol === 'observador') {
                navigation.replace('ObservadorHome');
              } else {
                Alert.alert(
                  'Error de rol',
                  'No se reconoce tu rol. Contacta al administrador.'
                );
                navigation.replace('Login');
              }
            } else {
              Alert.alert('Error', 'Usuario no registrado en la base de datos.');
              navigation.replace('Login');
            }
          } catch (error) {
            Alert.alert('Error al obtener datos', error.message);
            navigation.replace('Login');
          }
        } else {
          navigation.replace('Login');
        }
      }, 2000);
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
      />
      <ActivityIndicator size="large" color="#2196F3" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 200,
    height: 200,
    marginBottom: 20,
    resizeMode: 'contain',
  },
});
