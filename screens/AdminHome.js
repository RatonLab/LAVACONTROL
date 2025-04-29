import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signOut } from 'firebase/auth';
import { db } from '../firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

export default function AdminHome() {
  const navigation = useNavigation();
  const [usuario, setUsuario] = useState(null);
  const [limite, setLimite] = useState(null);
  const [cantidadActual, setCantidadActual] = useState(0);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    if (user) {
      const ref = collection(db, 'usuarios');
      const q = query(ref, where('uid', '==', user.uid));
      getDocs(q).then(snapshot => {
        if (!snapshot.empty) {
          const datos = snapshot.docs[0].data();
          setUsuario(datos);
          setLimite(datos.limiteUsuarios || 0);

          const qUsuarios = query(ref, where('adminId', '==', user.uid));
          getDocs(qUsuarios).then(snap => setCantidadActual(snap.size));
        }
      });
    }
  }, []);

  const cerrarSesion = async () => {
    const auth = getAuth();
    await signOut(auth);
    navigation.replace('Login');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Bienvenido, Administrador</Text>

      {usuario && (
        <View style={styles.infoBox}>
          <Text style={styles.info}>Plan: {usuario.nombrePlan || 'No definido'}</Text>
          <Text style={styles.info}>Usuarios usados: {cantidadActual} / {limite}</Text>
        </View>
      )}

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Gestión de Usuarios</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CrearUsuario')}>
          <Text style={styles.buttonText}>Crear / Eliminar Usuario</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AsignarRoles')}>
          <Text style={styles.buttonText}>Asignar Roles</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Estadísticas</Text>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('AdminStatsMenu')}>
          <Text style={styles.buttonText}>Ver Estadísticas</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={cerrarSesion}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flexGrow: 1,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2196F3',
    marginBottom: 20,
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#E3F2FD',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
  },
  buttonText: {
    color: '#0D47A1',
    fontWeight: '600',
  },
  logoutButton: {
    backgroundColor: '#FF5252',
    padding: 15,
    borderRadius: 8,
    marginTop: 20,
  },
  logoutText: {
    color: 'white',
    textAlign: 'center',
    fontWeight: 'bold',
  },
  infoBox: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#F1F8E9',
    borderRadius: 8,
  },
  info: {
    fontSize: 16,
    color: '#33691E',
  },
});
