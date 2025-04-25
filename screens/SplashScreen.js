import React, { useEffect } from 'react';
import { View, Image, StyleSheet, ActivityIndicator } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../firebaseConfig';

export default function SplashScreen({ navigation }) {
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // Aquí puedes diferenciar por email para simular ROL
        const email = user.email;
        if (email === 'admin@lavacontrol.com') {
          navigation.replace('AdminHome');
        } else if (email === 'lavador@lavacontrol.com') {
          navigation.replace('LavadorHome');
        } else if (email === 'calidad@lavacontrol.com') {
          navigation.replace('ControlCalidadHome');
        } else if (email === 'observador@lavacontrol.com') {
          navigation.replace('ObservadorHome');
        } else {
          // Si no reconoce el correo, vuelve a Login
          navigation.replace('Login');
        }
      } else {
        // Si no hay sesión iniciada
        navigation.replace('Login');
      }
    });

    return unsubscribe;
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
      <ActivityIndicator size="large" color="#4CAF50" />
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
    width: 180,
    height: 180,
    marginBottom: 20,
    resizeMode: 'contain',
  },
});
