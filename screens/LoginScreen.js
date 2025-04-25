import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
} from 'react-native';
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from 'firebase/auth';
import { auth } from '../firebaseConfig'; // ✅ auth con persistencia
import { useNavigation } from '@react-navigation/native';

export default function LoginScreen() {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Campos incompletos', 'Por favor, completa los campos.');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (!user.emailVerified) {
        Alert.alert(
          'Correo no verificado',
          'Debes verificar tu correo electrónico antes de ingresar.'
        );
        return;
      }

      // 🔁 Luego de login exitoso, Splash redirige según el rol
      navigation.replace('Splash');

    } catch (error) {
      console.error(error);
      Alert.alert('Error al iniciar sesión', error.message);
    }
  };

  const handleForgotPassword = () => {
    if (!email) {
      Alert.alert('Campo requerido', 'Por favor ingresa tu correo para recuperar la contraseña.');
      return;
    }

    sendPasswordResetEmail(auth, email)
      .then(() => {
        Alert.alert('Correo enviado', 'Revisa tu correo electrónico para restablecer tu contraseña.');
      })
      .catch((error) => {
        console.error(error);
        Alert.alert('Error', error.message);
      });
  };

  return (
    <View style={styles.container}>
      <Image source={require('../assets/logo.png')} style={styles.logo} />

      <TextInput
        style={styles.input}
        placeholder="Correo electrónico"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>INICIAR SESIÓN</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleForgotPassword}>
        <Text style={styles.forgotText}>¿Olvidaste tu contraseña?</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>
          ¿No tienes cuenta? <Text style={{ color: 'blue' }}>Regístrate</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    backgroundColor: '#fff',
  },
  logo: {
    width: 140,
    height: 140,
    alignSelf: 'center',
    marginBottom: 20,
    resizeMode: 'contain',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  button: {
    backgroundColor: '#2196F3',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  forgotText: {
    color: '#2196F3',
    textAlign: 'center',
    marginBottom: 15,
  },
  registerText: {
    textAlign: 'center',
    color: '#333',
  },
});
