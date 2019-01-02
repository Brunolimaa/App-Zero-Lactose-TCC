import React, { Component } from 'react';
import { View, Text, Alert, Button, TextInput, Image, FlatList, StyleSheet, Modal, TouchableOpacity,TouchableHighlight, Picker } from 'react-native';
import firebase from './FirebaseCon';
import MapView from 'react-native-maps';
import getDirections from 'react-native-google-maps-directions'
import LoadingItem from './components/LoadingItem';

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
          ], nomeInput:'', telefoneInput:'', enderecoInput:'',cidadeInput: '', estadoInput:'', status:false, inputs:[],
          estado:0,
          estados: [],
          cidade:0,
          cidades: [],
          loading: false
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

       fetch('https://zero-lactose.herokuapp.com/categorias/'+this.props.navigation.state.params.id)
        .then((r)=>r.json())
        .then((json)=>{
            let state = this.state;
            state.estabelecimentos = json.estabelecimentos;
            this.setState(state);
        })

        this.abrirModal = this.abrirModal.bind(this);
        this.fecharModal = this.fecharModal.bind(this);
        this.abrirModalEstabelecimento = this.abrirModalEstabelecimento.bind(this);
        this.indicarEstabelecimento = this.indicarEstabelecimento.bind(this);
        this.buscarCidade = this.buscarCidade.bind(this);
    }

    abrirModal(item){
        let s = this.state;
        s.nome = item.nome;
        s.descricao = item.descricao;
        s.foto = item.foto;
        s.endereco = item.endereco;
        s.telefone = item.telefone;
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

    buscarCidade(itemValue, itemIndex){
        let state = this.state;
        state.estado = itemValue;
        state.loading = true;

        this.setState(state);

        fetch('https://zero-lactose.herokuapp.com/cidades/estado/'+state.estado)
        .then((r)=>r.json())
        .then((json)=>{
            let state = this.state;
            state.cidades = json;
            state.loading = false;
            this.setState(state);
        });
    }

    
    buscarEstabelecimento(itemValue, itemIndex){
        let state = this.state;
        state.cidade = itemValue;
        state.loading = true;
        this.setState(state);

        fetch('https://zero-lactose.herokuapp.com/estabelecimentos/cidade/'+state.cidade)
        .then((r)=>r.json())
        .then((json)=>{
            let state = this.state;
            state.loading = false;
            state.estabelecimentos = json;
            this.setState(state);
        });
    } 

    handleGetDirections = () => {
        
        let latitudeSource = null;
        let longitudeSource = null; 
        navigator.geolocation.getCurrentPosition((data)=>{
            latitudeSource = data.coords.latitude;
            longitudeSource = data.coords.longitude;
            let accuracy = data.coords.accuracy;
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
                    status: this.state.status,
                    cidadeDesc: this.state.cidadeInput,
                    estadoDesc: this.state.estadoInput
                    // cidade: this.state.cidadeInput
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
        let cidadesItems = this.state.cidades.map((v, k) => {
            return <Picker.Item key={k} value={v.id} label={v.nome} />
        })
        // if(this.state.estabelecimentos == '') {
        //     return(
        //         <View style={[styles.container, styles.loading]}>
        //                 <Text style={styles.loadingTxt}>Nenhum estabelecimento econtrado!</Text>
        //         </View>
        //     );
        // }
        return (

          <View  style={styles.body}>
            <LoadingItem visible={this.state.loading} />
            {/* <Text style={styles.labelPicker}>Estado</Text> */}
            <Picker selectedValue={this.state.estado} onValueChange={(itemValue, itemIndex) => this.buscarCidade(itemValue, itemIndex)}>
                <Picker.Item key={0} value="0" label="Selecione..."/>
                <Picker.Item key={1} value="1" label="AC"/>
                <Picker.Item key={2} value="2" label="AL"/>
				<Picker.Item key={3} value="3" label="AM"/>
				<Picker.Item key={4} value="4" label="AP"/>
				<Picker.Item key={5} value="5" label="BA"/>
				<Picker.Item key={6} value="6" label="CE"/>
				<Picker.Item key={7} value="7" label="DF"/>
				<Picker.Item key={8} value="8" label="ES"/>
				<Picker.Item key={9} value="9" label="GO"/>
				<Picker.Item key={10} value="10" label="MA"/>
				<Picker.Item key={11} value="11" label="MG"/>
				<Picker.Item key={12} value="12" label="MS"/>
                <Picker.Item key={13} value="13" label="MT"/>
				<Picker.Item key={14} value="14" label="PA"/>
				<Picker.Item key={15} value="15" label="PB"/>
				<Picker.Item key={16} value="16" label="PE"/>
				<Picker.Item key={17} value="17" label="PI"/>
				<Picker.Item key={18} value="18" label="PR"/>
				<Picker.Item key={19} value="19" label="RJ"/>
				<Picker.Item key={20} value="20" label="RN"/>
				<Picker.Item key={21} value="21" label="RO"/>
				<Picker.Item key={22} value="22" label="RR"/>
				<Picker.Item key={23} value="23" label="RS"/>
				<Picker.Item key={24} value="24" label="SC"/>
				<Picker.Item key={25} value="25" label="SE"/>
				<Picker.Item key={26} value="26" label="SP"/>
				<Picker.Item key={27} value="27" label="TO"/>
            </Picker>


            <Picker selectedValue={this.state.cidade} onValueChange={(itemValue, itemIndex) => this.buscarEstabelecimento(itemValue, itemIndex)}>
                {cidadesItems}
            </Picker>
            {/* <TextInput placeholder="buscar estabelecimentos..." onChangeText={(nome)=>this.setState({nome})} /> */}
            <FlatList data={this.state.estabelecimentos} renderItem={({item})=>{
                return(
                    <TouchableOpacity onPress={()=>this.abrirModal(item)}>
                      <View style={styles.filmeArea}>
                          <Image style={styles.filmeImage} source={{uri:item.foto}} style={{borderRadius: 500, width:100, height:100}} />
                          
                          <View>
                              <Text style={styles.nome}>{item.nome}</Text>
                              <Text style={styles.descricaoLista}>{item.descricao}</Text>
                          </View>
                      </View>
                    </TouchableOpacity>       
                );
            }}/>
            <Button title="Indicar estabelecimento" onPress={this.abrirModalEstabelecimento}/>
            <Modal animationType="fade" visible={this.state.modalVisible}>
                <View style={styles.modal}>
                    <View style={styles.detalhesAlimentos}>
                    <TouchableHighlight underlayColor="#CCCCCC" onPress={this.fecharModal} style={styles.backButton}>
                            <Image source={require('../assets/images/back.png')} style={styles.backImage} />
                    </TouchableHighlight>
                        <Image style={styles.detalheImage} source={{uri:this.state.foto}}  style={{marginLeft: -10, width:360, height:180 }}  />                         
                        <Text style={styles.nomeLista}>{this.state.nome}</Text>
                        <Text style={styles.descricao}>{this.state.descricao}</Text>
                        <Text style={styles.descricao}><Text style={{fontWeight: 'bold'}}>Telefone: </Text>{this.state.telefone}</Text>
                        <Text style={styles.descricao}><Text style={{fontWeight: 'bold'}}>Endereço: </Text>{this.state.endereco}</Text>

                        <TouchableOpacity onPress={this.handleGetDirections}>
                        <MapView 
                            style={styles.mapa}
                            region={{
                                latitude: this.state.lat,
                                longitude:this.state.lng,
                                latitudeDelta:0.01,
                                longitudeDelta:0.01
                            }}
                        />
                        </TouchableOpacity>
                        {/* <Button onPress={this.handleGetDirections} title="ir..." /> */}
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
                        <TextInput placeholder="Estado" onChangeText={(estadoInput)=>this.setState({estadoInput})} />
                        <TextInput placeholder="Cidade" onChangeText={(cidadeInput)=>this.setState({cidadeInput})} />
                        {/* <TextInput
                            {...this.props} // Inherit any props passed to it; e.g., multiline, numberOfLines below
                            editable = {true}
                            maxLength = {40}
                        /> */}
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
        backgroundColor: '#fff',
        padding: 10
    },
    filmeArea: {
        flex: 1,
        flexDirection: 'row',
        margin:10,
        borderBottomWidth:1,
		borderColor:'#CCCCCC'
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
        fontSize: 19,
        fontWeight: 'bold',
        marginLeft: 10,
        justifyContent: 'center',
        alignItems: 'center',
        width: 200,
        color: '#e91e63',
        padding: 5,
        alignItems: 'center'
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
        backgroundColor: '#e91e63',
        padding: 10,
        height: 50,
        alignItems: 'center'
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
        //flex: 1,
        margin: 10,
        width: 300,
        marginLeft: 10
    },
    descricaoLista:{
        flex: 1,
        width: 200,
        marginLeft: 10,
        padding: 5
    },
    mapa: {
        width: 340,
        height: 100,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 5,
        flex:1
    },modal: {
        flex:1,
        alignItems: 'flex-start',
        marginTop: -10
    },
    detalheImage: {
        flex:1,
    },
    detalhesAlimentos: {
        flex: 1,
		margin:10
    },
    loading: {
		justifyContent: 'center',
		alignItems: 'center'

	},
	loadingTxt: {
		fontSize: 18,
		fontWeight: 'bold'
    },
    labelPicker: {
        fontSize: 18,
        //textAlign: 'center',
        marginBottom: 20
    },
    backButton:{
		width:26,
		height:26,
		marginLeft:10,
		marginTop:20,
        zIndex:99,
        position: 'absolute'
	},
    backImage:{
		width:26,
		height:26
	}
})