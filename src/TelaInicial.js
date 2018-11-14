import React, { Component } from 'react';
import { View, Text,  Button, TextInput, Image, FlatList, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import firebase from './FirebaseCon';
import MapView from 'react-native-maps';
import getDirections from 'react-native-google-maps-directions';
import LoadingItem from './components/LoadingItem';

export default class TelaInicial extends Component {

    static navigationOptions = ({navigation}) => ({
        title: "Alimentos",
        tabBarLabel:"Alimentos",
        headerStyle: {
            backgroundColor: '#03a9f4',
            height: 70
        },
        headerTintColor: '#fff',
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
      loading: true     
    }
      

    fetch('https://zero-lactose.herokuapp.com/alimentos/categoria/'+this.props.navigation.state.params.id)
    .then((r)=>r.json())
    .then((json)=>{
        let state = this.state;
        state.alimentos = json;
        state.loading = false;
        this.setState(state);
    });

        // firebase.database().ref("alimentos").once('value').then((snapshot) =>{
        //     let state = this.state;
        //     this.state.alimentos = [];

        //     snapshot.forEach((childItem)=>{
        //         state.alimentos.push({
        //             key: childItem.key,
        //             nome: childItem.val().nome,
        //             descricao: childItem.val().descricao,
        //             foto: childItem.val().foto,
        //             detalhe: childItem.val().detalhe
        //         });
        //     });

        //     this.setState(state);
        // });

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

      if(this.state.loading) {
          return(
              <LoadingItem visible={true} />
          );
      }  else {

        return (
            <View  style={styles.body}>
            {/* <TextInput placeholder="buscar alimentos..." onChangeText={(nome)=>this.setState({nome})} /> */}
            <FlatList data={this.state.alimentos} renderItem={({item})=>{
                return(  
                    <TouchableOpacity onPress={()=>this.abrirModal(item)}>
                        <View style={styles.filmeArea}>     
                            <Image style={styles.filmeImage} source={{uri:item.foto}} style={{borderRadius: 500, width:100, height:100}} />
                            
                            <View>
                                <Text style={styles.nomeListaPrincipal}>{item.nome}</Text>
                                {/* <Text style={styles.descricao}>{item.detalhe}</Text> */}
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
                            <Image style={styles.detalheImage} source={{uri:this.state.foto}}  style={{marginLeft: -10, width:360, height:180 }} />
                            
                            <View>
                                <Text style={styles.nomeLista}>{this.state.nome}</Text>
                                <Text style={styles.descricao}>{this.state.descricao}</Text>
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
        );
      }
    }
  }

  const styles = StyleSheet.create({
    body: {
        flex: 1,
        //backgroundColor: '#fff',
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
	nomeLista:{
		// fontSize: 15,
        // fontWeight: 'bold',
        // marginLeft: 10,
        // justifyContent: 'center',
        // alignItems: 'center',
        // width: 190,
        fontSize: 19,
        fontWeight: 'bold',
        marginLeft: -10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 360,
        color: '#fff',
        backgroundColor: '#2196f3',
        padding: 10,
        height: 50,
        alignItems: 'center'
    },
    nomeListaPrincipal:{
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 20,
        marginLeft: 7,
        justifyContent: 'center',
        width: 300,
        color: '#fff',
        backgroundColor: '#e91e63',
        padding: 10,
        height: 50,
        alignItems: 'center',
        borderRadius: 20
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
        width: 330,
        fontSize: 15,
        padding: 10,
        marginLeft: 20,
        justifyContent: 'center',
        alignItems: 'center',
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
    },
    loadingTxt: {
        fontSize: 10,
        fontWeight: 'bold'
    },
    loading: {
       justifyContent: 'center' ,
       alignItems: 'center'
    }
})