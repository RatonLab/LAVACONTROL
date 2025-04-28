import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';

export default function ControlCalidadUnidades() {
  const navigation = useNavigation();
  const [lavados, setLavados] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    cargarLavados();
  }, []);

  const cargarLavados = async () => {
    try {
      const lavadosRef = collection(db, 'lavados');
      const querySnapshot = await getDocs(lavadosRef);

      const lavadosCargados = querySnapshot.docs
        .map(docSnap => ({ id: docSnap.id, ...docSnap.data() }))
        .filter(lavado => !lavado.estadoControl || lavado.estadoControl === 'pendiente');

      setLavados(lavadosCargados);
    } catch (error) {
      console.error('Error al cargar lavados:', error);
    } finally {
      setLoading(false);
    }
  };

  const marcarLavado = async (lavadoId, estado) => {
    try {
      const lavadoRef = doc(db, 'lavados', lavadoId);
      await updateDoc(lavadoRef, {
        estadoControl: estado,
      });
      Alert.alert('Éxito', `Unidad marcada como ${estado}`);
      cargarLavados(); // Refrescar
    } catch (error) {
      console.error('Error al actualizar lavado:', error);
    }
  };
  const volverMenuPrincipal = () => {
    navigation.navigate('ControlCalidadHome');
  };
  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator size="large" color="#2196F3" style={{ marginTop: 50 }} />
      ) : lavados.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No hay unidades pendientes de control.</Text>
          <TouchableOpacity style={styles.backButton} onPress={volverMenuPrincipal}>
            <Text style={styles.backButtonText}>Volver al Menú Principal</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
          {lavados.map((lavado) => (
            <View key={lavado.id} style={styles.lavadoCard}>
              <Text style={styles.label}>Patente: {lavado.patente}</Text>
              <Text style={styles.label}>Área: {lavado.area}</Text>
              <Text style={styles.label}>Local: {lavado.local}</Text>
  
              <View style={styles.buttonsRow}>
                <TouchableOpacity style={styles.okButton} onPress={() => marcarLavado(lavado.id, 'Conforme')}>
                  <Text style={styles.buttonText}>Conforme</Text>
                </TouchableOpacity>
  
                <TouchableOpacity style={styles.noconformeButton} onPress={() => marcarLavado(lavado.id, 'No Conforme')}>
                  <Text style={styles.buttonText}>No Conforme</Text>
                </TouchableOpacity>
  
                <TouchableOpacity style={styles.norevisadoButton} onPress={() => marcarLavado(lavado.id, 'No Revisado')}>
                  <Text style={styles.buttonText}>No Revisado</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
  }
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      padding: 20,
    },
    lavadoCard: {
      backgroundColor: '#f9f9f9',
      padding: 20,
      borderRadius: 8,
      marginBottom: 15,
      elevation: 2,
    },
    label: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 5,
      color: '#333',
    },
    buttonsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 15,
    },
    okButton: {
      backgroundColor: '#4CAF50',
      padding: 10,
      borderRadius: 8,
      flex: 1,
      marginRight: 5,
    },
    noconformeButton: {
      backgroundColor: '#F44336',
      padding: 10,
      borderRadius: 8,
      flex: 1,
      marginLeft: 5,
      marginRight: 5,
    },
    norevisadoButton: {
      backgroundColor: '#FFC107',
      padding: 10,
      borderRadius: 8,
      flex: 1,
      marginLeft: 5,
    },
    buttonText: {
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    emptyContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    emptyText: {
      fontSize: 18,
      marginBottom: 20,
      color: '#777',
      textAlign: 'center',
    },
    backButton: {
      backgroundColor: '#2196F3',
      padding: 15,
      borderRadius: 8,
    },
    backButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });
    