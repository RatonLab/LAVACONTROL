import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  Button,
  Platform
} from 'react-native';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';
import { BarChart } from 'react-native-chart-kit';
import DateTimePicker from '@react-native-community/datetimepicker';
import { format } from 'date-fns';

const screenWidth = Dimensions.get('window').width;

export default function EstadisticaLavadosDiariosLavador() {
  const [datos, setDatos] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    cargarDatos();
  }, [selectedDate]);

  const cargarDatos = async () => {
    setLoading(true);
    try {
      const fechaFormateada = format(selectedDate, 'yyyy-MM-dd');
      const q = query(collection(db, 'lavados'), where('fecha', '==', fechaFormateada));
      const querySnapshot = await getDocs(q);

      const conteo = {};
      querySnapshot.forEach((doc) => {
        const lavador = doc.data().lavador || 'Desconocido';
        conteo[lavador] = (conteo[lavador] || 0) + 1;
      });

      const labels = Object.keys(conteo);
      const values = Object.values(conteo);

      setDatos({
        labels,
        datasets: [{ data: values }],
      });
    } catch (error) {
      console.error('Error al cargar datos:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Lavados Diarios por Lavador</Text>
      <Text style={styles.date}>📅 Fecha: {format(selectedDate, 'dd-MM-yyyy')}</Text>

      <Button
        title="Cambiar Fecha"
        onPress={() => setShowDatePicker(true)}
        color="#2196F3"
      />

      {showDatePicker && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(event, date) => {
            if (date) setSelectedDate(date);
            setShowDatePicker(false);
          }}
        />
      )}

      {loading ? (
        <ActivityIndicator size="large" color="#2196F3" style={{ marginTop: 20 }} />
      ) : datos && datos.labels.length > 0 ? (
        <BarChart
          data={datos}
          width={screenWidth - 32}
          height={320}
          chartConfig={chartConfig}
          verticalLabelRotation={30}
          fromZero
          showValuesOnTopOfBars
          style={styles.chart}
        />
      ) : (
        <Text style={styles.noData}>No hay lavados registrados para esta fecha.</Text>
      )}
    </ScrollView>
  );
}

const chartConfig = {
  backgroundGradientFrom: '#fff',
  backgroundGradientTo: '#fff',
  decimalPlaces: 0,
  color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
  labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  style: { borderRadius: 16 },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 20,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    color: '#2196F3',
  },
  date: {
    textAlign: 'center',
    fontSize: 16,
    marginBottom: 10,
    color: '#555',
  },
  chart: {
    marginHorizontal: 16,
    borderRadius: 16,
    marginTop: 20,
  },
  noData: {
    textAlign: 'center',
    marginTop: 40,
    fontSize: 16,
    color: '#999',
  },
});
