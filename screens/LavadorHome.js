import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Alert,
  ScrollView,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useNavigation } from '@react-navigation/native';
import { auth } from '../firebaseConfig';
import { signOut } from 'firebase/auth';

export default function LavadorHome() {
  const navigation = useNavigation();

  const [patente, setPatente] = useState('');
  const [tipoVehiculo, setTipoVehiculo] = useState('');
  const [local, setLocal] = useState('');
  const [area, setArea] = useState('');
  const [tipoLavado, setTipoLavado] = useState('');
  const [estadoInicial, setEstadoInicial] = useState('');
  const [horaInicio, setHoraInicio] = useState(null);
  const [horaFin, setHoraFin] = useState(null);

  const iniciarLavado = () => {
    if (!patente || !tipoVehiculo || !local || !area || !tipoLavado || !estadoInicial) {
      Alert.alert('Campos incompletos', 'Por favor completa todos los campos antes de iniciar el lavado.');
      return;
    }
    const horaActual = new Date();
    setHoraInicio(horaActual);
    setHoraFin(null);
  };

  const terminarLavado = () => {
    if (!horaInicio) {
      Alert.alert('Error', 'Debes iniciar el lavado antes de terminarlo.');
      return;
    }
    const horaActual = new Date();
    setHoraFin(horaActual);
  };

  const calcularDuracion = () => {
    if (horaInicio && horaFin) {
      const diferencia = (horaFin - horaInicio) / 1000; // en segundos
      const minutos = Math.floor(diferencia / 60);
      const segundos = Math.floor(diferencia % 60);
      return `${minutos} min ${segundos} seg`;
    }
    return '';
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigation.replace('Login');
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Registro de Lavado</Text>

      <TextInput
        style={styles.input}
        placeholder="Patente del Vehículo"
        value={patente}
        onChangeText={setPatente}
      />

      <Text style={styles.label}>Tipo de Vehículo</Text>
      <Picker
        selectedValue={tipoVehiculo}
        style={styles.picker}
        onValueChange={(itemValue) => setTipoVehiculo(itemValue)}
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
        style={styles.picker}
        onValueChange={(itemValue) => setLocal(itemValue)}
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
        style={styles.picker}
        onValueChange={(itemValue) => setArea(itemValue)}
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
        style={styles.picker}
        onValueChange={(itemValue) => setTipoLavado(itemValue)}
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
        style={styles.picker}
        onValueChange={(itemValue) => setEstadoInicial(itemValue)}
      >
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

      {horaInicio && (
        <Text style={styles.infoText}>🕒 Inicio: {horaInicio.toLocaleTimeString()}</Text>
      )}
      {horaFin && (
        <>
          <Text style={styles.infoText}>🕓 Fin: {horaFin.toLocaleTimeString()}</Text>
          <Text style={styles.infoText}>🧼 Tiempo total de lavado: {calcularDuracion()}</Text>
        </>
      )}

      {/* Botón de cerrar sesión */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutText}>Cerrar Sesión</Text>
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
  logoutButton: {
    backgroundColor: '#FF5252',
    paddingVertical: 14,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});
