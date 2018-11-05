import React, { Component } from 'react';
import { View, Text, Alert, Button, TextInput, Image, FlatList, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import firebase from './FirebaseCon';
import MapView from 'react-native-maps';
import getDirections from 'react-native-google-maps-directions'

export default class Estabelecimento extends Component {

    static navigationOptions = ({navigation}) => ({
        title: "Estabelecimentos",
        tabBarLabel:"Lojas",
		tabBarIcon:({tintColor, focused}) => {
			if(focused) {
				return (
					<Image source={require('../assets/images/company.png')} style={{width:56, height:56}} />
				);
			} else {
                return (
					<Image source={require('../assets/images/company.png')} style={{width:56, height:56}} />
				);
			}	
        }
    })

    constructor(props){
        super(props);
    
        this.state = {nome: 'carregando...',estabelecimentos: [], lat:0, lng:0, modalVisible:false,
        modalVisibleEstabelecimento:false, coordinates: [
            {
              latitude: 37.3317876,
              longitude: -122.0054812,
            },
            {
              latitude: 37.771707,
              longitude: -122.4053769,
            },
          ], nomeInput:'', telefoneInput:'', enderecoInput:'', status:false, inputs:[]
        }
    
        //   firebase.database().ref("estabelecimento").once('value').then((snapshot) =>{
        //       let state = this.state;
        //       this.state.estabelecimentos = [];
  
        //       snapshot.forEach((childItem)=>{
        //           if(childItem.val().status != false) {
        //           state.estabelecimentos.push({
        //               key: childItem.key,
        //               nome: childItem.val().nome,
        //               descricao: childItem.val().descricao,
        //               foto: childItem.val().foto,
        //               latitude: childItem.val().latitude,
        //               longitude: childItem.val().longitude
        //           });
        //         }
        //       });
  
        //       this.setState(state);
        //   });

        fetch('https://zero-lactose.herokuapp.com/estabelecimentos')
        .then((r)=>r.json())
        .then((json)=>{
            let state = this.state;
            state.estabelecimentos = json;
            this.setState(state);
        });
          
        this.abrirModal = this.abrirModal.bind(this);
        this.fecharModal = this.fecharModal.bind(this);
        this.abrirModalEstabelecimento = this.abrirModalEstabelecimento.bind(this);
        this.indicarEstabelecimento = this.indicarEstabelecimento.bind(this);
    }

    abrirModal(item){
        let s = this.state;
        s.nome = item.nome;
        s.descricao = item.descricao;
        s.foto = item.foto;
        s.lat = item.latitude;
        s.lng = item.longitude;
        s.modalVisible = true;
        this.setState(s);
    }

    fecharModal(){
        let s = this.state;
        s.modalVisible = false;
        s.modalVisibleEstabelecimento = false;
        this.setState(s);
    }

    abrirModalEstabelecimento(){
        let s = this.state;
        s.modalVisibleEstabelecimento = true;
        this.setState(s);
    }

    handleGetDirections = () => {
        
        let latitudeSource = null;
        let longitudeSource = null; 
        navigator.geolocation.getCurrentPosition((data)=>{
            latitudeSource = data.coords.latitude;
            longitudeSource = data.coords.longitude;
            let accuracy = data.coords.accuracy;
            alert(latitudeSource);
        }, ()=>{
            //alert("Deu erro...");
        });
    
        const data = {
           source: {
            latitude: latitudeSource,
            longitude: longitudeSource
          },
          destination: {            
            latitude: this.state.lat,
            longitude: this.state.lng
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

    indicarEstabelecimento(){
        if(this.state.nomeInput.length > 0 ){          
            fetch('https://zero-lactose.herokuapp.com/estabelecimentos', {
                method:'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body:JSON.stringify({
                    nome: this.state.nomeInput,
                    telefone: this.state.telefoneInput,
                    endereco: this.state.enderecoInput,
                    status: this.state.status
                })
            })
                .then((r)=>r.json())
                .then((json)=>{
                    //Recarregar Lista
                })
            this.fecharModal();
            Alert.alert('Estabelecimento em analise...');
        }
    }

    render() {
        return (
          <View  style={styles.body}>
            <TextInput placeholder="buscar estabelecimentos..." onChangeText={(nome)=>this.setState({nome})} />
            <FlatList data={this.state.estabelecimentos} renderItem={({item})=>{
                return(
                    <TouchableOpacity onPress={()=>this.abrirModal(item)}>
                      <View style={styles.filmeArea}>
                          <Image style={styles.filmeImage} source={{uri:item.foto}} style={{borderRadius: 500, width:100, height:100}} />
                          
                          <View>
                              <Text style={styles.nome}>{item.nome}</Text>
                              <Text style={styles.descricao}>{item.nome}</Text>
                          </View>
                      </View>
                    </TouchableOpacity>       
                );
            }}/>
            <Button title="Indicar estabelecimento" onPress={this.abrirModalEstabelecimento}/>
            <Modal animationType="fade" visible={this.state.modalVisible}>
                <View style={styles.modal}>
                    <Button title="X" onPress={this.fecharModal}/>
                    <View style={styles.detalhesAlimentos}>
                        <Image style={styles.detalheImage} source={{uri:this.state.foto}} style={{borderRadius: 500, width:200, height:200}} />

                        <MapView 
                            style={styles.mapa}
                            region={{
                                latitude: this.state.lat,
                                longitude:this.state.lng,
                                latitudeDelta:0.01,
                                longitudeDelta:0.01
                            }}
                        />
                         <Button onPress={this.handleGetDirections} title="ir..." />
                        <View>
                            <Text style={styles.nome}>{this.state.nome}</Text>
                            <Text style={styles.descricao}>{this.state.descricao}</Text>
                        </View>
                    </View>
                </View>
            </Modal>

            {/*Modal para indicar estabelecimentos*/}
            <Modal animationType="slide" visible={this.state.modalVisibleEstabelecimento}>
                <View style={styles.body}>
                    <Button title="X" onPress={this.fecharModal}/>
                    <View  style={styles.body}>
                        <TextInput placeholder="Nome" onChangeText={(nomeInput)=>this.setState({nomeInput})} />
                        <TextInput placeholder="Telefone" onChangeText={(telefoneInput)=>this.setState({telefoneInput})} />
                        <TextInput placeholder="Endereco" onChangeText={(enderecoInput)=>this.setState({enderecoInput})} />
                        <Button title="indicar" onPress={this.indicarEstabelecimento}/>
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
        width: 400,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5
        //flex:1
    },modal: {
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