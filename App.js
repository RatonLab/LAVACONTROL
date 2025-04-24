import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';

export default function App() {
  const [patente, setPatente] = useState('');
  const [inicio, setInicio] = useState(null);
  const [lavados, setLavados] = useState([]);

  const iniciarLavado = () => {
    if (!patente) return;
    setInicio(new Date());
  };

  const terminarLavado = () => {
    if (!inicio) return;
    const fin = new Date();
    const duracion = ((fin - inicio) / 60000).toFixed(2); // duración en minutos
    const nuevoLavado = {
      patente,
      inicio: inicio.toLocaleTimeString(),
      fin: fin.toLocaleTimeString(),
      duracion
    };
    setLavados([...lavados, nuevoLavado]);
    setPatente('');
    setInicio(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>LavaControl Automotriz</Text>

      <TextInput
        style={styles.input}
        placeholder="Patente del vehículo"
        value={patente}
        onChangeText={setPatente}
      />

      <View style={styles.buttonContainer}>
        <Button
          title="Iniciar lavado"
          onPress={iniciarLavado}
          disabled={!patente || inicio !== null}
        />
        <Button
          title="Terminar lavado"
          onPress={terminarLavado}
          disabled={inicio === null}
        />
      </View>

      <Text style={styles.subtitle}>Historial del día:</Text>
      <FlatList
        data={lavados}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.lavadoItem}>
            <Text>Patente: {item.patente}</Text>
            <Text>Inicio: {item.inicio}</Text>
            <Text>Fin: {item.fin}</Text>
            <Text>Duración: {item.duracion} min</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f1f1f1',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    marginTop: 24,
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#fff',
    padding: 8,
    marginBottom: 12,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
    marginBottom: 16,
  },
  lavadoItem: {
    padding: 12,
    backgroundColor: '#fff',
    borderRadius: 6,
    marginBottom: 8,
    borderColor: '#ddd',
    borderWidth: 1,
  },
});
