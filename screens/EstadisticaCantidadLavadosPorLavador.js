import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, ActivityIndicator } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { BarChart } from 'react-native-chart-kit';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import DateTimePicker from '@react-native-community/datetimepicker';

const screenWidth = Dimensions.get('window').width;

const EstadisticaCantidadLavadosPorLavador = () => {
  const [filtro, setFiltro] = useState('hoy');
  const [fechaSeleccionada, setFechaSeleccionada] = useState(new Date());
  const [mostrarPicker, setMostrarPicker] = useState(false);
  const [datos, setDatos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    cargarDatos();
  }, [filtro, fechaSeleccionada]);

  const cargarDatos = async () => {
    setCargando(true);
    try {
      const lavadosRef = collection(db, 'lavados');
      let q;

      const hoy = new Date();
      hoy.setHours(0, 0, 0, 0);

      if (filtro === 'hoy') {
        q = query(lavadosRef, where('fecha', '==', hoy.toISOString().split('T')[0]));
      } else if (filtro === 'fecha') {
        q = query(lavadosRef, where('fecha', '==', fechaSeleccionada.toISOString().split('T')[0]));
      } else {
        q = query(lavadosRef);
      }

      const snapshot = await getDocs(q);
      const conteo = {};

      snapshot.forEach((doc) => {
        const data = doc.data();
        const lavador = data.lavadorNombre || data.lavadorEmail || 'Sin nombre';
        conteo[lavador] = (conteo[lavador] || 0) + 1;
      });

      const labels = Object.keys(conteo);
      const values = Object.values(conteo);

      setDatos({ labels, datasets: [{ data: values }] });
    } catch (error) {
      console.error('Error al cargar datos:', error);
    } finally {
      setCargando(false);
    }
  };

  const handleFechaChange = (event, selectedDate) => {
    setMostrarPicker(false);
    if (selectedDate) {
      setFechaSeleccionada(selectedDate);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lavados por Lavador</Text>

      <Picker selectedValue={filtro} onValueChange={setFiltro} style={styles.picker}>
        <Picker.Item label="Hoy" value="hoy" />
        <Picker.Item label="Seleccionar Fecha" value="fecha" />
        <Picker.Item label="Histórico Total" value="total" />
      </Picker>

      {filtro === 'fecha' && (
        <View>
          <Text onPress={() => setMostrarPicker(true)} style={styles.selectorFecha}>
            {fechaSeleccionada.toDateString()}
          </Text>
          {mostrarPicker && (
            <DateTimePicker value={fechaSeleccionada} mode="date" display="default" onChange={handleFechaChange} />
          )}
        </View>
      )}

      {cargando ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <BarChart
          data={datos}
          width={screenWidth - 40}
          height={300}
          yAxisLabel=""
          chartConfig={chartConfig}
          verticalLabelRotation={30}
          fromZero
          style={styles.chart}
        />
      )}
    </View>
  );
};

const chartConfig = {
  backgroundColor: '#ffffff',
  backgroundGradientFrom: '#ffffff',
  backgroundGradientTo: '#ffffff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(0, 0, 255, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    flex: 1,
  },
  titulo: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  picker: {
    marginBottom: 15,
  },
  selectorFecha: {
    textAlign: 'center',
    color: '#007AFF',
    marginBottom: 10,
  },
  chart: {
    borderRadius: 10,
  },
});

export default EstadisticaCantidadLavadosPorLavador;
