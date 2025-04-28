import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { collection, query, where, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';

// Listado de No Conformidades
const noConformidadesOpciones = [
  { codigo: 'NC01', descripcion: 'Suciedad en zonas visibles (capó, puertas)' },
  { codigo: 'NC02', descripcion: 'Vidrios con manchas o empañados' },
  { codigo: 'NC03', descripcion: 'Ruedas o llantas mal lavadas' },
  { codigo: 'NC04', descripcion: 'Interior con restos de polvo o basura' },
  { codigo: 'NC05', descripcion: 'Tapicería o alfombras con manchas visibles' },
  { codigo: 'NC06', descripcion: 'Maletero sucio' },
  { codigo: 'NC07', descripcion: 'Techo mal lavado y/o sin lavar' },
  { codigo: 'NC08', descripcion: 'Retraso en lavado de unidad' },
  { codigo: 'NC09', descripcion: 'Mal olor en interior no tratado' },
  { codigo: 'NC10', descripcion: 'Guardafangos y/o zonas inferiores sucias' },
  { codigo: 'NC11', descripcion: 'Restos de jabón, cera o productos mal retirados' },
  { codigo: 'NC12', descripcion: 'Motor no lavado correctamente (si aplicaba)' },
  { codigo: 'NC13', descripcion: 'Falta de limpieza en espacios de difícil acceso' },
];
export default function ControlCalidadHome() {
  const navigation = useNavigation();

  const [lavados, setLavados] = useState([]);
  const [localFiltro, setLocalFiltro] = useState('');
  const [areaFiltro, setAreaFiltro] = useState('');
  const [comentario, setComentario] = useState('');
  const [lavadoSeleccionado, setLavadoSeleccionado] = useState(null);
  const [noConformidadesSeleccionadas, setNoConformidadesSeleccionadas] = useState([]);

  useEffect(() => {
    cargarLavados();
  }, []);

  const cargarLavados = async () => {
    try {
      const q = query(collection(db, 'lavados'));
      const querySnapshot = await getDocs(q);
      const lavadosData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setLavados(lavadosData);
    } catch (error) {
      console.error('Error al cargar lavados:', error);
    }
  };

  const filtrarLavados = () => {
    return lavados.filter((lavado) => {
      const coincideLocal = localFiltro ? lavado.local === localFiltro : true;
      const coincideArea = areaFiltro ? lavado.area === areaFiltro : true;
      return coincideLocal && coincideArea;
    });
  };

  const toggleSeleccion = (codigo) => {
    if (noConformidadesSeleccionadas.includes(codigo)) {
      setNoConformidadesSeleccionadas(noConformidadesSeleccionadas.filter(item => item !== codigo));
    } else {
      setNoConformidadesSeleccionadas([...noConformidadesSeleccionadas, codigo]);
    }
  };

  const marcarLavado = async (id, estado) => {
    try {
      const lavadoRef = doc(db, 'lavados', id);
      await updateDoc(lavadoRef, {
        controlCalidad: estado,
        comentarioControl: estado === 'No Conforme' ? comentario : '',
        noConformidades: estado === 'No Conforme' ? noConformidadesSeleccionadas : [],
      });

      Alert.alert('Registro actualizado', `Lavado marcado como: ${estado}`);
      setComentario('');
      setNoConformidadesSeleccionadas([]);
      setLavadoSeleccionado(null);
      cargarLavados(); // recargar
    } catch (error) {
      console.error('Error al actualizar lavado:', error);
      Alert.alert('Error', 'No se pudo actualizar el lavado.');
    }
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Control de Calidad</Text>

      <Text style={styles.label}>Filtrar por Local:</Text>
      <Picker
        selectedValue={localFiltro}
        onValueChange={(itemValue) => setLocalFiltro(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Todos" value="" />
        <Picker.Item label="Local 1" value="Local 1" />
        <Picker.Item label="Local 2" value="Local 2" />
        <Picker.Item label="Local 3" value="Local 3" />
        <Picker.Item label="Local 4" value="Local 4" />
      </Picker>

      <Text style={styles.label}>Filtrar por Área:</Text>
      <Picker
        selectedValue={areaFiltro}
        onValueChange={(itemValue) => setAreaFiltro(itemValue)}
        style={styles.picker}
      >
        <Picker.Item label="Todas" value="" />
        <Picker.Item label="Mecánica" value="Mecánica" />
        <Picker.Item label="Desabolladura" value="Desabolladura" />
        <Picker.Item label="Ventas" value="Ventas" />
        <Picker.Item label="Rentacar" value="Rentacar" />
        <Picker.Item label="Lavado" value="Lavado" />
      </Picker>

      <FlatList
        data={filtrarLavados()}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.lavadoItem}>
            <Text style={styles.lavadoText}>Patente: {item.patente}</Text>
            <Text style={styles.lavadoText}>Local: {item.local} - Área: {item.area}</Text>
            <Text style={styles.lavadoText}>Tipo: {item.tipoLavado}</Text>
            <Text style={styles.lavadoText}>Estado Inicial: {item.estadoInicial}</Text>
            <Text style={styles.lavadoText}>Duración: {item.duracion}</Text>

            {lavadoSeleccionado === item.id && (
              <>
                <Text style={styles.label}>Selecciona No Conformidades:</Text>
                {noConformidadesOpciones.map((opcion) => (
                  <TouchableOpacity
                    key={opcion.codigo}
                    style={styles.checkboxContainer}
                    onPress={() => toggleSeleccion(opcion.codigo)}
                  >
                    <View style={styles.checkbox}>
                      {noConformidadesSeleccionadas.includes(opcion.codigo) && <View style={styles.checked} />}
                    </View>
                    <Text style={styles.checkboxLabel}>{opcion.descripcion}</Text>
                  </TouchableOpacity>
                ))}

                <TextInput
                  style={styles.input}
                  placeholder="Comentario adicional (opcional)"
                  value={comentario}
                  onChangeText={setComentario}
                />
              </>
            )}

            <View style={styles.buttonsRow}>
              <TouchableOpacity
                style={styles.okButton}
                onPress={() => marcarLavado(item.id, 'OK')}
              >
                <Text style={styles.buttonText}>Lavado OK</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.noButton}
                onPress={() => {
                  setLavadoSeleccionado(item.id);
                }}
              >
                <Text style={styles.buttonText}>No Conforme</Text>
              </TouchableOpacity>

              {lavadoSeleccionado === item.id && (
                <TouchableOpacity
                  style={styles.saveButton}
                  onPress={() => marcarLavado(item.id, 'No Conforme')}
                >
                  <Text style={styles.buttonText}>Guardar</Text>
                </TouchableOpacity>
              )}
            </View>
          </View>
        )}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#2196F3',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: '#333',
  },
  picker: {
    height: 50,
    backgroundColor: '#f9f9f9',
    marginBottom: 15,
  },
  lavadoItem: {
    backgroundColor: '#f1f1f1',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  lavadoText: {
    marginBottom: 5,
    color: '#555',
  },
  input: {
    backgroundColor: '#fff',
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginTop: 8,
    marginBottom: 8,
  },
  buttonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  okButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 5,
  },
  noButton: {
    backgroundColor: '#F44336',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginLeft: 5,
    marginRight: 5,
  },
  saveButton: {
    backgroundColor: '#2196F3',
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
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: '#2196F3',
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    width: 12,
    height: 12,
    backgroundColor: '#2196F3',
  },
  checkboxLabel: {
    fontSize: 16,
    color: '#555',
  },
});
