import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, Alert, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { db } from '../firebaseConfig';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export default function RegistrarLavado() {
  const navigation = useNavigation();

  const [patente, setPatente] = useState('');
  const [tipoVehiculo, setTipoVehiculo] = useState('');
  const [local, setLocal] = useState('');
  const [area, setArea] = useState('');
  const [tipoLavado, setTipoLavado] = useState('');
  const [estadoInicial, setEstadoInicial] = useState('');
  const [horaInicio, setHoraInicio] = useState(null);
  const [horaFin, setHoraFin] = useState(null);
  const [lavadoCompletado, setLavadoCompletado] = useState(false);
  const [lavadoCancelado, setLavadoCancelado] = useState(false);

  const iniciarLavado = () => {
    if (!patente || !tipoVehiculo || !local || !area || !tipoLavado || !estadoInicial) {
      Alert.alert('Campos incompletos', 'Por favor completa todos los campos antes de iniciar el lavado.');
      return;
    }
    setHoraInicio(new Date());
    setHoraFin(null);
  };

  const terminarLavado = async () => {
    if (!horaInicio) {
      Alert.alert('Error', 'Debes iniciar el lavado antes de terminarlo.');
      return;
    }

    const horaActual = new Date();
    setHoraFin(horaActual);
    setLavadoCompletado(true);

    try {
      await addDoc(collection(db, 'lavados'), {
        patente: patente,
        tipoVehiculo: tipoVehiculo,
        local: local,
        area: area,
        tipoLavado: tipoLavado,
        estadoInicial: estadoInicial,
        horaInicio: Timestamp.fromDate(horaInicio),
        horaFin: Timestamp.fromDate(horaActual),
        duracion: calcularDuracion(),
        creadoEn: Timestamp.now(),
      });

      Alert.alert('Registro exitoso', 'El lavado fue registrado correctamente.');

    } catch (error) {
      console.error('Error al registrar lavado:', error);
      Alert.alert('Error', 'No se pudo registrar el lavado.');
    }
  };

  const cancelarLavado = () => {
    Alert.alert('Confirmar', '¿Estás seguro que quieres cancelar el registro?', [
      { text: 'No', style: 'cancel' },
      { text: 'Sí', onPress: () => {
          limpiarFormulario();
          setLavadoCancelado(true);
          navigation.replace('LavadorHome');
        }
      }
    ]);
  };

  const limpiarFormulario = () => {
    setPatente('');
    setTipoVehiculo('');
    setLocal('');
    setArea('');
    setTipoLavado('');
    setEstadoInicial('');
    setHoraInicio(null);
    setHoraFin(null);
  };

  const volverPantallaPrincipal = () => {
    if (lavadoCompletado || lavadoCancelado) {
      navigation.replace('LavadorHome');
    } else {
      Alert.alert('Advertencia', 'Debe terminar o cancelar el registro antes de salir.');
    }
  };

  const calcularDuracion = () => {
    if (horaInicio && horaFin) {
      const diferencia = (horaFin - horaInicio) / 1000;
      const minutos = Math.floor(diferencia / 60);
      const segundos = Math.floor(diferencia % 60);
      return `${minutos} min ${segundos} seg`;
    }
    return '';
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registrar Lavado</Text>

      <TextInput
        style={styles.input}
        placeholder="Patente del Vehículo"
        value={patente}
        onChangeText={setPatente}
      />

      <Text style={styles.label}>Tipo de Vehículo</Text>
      <Picker selectedValue={tipoVehiculo} style={styles.picker} onValueChange={setTipoVehiculo}>
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
      <Picker selectedValue={local} style={styles.picker} onValueChange={setLocal}>
        <Picker.Item label="Seleccione..." value="" />
        <Picker.Item label="Local 1" value="Local 1" />
        <Picker.Item label="Local 2" value="Local 2" />
        <Picker.Item label="Local 3" value="Local 3" />
        <Picker.Item label="Local 4" value="Local 4" />
      </Picker>

      <Text style={styles.label}>Área</Text>
      <Picker selectedValue={area} style={styles.picker} onValueChange={setArea}>
        <Picker.Item label="Seleccione..." value="" />
        <Picker.Item label="Mecánica" value="Mecánica" />
        <Picker.Item label="Desabolladura" value="Desabolladura" />
        <Picker.Item label="Ventas" value="Ventas" />
        <Picker.Item label="Rentacar" value="Rentacar" />
        <Picker.Item label="Lavado" value="Lavado" />
      </Picker>

      <Text style={styles.label}>Tipo de Lavado</Text>
      <Picker selectedValue={tipoLavado} style={styles.picker} onValueChange={setTipoLavado}>
        <Picker.Item label="Seleccione..." value="" />
        <Picker.Item label="Cortesía" value="Cortesía" />
        <Picker.Item label="Interior" value="Interior" />
        <Picker.Item label="Exterior" value="Exterior" />
        <Picker.Item label="Completo" value="Completo" />
        <Picker.Item label="Motor" value="Motor" />
      </Picker>

      <Text style={styles.label}>Estado Inicial</Text>
      <Picker selectedValue={estadoInicial} style={styles.picker} onValueChange={setEstadoInicial}>
        <Picker.Item label="Seleccione..." value="" />
        <Picker.Item label="Muy Sucio" value="Muy Sucio" />
        <Picker.Item label="Sucio" value="Sucio" />
        <Picker.Item label="Medio" value="Medio" />
        <Picker.Item label="Limpio" value="Limpio" />
        <Picker.Item label="Muy Limpio" value="Muy Limpio" />
      </Picker>

      <TouchableOpacity style={styles.buttonStart} onPress={iniciarLavado}>
        <Text style={styles.buttonText}>Iniciar Lavado</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonEnd} onPress={terminarLavado}>
        <Text style={styles.buttonText}>Terminar Lavado</Text>
      </TouchableOpacity>

      {horaInicio && <Text style={styles.infoText}>Inicio: {horaInicio.toLocaleTimeString()}</Text>}
      {horaFin && (
        <>
          <Text style={styles.infoText}>Fin: {horaFin.toLocaleTimeString()}</Text>
          <Text style={styles.infoText}>Duración: {calcularDuracion()}</Text>
        </>
      )}

      <TouchableOpacity style={styles.buttonCancel} onPress={cancelarLavado}>
        <Text style={styles.buttonText}>Cancelar Lavado</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.buttonBack} onPress={volverPantallaPrincipal}>
        <Text style={styles.buttonText}>Volver a Pantalla Principal</Text>
      </TouchableOpacity>
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
    marginBottom: 20,
    alignSelf: 'center',
    color: '#2196F3',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 5,
    marginTop: 10,
    color: '#333',
  },
  picker: {
    height: 50,
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
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
  buttonBack: {
    backgroundColor: '#03A9F4',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  infoText: {
    fontSize: 16,
    marginTop: 5,
    textAlign: 'center',
    color: '#555',
  },
});
