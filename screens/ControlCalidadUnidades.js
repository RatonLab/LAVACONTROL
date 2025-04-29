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
  const [selectedNC, setSelectedNC] = useState({});     // mapa id → array de códigos NC

  // Lista completa de No Conformidades
  const NC_OPTIONS = [
    { code: 'NC01', label: 'Suciedad en zonas visibles' },
    { code: 'NC02', label: 'Vidrios con manchas' },
    { code: 'NC03', label: 'Ruedas mal lavadas' },
    { code: 'NC04', label: 'Interior con polvo' },
    { code: 'NC05', label: 'Tapicería manchada' },
    { code: 'NC06', label: 'Mal olor interior' },
    { code: 'NC07', label: 'Guardafangos sucios' },
    { code: 'NC08', label: 'Restos de jabón' },
    { code: 'NC09', label: 'Motor no lavado' },
    { code: 'NC10', label: 'Limpieza inaccesible' },
    { code: 'NC11', label: 'Techo mal lavado' },
    { code: 'NC12', label: 'Maletero sucio' },
    { code: 'NC13', label: 'Retraso en lavado de unidad' },
  ];
  // Carga los lavados pendientes
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

  // Marca un lavado con el estado dado; ncCodes puede ser array
  const markAs = async (id, estado, ncCodes = null) => {
    try {
      const ref = doc(db, 'lavados', id);
      const data = { estadoCalidad: estado, revisadoEn: serverTimestamp() };
      if (Array.isArray(ncCodes)) {
        data.noConformidades = ncCodes;
      } else if (typeof ncCodes === 'string') {
        data.noConformidad = ncCodes;
      }
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
    const codes = selectedNC[id] || [];
    if (!codes.length) {
      Alert.alert('Elige No Conformidad', 'Selecciona al menos una antes de confirmar.');
      return;
    }
    markAs(id, 'No Conforme', codes);
  };
  // Mientras carga
  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2196F3" />
      </View>
    );
  }

  // Si no hay pendientes
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

  // Lista de tarjetas
  return (
    <ScrollView contentContainerStyle={styles.container}>
      {lavados.map(item => {
        const selected = selectedNC[item.id] || [];
        return (
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
                onPress={() => {
                  if (!selectedNC[item.id]) {
                    setSelectedNC(prev => ({ ...prev, [item.id]: [] }));
                  }
                }}
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

            {/* Lista de NC como checkboxes */}
            {selectedNC[item.id] && (
              <View style={styles.ncList}>
                {NC_OPTIONS.map(opt => {
                  const isOn = selected.includes(opt.code);
                  return (
                    <TouchableOpacity
                      key={opt.code}
                      style={[
                        styles.ncOption,
                        isOn ? styles.ncOptionActive : null
                      ]}
                      onPress={() => {
                        setSelectedNC(prev => {
                          const prevArr = prev[item.id] || [];
                          const nextArr = prevArr.includes(opt.code)
                            ? prevArr.filter(c => c !== opt.code)
                            : [...prevArr, opt.code];
                          return { ...prev, [item.id]: nextArr };
                        });
                      }}
                    >
                      <Text style={styles.ncOptionText}>
                        {isOn ? '☑ ' : '☐ '}
                        {opt.code} – {opt.label}
                      </Text>
                    </TouchableOpacity>
                  );
                })}
                <TouchableOpacity
                  style={[styles.btn, styles.btnConfirmNC]}
                  onPress={() => handleNoConforme(item.id)}
                >
                  <Text style={styles.btnText}>Confirmar NC</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        );
      })}
    </ScrollView>
  );
} // fin componente
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
  picker: {
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 6,
    backgroundColor: '#fff',
  },
  ncList: {
    marginTop: 10,
    borderTopWidth: 1,
    borderColor: '#ddd',
    paddingTop: 10,
  },
  ncOption: {
    paddingVertical: 6,
  },
  ncOptionActive: {
    backgroundColor: '#eef9ff',
  },
  ncOptionText: {
    fontSize: 14,
  },
  buttonReturn: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
