import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet, View, Text, StatusBar} from 'react-native';

import colors from './src/utils/colors';
import Form from './src/components/Forms';
import Result from './src/components/Result';
import Footer from './src/components/Footer';

export default function App() {
  const [nombre, setNombre] = useState(null);
  const [salario, setSalario] = useState(null);
  const [total, setTotal] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (nombre && salario) calculate();
    else reset();
  }, [nombre, salario]);
  const calculate = () => {
    reset();
    if (!nombre) {
      setErrorMessage('Ingrese el nombre');
    } else if (!salario) {
      setErrorMessage('Ingrese el salario');
    } else {
      let isss = salario * 0.03;
      let afp = salario * 0.04;
      let renta = salario * 0.05;
      let total = salario - isss - afp - renta;
      setTotal({
        totalPayable: (total).toFixed(2).replace('.', ',')
      });
    }
  };
  const reset = () => {
    setErrorMessage('');
    setTotal(null);
  };

  return (
    <>
      <StatusBar barStyle="light-content" />
      <SafeAreaView style={styles.Header}>
        <Text style={styles.HeadApp}> Cotizador de prestamos </Text>
        <Form
          setNombre={setNombre}
          setSalario={setSalario}
        />
      </SafeAreaView>
      <Result
        nombre={nombre}
        salario={salario}
        total={total}
        errorMessage={errorMessage}
      />
      <Footer calculate={calculate}></Footer>
    </>
  );
}
const styles = StyleSheet.create({
  Header: {
    backgroundColor: colors.PRIMARY_COLOR,
    height: 200,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    alignItems: 'center',
  },
  HeadApp: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 15,
  },
});
