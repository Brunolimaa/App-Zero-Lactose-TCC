import React, { Component } from 'react';
import { View, Text,  Button, TextInput, Image, FlatList, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import firebase from './FirebaseCon';
import MapView from 'react-native-maps';
import getDirections from 'react-native-google-maps-directions'


export default class TelaInicial extends Component {

    static navigationOptions = ({navigation}) => ({
        title: "Alimentos",
        tabBarLabel:"Alimentos",
		tabBarIcon:({tintColor, focused}) => {
			if(focused) {
				return (
					<Image source={require('../assets/images/home_on.png')} style={{width:26, height:26}} />
				);
			} else {
                return (
					<Image source={require('../assets/images/home.png')} style={{width:26, height:26}} />
				);
			}	
        }
    })
  
    constructor(props){
      super(props);
  
      this.state = {nome: 'carregando...',lat:-16.2635392, lng:-47.9126896, alimentos: [], modalVisible:false,
        coordinates: [
        {
          latitude: 37.3317876,
          longitude: -122.0054812,
        },
        {
          latitude: 37.771707,
          longitude: -122.4053769,
        },
      ],
     
    }
      

        //firebase.database().ref("alimentos/1/nome").once('value').then((snapshot)=> {
        // firebase.database().ref("alimentos/1/nome").on('value', (snapshot)=> {
        //     let state = this.state;
        //     state.nome = snapshot.val();
        //     this.setState(state);
        // });

        firebase.database().ref("alimentos").once('value').then((snapshot) =>{
            let state = this.state;
            this.state.alimentos = [];

            snapshot.forEach((childItem)=>{
                state.alimentos.push({
                    key: childItem.key,
                    nome: childItem.val().nome,
                    descricao: childItem.val().descricao,
                    foto: childItem.val().foto,
                    detalhe: childItem.val().detalhe
                });
            });

            this.setState(state);
        });

        this.abrirModal = this.abrirModal.bind(this);
        this.fecharModal = this.fecharModal.bind(this);
        
    }

    handleGetDirections = () => {
        const data = {
           source: {
            latitude: this.state.lat,
            longitude: this.state.lng
          },
          destination: {
            latitude: -15.8080374,
            longitude: -47.8750231
          },
          params: [
            {
              key: "travelmode",
              value: "driving"        // may be "walking", "bicycling" or "transit" as well
            },
            {
              key: "dir_action",
              value: "navigate"       // this instantly initializes navigation using the given travel mode 
            }
          ]
        }
     
        getDirections(data)
    }

    posicao() {
        navigator.geolocation.getCurrentPosition((data)=>{
            let latitude = data.coords.latitude;
            let longitude = data.coords.longitude;
            let accuracy = data.coords.accuracy;
            alert("latitude: "+latitude+" longitude: "+longitude);
        }, ()=>{
            alert("Deu erro");
        });
    }
    
    abrirModal(item){
        let s = this.state;
        s.nome = item.nome;
        s.descricao = item.descricao;
        s.foto = item.foto
        s.modalVisible = true;
        this.setState(s);
    }

    fecharModal(){
        let s = this.state;
        s.modalVisible = false;
        this.setState(s);
    }
    render() {
      return (
        <View  style={styles.body}>
          <TextInput placeholder="buscar alimentos..." onChangeText={(nome)=>this.setState({nome})} />
          {/* <Button title="Pegar Posicao" onPress={this.posicao}/>
          <Button onPress={this.handleGetDirections} title="Get Directions" /> */}
          {/* <MapView 
            style={styles.mapa}
            region={{
                latitude: this.state.lat,
                longitude:this.state.lng,
                latitudeDelta:0.01,
                longitudeDelta:0.01
            }}
           /> */}
          <FlatList data={this.state.alimentos} renderItem={({item})=>{
              return(              
                <TouchableOpacity onPress={()=>this.abrirModal(item)}>
                    <View style={styles.filmeArea}>
                        <Image style={styles.filmeImage} source={{uri:item.foto}} style={{borderRadius: 500, width:100, height:100}} />
                        
                        <View>
                            <Text style={styles.nome}>{item.nome}</Text>
                            <Text style={styles.descricao}>{item.detalhe}</Text>
                        </View>
                    </View>
                </TouchableOpacity>
              );
          }}/>
            <Button title="Indicar Alimentos" onPress={this.abrirModalEstabelecimento}/>
            <Modal animationType="slide" visible={this.state.modalVisible}>
                <View style={styles.modal}>
                    <Button title="X" onPress={this.fecharModal}/>
                    <View style={styles.detalhesAlimentos}>
                        <Image style={styles.detalheImage} source={{uri:this.state.foto}} style={{borderRadius: 500, width:200, height:200}} />
                        
                        <View>
                            <Text style={styles.nome}>{this.state.nome}</Text>
                            <Text style={styles.descricao}>{this.state.descricao}</Text>
                        </View>
                    </View>
                </View>
            </Modal>
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
	filmeInfo: {
		flex: 1,
		flexDirection: 'column',
		marginLeft: 10
	},
	nome: {
		fontSize: 15,
        fontWeight: 'bold',
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 190,
	},
	loading: {
		justifyContent: 'center',
		alignItems: 'center'

	},
	loadingTxt: {
		fontSize: 18,
		fontWeight: 'bold'
	},
	conversaView: {
		flex: 1,
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center'
    },
    descricao: {
        flex: 1,
        width: 190,
        marginLeft: 20
    },
    mapa: {
        width: 300,
        height: 100
        //flex:1
    },
    modal: {
        flex:1,
        paddingTop: 25,
        alignItems: 'flex-start'
    },
    detalheImage: {
        flex:1,
    },
    detalhesAlimentos: {
        flex: 1,
		margin:10
    }
})