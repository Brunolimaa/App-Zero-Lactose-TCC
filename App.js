import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import { TabNavigator } from 'react-navigation';
import firebase from 'firebase';

import TelaInicial from './src/TelaInicial';
import ConversationScreen from './src/ConersationScreen';
import Estabelecimento from './src/Estabelecimento'
import CategoriaScreen from './src/CategoriaScreen';
console.disableYellowBox = true;

const Navegador = TabNavigator({
  Home: {
    screen:CategoriaScreen,
    navigationOptions: {
		  title:"Conversas",
		  tabBarLabel:"Alimentos",
		  tabBarIcon:({tintColor, focused}) => {			
        if(focused) {
          return (
            <Image source={require('./assets/images/food.png')} style={{width:56, height:56}} />
          );
        } else {
          return (
            <Image source={require('./assets/images/food.png')} style={{width:56, height:56}} />
          );
        }	
		  }
    }   
  },
  Estabelecimento: {
    screen: Estabelecimento
  },
  Conversa: {
    screen: ConversationScreen
  }
}, {
  tabBarPosition: 'bottom',
  animationEnabled: true,
  tabBarOptions: {
    showIcon: true,
    showLabel: true
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