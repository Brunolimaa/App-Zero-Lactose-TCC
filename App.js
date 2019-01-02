import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import { StackNavigator } from 'react-navigation';
import firebase from 'firebase';

import TelaInicial from './src/TelaInicial';
import ConversationScreen from './src/ConersationScreen';
import Estabelecimento from './src/Estabelecimento';
import CategoriaScreen from './src/CategoriaScreen';
import ReceitaScreen from './src/ReceitaScreen';
import Categoria from './src/Categorias';

console.disableYellowBox = true;

const Navegador = StackNavigator({
  Categoria: {
    screen:Categoria
  },
  TelaInicial: {
    screen:TelaInicial
  },
  CategoriaScreen: {
    screen:CategoriaScreen
  }
});
export default Navegador;