import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  ScrollView
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  serverTimestamp
} from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';

export default function ControlCalidadUnidades() {
  const navigation = useNavigation();
  const db = getFirestore();

  const [loading, setLoading] = useState(true);
  const [lavados, setLavados] = useState([]);           // lista de lavados pendientes
  const [selectedNC, setSelectedNC] = useState({});     // mapa id → código NC seleccionado
  // Carga los lavados con estadoCalidad === 'Pendiente'
  useEffect(() => {
    async function fetchLavados() {
      setLoading(true);
      try {
        const q = query(
          collection(db, 'lavados'),
          where('estadoCalidad', '==', 'Pendiente')
        );
        const snap = await getDocs(q);
        const arr = snap.docs.map(d => ({ id: d.id, ...d.data() }));
        setLavados(arr);
      } catch (err) {
        console.error(err);
        Alert.alert('Error', 'No se pudieron cargar las unidades.');
      } finally {
        setLoading(false);
      }
    }
    fetchLavados();
  }, []);

  // Marca el lavado con el estado y opcional código de NC
  const markAs = async (id, estado, ncCode = null) => {
    try {
      const ref = doc(db, 'lavados', id);
      const data = { estadoCalidad: estado, revisadoEn: serverTimestamp() };
      if (ncCode) data.noConformidad = ncCode;
      await updateDoc(ref, data);
      setLavados(prev => prev.filter(item => item.id !== id));
      Alert.alert('✅ Éxito', `Marcado como "${estado}"`);
    } catch (err) {
      console.error(err);
      Alert.alert('Error', 'No se pudo actualizar el estado.');
    }
  };

  const handleConforme = id => markAs(id, 'Conforme');
  const handleNoRevisado = id => markAs(id, 'No Revisado');
  const handleNoConforme = id => {
    const code = selectedNC[id];
    if (!code) {
      Alert.alert('Elige No Conformidad', 'Selecciona una opción antes de confirmar.');
      return;
    }
    markAs(id, 'No Conforme', code);
  };
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  if (lavados.length === 0) {
    return (
      <View style={styles.center}>
        <Text style={styles.emptyText}>No hay unidades por controlar.</Text>
        <TouchableOpacity
          style={styles.buttonReturn}
          onPress={() => navigation.navigate('ControlCalidadHome')}
        >
          <Text style={styles.buttonText}>Volver a Menú Principal</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {lavados.map(item => (
        <View key={item.id} style={styles.card}>
          <Text style={styles.patente}>{item.patente}</Text>
          <Text>Vehículo: {item.tipoVehiculo}</Text>
          <Text>Área: {item.area}</Text>
          <Text>Lavado: {item.tipoLavado}</Text>
          <Text>Local: {item.local}</Text>

          <View style={styles.buttonsRow}>
            <TouchableOpacity
              style={[styles.btn, styles.btnConforme]}
              onPress={() => handleConforme(item.id)}
            >
              <Text style={styles.btnText}>Conforme</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.btn, styles.btnNoConforme]}
              onPress={() => {/* despliega picker que siempre está aquí debajo */}}
            >
              <Text style={styles.btnText}>No Conforme</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.btn, styles.btnNoRevisado]}
              onPress={() => handleNoRevisado(item.id)}
            >
              <Text style={styles.btnText}>No Revisado</Text>
            </TouchableOpacity>
          </View>

          <Picker
            selectedValue={selectedNC[item.id] || ''}
            onValueChange={val =>
              setSelectedNC(prev => ({ ...prev, [item.id]: val }))
            }
            style={styles.picker}
          >
            <Picker.Item label="Elige No Conformidad..." value="" />
            <Picker.Item label="NC01 - Suciedad en zonas visibles" value="NC01" />
            <Picker.Item label="NC02 - Vidrios con manchas" value="NC02" />
            <Picker.Item label="NC03 - Ruedas mal lavadas" value="NC03" />
            <Picker.Item label="NC04 - Interior con polvo" value="NC04" />
            <Picker.Item label="NC05 - Tapicería manchada" value="NC05" />
            <Picker.Item label="NC06 - Mal olor interior" value="NC06" />
            <Picker.Item label="NC07 - Guardafangos sucios" value="NC07" />
            <Picker.Item label="NC08 - Restos de jabón" value="NC08" />
            <Picker.Item label="NC09 - Motor no lavado" value="NC09" />
            <Picker.Item label="NC10 - Limpieza inaccesible" value="NC10" />
          </Picker>

          <TouchableOpacity
            style={[styles.btn, styles.btnConfirmNC]}
            onPress={() => handleNoConforme(item.id)}
          >
            <Text style={styles.btnText}>Confirmar NC</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
}  // Cierra ControlCalidadUnidades
const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 18,
    marginBottom: 20,
    color: '#555',
  },
  card: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    marginBottom: 15,
    backgroundColor: '#fafafa',
  },
  patente: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  btn: {
    flex: 1,
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginHorizontal: 4,
  },
  btnConforme: { backgroundColor: '#4CAF50' },
  btnNoConforme: { backgroundColor: '#FF9800' },
  btnNoRevisado: { backgroundColor: '#9E9E9E' },
  btnConfirmNC: {
    backgroundColor: '#f44336',
    padding: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 8,
  },
  btnText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  picker: {
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  buttonReturn: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  }
});
