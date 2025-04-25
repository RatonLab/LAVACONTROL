import React, { useEffect } from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import { app } from '../firebaseConfig';

export default function SplashScreen() {
  const navigation = useNavigation();
  const auth = getAuth(app);
  const db = getFirestore(app);

  useEffect(() => {
    const timer = setTimeout(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        try {
          if (user) {
            const ref = doc(db, 'usuarios', user.uid);
            const snap = await getDoc(ref);
            const rol = snap.exists() ? snap.data().rol : null;

            switch (rol) {
              case 'admin':
                navigation.replace('AdminHome');
                break;
              case 'lavador':
                navigation.replace('LavadorHome');
                break;
              case 'control':
                navigation.replace('CalidadHome');
                break;
              case 'observador':
                navigation.replace('ObservadorHome');
                break;
              default:
                navigation.replace('Login');
            }
          } else {
            navigation.replace('Login');
          }
        } catch (error) {
          console.log('Error en SplashScreen:', error);
          navigation.replace('Login');
        }
      });

      return () => unsubscribe();
    }, 2000); // espera 2 segundos antes de redirigir

    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />
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
    width: 280,
    height: 280,
    resizeMode: 'contain',
  },
});
