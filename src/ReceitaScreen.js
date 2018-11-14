import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';

import Receita from './Receita';
import ConversationScreen from './ConersationScreen';

const Navegador = StackNavigator({
  Lista: {
    screen:ConversationScreen
  },
  Receita:{
    screen:Receita
  }
});
export default Navegador;