import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebaseConfig';

export default function EstadisticaLavadosDiariosLavador() {
  const [estadisticas, setEstadisticas] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'lavados'));
        const lavados = [];

        querySnapshot.forEach((doc) => {
          lavados.push(doc.data());
        });

        const agrupado = {};

        lavados.forEach((lavado) => {
          const fecha = lavado.fechaInicio ? new Date(lavado.fechaInicio.seconds * 1000).toLocaleDateString() : 'Fecha desconocida';
          const email = lavado.emailLavador || 'Lavador desconocido';

          if (!agrupado[fecha]) agrupado[fecha] = {};
          if (!agrupado[fecha][email]) agrupado[fecha][email] = 0;

          agrupado[fecha][email]++;
        });

        const datos = [];

        Object.keys(agrupado).forEach((fecha) => {
          Object.keys(agrupado[fecha]).forEach((email) => {
            datos.push({ fecha, email, cantidad: agrupado[fecha][email] });
          });
        });

        setEstadisticas(datos);
      } catch (error) {
        console.error('Error al obtener lavados:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Lavados Diarios por Lavador</Text>

      {estadisticas.length === 0 ? (
        <Text style={styles.noData}>No hay datos para mostrar.</Text>
      ) : (
        estadisticas.map((item, index) => (
          <View key={index} style={styles.card}>
            <Text style={styles.text}>📅 Fecha: {item.fecha}</Text>
            <Text style={styles.text}>👤 Lavador: {item.email}</Text>
            <Text style={styles.text}>🧽 Lavados: {item.cantidad}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 20,
    paddingHorizontal: 15,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2196F3',
    marginBottom: 20,
    textAlign: 'center'
  },
  card: {
    width: '100%',
    backgroundColor: '#E3F2FD',
    borderRadius: 8,
    padding: 15,
    marginBottom: 10
  },
  text: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5
  },
  noData: {
    fontSize: 18,
    color: '#999',
    marginTop: 20
  }
});
