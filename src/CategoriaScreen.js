import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { StackNavigator } from 'react-navigation';

import Categoria from './Categorias';
import TelaInicial from './TelaInicial';

console.disableYellowBox = true;

const Navegador = StackNavigator({
  Categoria: {
    screen:Categoria
  },
  TelaInicial: {
    screen:TelaInicial
  }
})
export default Navegador;