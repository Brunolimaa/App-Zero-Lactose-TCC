import React, { Component } from 'react';
import { View, Text,  Button, TextInput, Image, FlatList, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import firebase from './FirebaseCon';

export default class ConversationScreen extends Component {

    static navigationOptions = ({navigation}) => ({
        tabBarLabel:"Receitas",
		tabBarIcon:({tintColor, focused}) => {
			if(focused) {
				return (
					<Image source={require('../assets/images/book.png')} style={{width:56, height:56}} />
				);
			} else {
                return (
					<Image source={require('../assets/images/book.png')} style={{width:46, height:46}} />
				);
			}	
        }
    })

    constructor(props){
        super(props);
    
        this.state = {nome: 'carregando...',receitas: [],  modalVisible:false}
  
          //firebase.database().ref("alimentos/1/nome").once('value').then((snapshot)=> {
          // firebase.database().ref("alimentos/1/nome").on('value', (snapshot)=> {
          //     let state = this.state;
          //     state.nome = snapshot.val();
          //     this.setState(state);
          // });
  
          firebase.database().ref("receitas").once('value').then((snapshot) =>{
              let state = this.state;
              this.state.receitas = [];
  
              snapshot.forEach((childItem)=>{
                  state.receitas.push({
                      key: childItem.key,
                      nome: childItem.val().nome,
                      descricao: childItem.val().descricao,
                      foto: childItem.val().foto
                  });
              });
  
              this.setState(state);
          });
          this.abrirModal = this.abrirModal.bind(this);
          this.fecharModal = this.fecharModal.bind(this);
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
            <TextInput placeholder="buscar receitas..." onChangeText={(nome)=>this.setState({nome})} />
            <FlatList data={this.state.receitas} renderItem={({item})=>{
                return(
                    <TouchableOpacity onPress={()=>this.abrirModal(item)}>
                      <View style={styles.filmeArea}>
                          <Image style={styles.filmeImage} source={{uri:item.foto}} style={{borderRadius: 500, width:100, height:100}} />
                          
                          <View>
                              <Text style={styles.nome}>{item.nome}</Text>
                              <Text style={styles.descricao}>{item.descricao}</Text>
                          </View>
                      </View>
                    </TouchableOpacity>
                );
            }}/>
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