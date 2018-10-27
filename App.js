import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { TabNavigator } from 'react-navigation';
import firebase from 'firebase';

import TelaInicial from './src/TelaInicial';
import ConversationScreen from './src/ConersationScreen';
import Estabelecimento from './src/Estabelecimento'
console.disableYellowBox = true;

const Navegador = TabNavigator({
  Home: {
    screen: TelaInicial
  },
  Estabelecimento: {
    screen: Estabelecimento
  },
  Conversa: {
    screen: ConversationScreen
  }
}, {
  //tabBarPosition: 'bottom'
  animationEnabled: true,
  tabBarOptions: {
    showIcon: true
    //showLabel: false
  }

})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})

export default Navegador;