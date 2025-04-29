import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  StyleSheet,
  ScrollView
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { useNavigation } from '@react-navigation/native';

export default function RegistrarLavado() {
  const navigation = useNavigation();

  const [patente, setPatente] = useState('');
  const [tipoVehiculo, setTipoVehiculo] = useState('');
  const [area, setArea] = useState('');
  const [tipoLavado, setTipoLavado] = useState('');
  const [estadoInicial, setEstadoInicial] = useState('');
  const [local, setLocal] = useState('');

  const [horaInicio, setHoraInicio] = useState(null);
  const [horaFin, setHoraFin] = useState(null);
  const [lavadoTerminado, setLavadoTerminado] = useState(false);

  const iniciarLavado = () => {
    if (
      !patente ||
      !tipoVehiculo ||
      !area ||
      !tipoLavado ||
      !estadoInicial ||
      !local
    ) {
      Alert.alert(
        'Faltan datos',
        'Por favor completa todos los campos antes de iniciar el lavado.'
      );
      return;
    }
    setHoraInicio(new Date());
    setHoraFin(null);
    setLavadoTerminado(false);
  };

  const terminarLavado = async () => {
    if (!horaInicio) {
      Alert.alert('Error', 'Primero debes iniciar el lavado.');
      return;
    }
    const fin = new Date();
    setHoraFin(fin);

    try {
      await addDoc(collection(db, 'lavados'), {
        patente,
        tipoVehiculo,
        area,
        tipoLavado,
        estadoInicial,
        local,
        horaInicio: horaInicio.toISOString(),
        horaFin: fin.toISOString(),
        duracion: calcularDuracion(horaInicio, fin),
        creadoEn: serverTimestamp(),
        estadoCalidad: 'Pendiente',
      });
      setLavadoTerminado(true);
      Alert.alert('✅ Éxito', 'Lavado registrado correctamente.');
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'No se pudo registrar el lavado.');
    }
  };

  const calcularDuracion = (inicio, fin) => {
    const diffMs = fin - inicio;
    const minutos = Math.floor(diffMs / 60000);
    const segundos = Math.floor((diffMs % 60000) / 1000);
    return `${minutos} min ${segundos} seg`;
  };

  const cancelarLavado = () => {
    Alert.alert(
      'Cancelar Lavado',
      '¿Estás seguro que quieres cancelar el registro?',
      [
        { text: 'No', style: 'cancel' },
        { text: 'Sí', onPress: limpiarFormulario },
      ]
    );
  };

  const limpiarFormulario = () => {
    setPatente('');
    setTipoVehiculo('');
    setArea('');
    setTipoLavado('');
    setEstadoInicial('');
    setLocal('');
    setHoraInicio(null);
    setHoraFin(null);
    setLavadoTerminado(false);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registro de Lavado</Text>

      <TextInput
        style={styles.input}
        placeholder="Patente"
        value={patente}
        onChangeText={setPatente}
      />

      <Text style={styles.label}>Tipo de Vehículo</Text>
      <Picker
        selectedValue={tipoVehiculo}
        onValueChange={setTipoVehiculo}
        style={styles.picker}
      >
        <Picker.Item label="Seleccione..." value="" />
        <Picker.Item label="Automóvil" value="Automóvil" />
        <Picker.Item label="SUV" value="SUV" />
        <Picker.Item label="Camioneta" value="Camioneta" />
        <Picker.Item label="Furgón" value="Furgón" />
        <Picker.Item label="Camión 3/4" value="Camión 3/4" />
        <Picker.Item label="Minibús" value="Minibús" />
        <Picker.Item label="Camión" value="Camión" />
      </Picker>

      <Text style={styles.label}>Local</Text>
      <Picker
        selectedValue={local}
        onValueChange={setLocal}
        style={styles.picker}
      >
        <Picker.Item label="Seleccione..." value="" />
        <Picker.Item label="Local 1" value="Local 1" />
        <Picker.Item label="Local 2" value="Local 2" />
        <Picker.Item label="Local 3" value="Local 3" />
        <Picker.Item label="Local 4" value="Local 4" />
      </Picker>

      <Text style={styles.label}>Área</Text>
      <Picker
        selectedValue={area}
        onValueChange={setArea}
        style={styles.picker}
      >
        <Picker.Item label="Seleccione..." value="" />
        <Picker.Item label="Mecánica" value="Mecánica" />
        <Picker.Item label="Desabolladura" value="Desabolladura" />
        <Picker.Item label="Ventas" value="Ventas" />
        <Picker.Item label="Rentacar" value="Rentacar" />
        <Picker.Item label="Lavado" value="Lavado" />
      </Picker>

      <Text style={styles.label}>Tipo de Lavado</Text>
      <Picker
        selectedValue={tipoLavado}
        onValueChange={setTipoLavado}
        style={styles.picker}
      >
        <Picker.Item label="Seleccione..." value="" />
        <Picker.Item label="Cortesía" value="Cortesía" />
        <Picker.Item label="Interior" value="Interior" />
        <Picker.Item label="Exterior" value="Exterior" />
        <Picker.Item label="Completo" value="Completo" />
        <Picker.Item label="Motor" value="Motor" />
      </Picker>

      <Text style={styles.label}>Estado Inicial</Text>
      <Picker
        selectedValue={estadoInicial}
        onValueChange={setEstadoInicial}
        style={styles.picker}
      >
        <Picker.Item label="Seleccione..." value="" />
        <Picker.Item label="Muy Sucio" value="Muy Sucio" />
        <Picker.Item label="Sucio" value="Sucio" />
        <Picker.Item label="Medio" value="Medio" />
        <Picker.Item label="Limpio" value="Limpio" />
        <Picker.Item label="Muy Limpio" value="Muy Limpio" />
      </Picker>

      <TouchableOpacity
        style={styles.buttonStart}
        onPress={iniciarLavado}
      >
        <Text style={styles.buttonText}>Iniciar Lavado</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.buttonEnd}
        onPress={terminarLavado}
      >
        <Text style={styles.buttonText}>Terminar Lavado</Text>
      </TouchableOpacity>

      {horaInicio && (
        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            🕓 Inicio: {horaInicio.toLocaleTimeString()}
          </Text>
          {horaFin && (
            <>
              <Text style={styles.infoText}>
                🕒 Fin: {horaFin.toLocaleTimeString()}
              </Text>
              <Text style={styles.infoText}>
                🧽 Tiempo total: {calcularDuracion(horaInicio, horaFin)}
              </Text>
            </>
          )}
        </View>
      )}

      {lavadoTerminado && (
        <>
          <TouchableOpacity
            style={styles.buttonCancel}
            onPress={cancelarLavado}
          >
            <Text style={styles.buttonText}>Cancelar Lavado</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.buttonReturn}
            onPress={() => navigation.navigate('LavadorHome')}
          >
            <Text style={styles.buttonText}>Volver a Menú Principal</Text>
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#2196F3',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    borderRadius: 8,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
  },
  label: {
    fontWeight: 'bold',
    marginTop: 10,
    marginBottom: 5,
    color: '#333',
  },
  picker: {
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f9f9f9',
    marginBottom: 15,
    borderRadius: 8,
  },
  buttonStart: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonEnd: {
    backgroundColor: '#FF9800',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonCancel: {
    backgroundColor: '#F44336',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonReturn: {
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  infoContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 16,
    marginVertical: 2,
  },
});
