import React, { Component } from 'react';
import { StyleSheet, Image } from 'react-native';
import { TabNavigator } from 'react-navigation';
import firebase from 'firebase';

import TelaInicial from './TelaInicial';
import ConversationScreen from './ConersationScreen';
import Estabelecimento from './Estabelecimento';
import ReceitaScreen from './ReceitaScreen';

const Navegador = TabNavigator({

  Estabelecimento: {
    screen: Estabelecimento
  },
  Conversa: {
    screen: ReceitaScreen,
    navigationOptions: {
		  title:"Receitas",
		  tabBarLabel:"Receitas",
		  tabBarIcon:({tintColor, focused}) => {			
        if(focused) {
          return (
            <Image source={require('../assets/images/book.png')} style={{width:56, height:56}} />
          );
        } else {
          return (
            <Image source={require('../assets/images/book.png')} style={{width:56, height:56}} />
          );
        }	
		  }
    }   
  }
}, {
  tabBarPosition: 'bottom',
  animationEnabled: true,
  tabBarOptions: {
    showIcon: true,
    showLabel: false
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