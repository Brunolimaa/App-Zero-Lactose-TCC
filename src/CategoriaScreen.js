import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import Categoria from './Categorias';
import TelaInicial from './TelaInicial';

const Navegador = StackNavigator({
  Categoria: {
    screen:Categoria
  },
  TelaInicial: {
    screen:TelaInicial
  }
})
export default Navegador;