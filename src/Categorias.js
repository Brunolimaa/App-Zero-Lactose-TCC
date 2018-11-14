import React, { Component } from 'react';
import { View, Text,  Button, TextInput, Image, FlatList, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import firebase from './FirebaseCon';
import LoadingItem from './components/LoadingItem';

export default class Categoria extends Component {

    
    static navigationOptions = ({navigation}) => ({
       // title: 'Cateogira',
        //tabBarLabel:"Alimentos",
        headerStyle: {
           //backgroundColor: '#03a9f4',
            height: -70
        },
        // headerTitle: (
        //     <Image source={require('../assets/images/logo.png')} style={{width:90, height:56, marginLeft: 230}}/>
        // ),
        //headerTintColor: '#fff',
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
    
        this.state = {nome: 'carregando...', categoria: [], modalVisible:false, loading: true};

        fetch('https://zero-lactose.herokuapp.com/categorias')
            .then((r)=>r.json())
            .then((json)=>{
                let state = this.state;
                state.categoria = json;
                state.loading = false;
                this.setState(state);
            });
        

        // firebase.database().ref("categoria").once('value').then((snapshot) =>{
        //     let state = this.state;
        //     this.state.categoria = [];

        //     snapshot.forEach((childItem)=>{
        //         state.categoria.push({
        //             key: childItem.key,
        //             nome: childItem.val().nome,
        //             foto: childItem.val().foto,
        //         });
        //     });

        //     this.setState(state);
        // });

       
    }

    render() {
        return(
            <View style={styles.body}>
                 <LoadingItem visible={this.state.loading} />
                <FlatList data={this.state.categoria} renderItem={({item})=>{
              return(              
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('TelaInicial', {id: item.id})}>
                    <View style={styles.filmeArea}>
                        <View>
                            <Text style={styles.nome}>{item.nome}</Text>
                            <Image style={styles.filmeImage} source={{uri:item.foto}} style={{marginLeft: -10, width:360, height:180 }} />                        
                        </View>
                    </View>
                </TouchableOpacity>
              );
          }}/>
            {/* <ScrollView pagingEnabled={true}>
            <View>
                  <Image
                        style={{flex: 1, width: 360, height: 535}}
                        source={require('../assets/images/suco-leg.jpg')}
                    />
            
            </View>
            <View>
                <Image
                style={{flex: 1, width: 360, height: 530}}
                source={require('../assets/images/padaria-leg.jpg')}
                />
            </View>
            </ScrollView> */}
        </View>
        );
    }
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        //backgroundColor: '#fff',
        //padding: 10
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
		fontSize: 19,
        fontWeight: 'bold',
        //marginTop: -10,
        marginLeft: -10,
        //marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 360,
        color: '#fff',
        backgroundColor: '#d30c5c',
        padding: 10,
        height: 50,
        alignItems: 'center'
        //borderRadius: 7
	},
    
})