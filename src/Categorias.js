import React, { Component } from 'react';
import { View, Text,  Button, TextInput, Image, FlatList, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import firebase from './FirebaseCon';

export default class Categoria extends Component {

    
    static navigationOptions = ({navigation}) => ({
        title: "Categoria",
        tabBarLabel:"Alimentos",
		tabBarIcon:({tintColor, focused}) => {
			if(focused) {
				return (
					<Image source={require('../assets/images/food.png')} style={{width:56, height:56}} />
				);
			} else {
                return (
					<Image source={require('../assets/images/food.png')} style={{width:46, height:46}} />
				);
			}	
        }
    });

    constructor(props){
        super(props);
    
        this.state = {nome: 'carregando...', categoria: [], modalVisible:false}

        firebase.database().ref("categoria").once('value').then((snapshot) =>{
            let state = this.state;
            this.state.categoria = [];

            snapshot.forEach((childItem)=>{
                state.categoria.push({
                    key: childItem.key,
                    nome: childItem.val().nome,
                    foto: childItem.val().foto,
                });
            });

            this.setState(state);
        });

       
    }

    render() {
        return(
            <View style={styles.body}>
                <FlatList data={this.state.categoria} renderItem={({item})=>{
              return(              
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('TelaInicial', {id: item.key})}>
                    <View style={styles.filmeArea}>
                        <View>
                            <Text style={styles.nome}>{item.nome}</Text>
                            <Image style={styles.filmeImage} source={{uri:item.foto}} style={{width:400, height:130}} />                        
                        </View>
                    </View>
                </TouchableOpacity>
              );
          }}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 10
    },
    container: {
		flex:1,
		marginTop:20
	},
	filmeArea: {
		flex: 1,
		flexDirection: 'row',
		margin:10
	},
	filmeImage: {
		width: 80,
		height: 110,
		borderRadius: 500
	},
	imagemPrincipal: {
		width: 180,
		height: 210,
    },
    nome: {
		fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 190,
        color: '#fff',
        backgroundColor: '#d30c5c',
        padding: 10,
        borderRadius: 7
	},
    
})