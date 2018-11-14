import React, { Component } from 'react';
import { View, Text,  Button, TextInput, Image, FlatList, StyleSheet, Modal, TouchableOpacity } from 'react-native';
import firebase from './FirebaseCon';
import ReceitaItem from './ReceitaItem';
export default class ConversationScreen extends Component {

    static navigationOptions = ({navigation}) => ({
        tabBarLabel:"Receitas",
        header:null,
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
    
        this.state = {nome: 'carregando...',receitas: [],  modalVisible:false,
        list:[
            {
                key:123,
                nome:"Pão de Mel Macio (Receita Econômica)",
                por:'Juliana Guermandi Caride',
                descricao:'Este é um bolo de mel macio muito bom e fácil de fazer.',
                rendimento:50,
                preparo:60,
                imagem:'https://img.itdg.com.br/tdg/images/recipes/000/115/197/262559/262559_original.jpg',
                ingredientes:[
                    {key:1, txt:'4 ovos inteiros'},
                    {key:2, txt:'1 xícara (chá) de mel ou favinho'},
                    {key:3, txt:'1 xícara (chá) de açúcar mascavo'},
                    {key:4, txt:'1/2 xícara (chá) de chocolate em pó'},
                    {key:5, txt:'1 colher (chá) de canela em pó'},
                    {key:6, txt:'1 colher (chá) de cravo em pó'},
                    {key:7, txt:'2 colheres (sopa) cheias de manteiga ou margarina'},
                    {key:8, txt:'2 xícaras (chá) de leite'},
                    {key:9, txt:'4 xícaras (chá) de farinha de trigo'},
                    {key:10, txt:'2 colheres (chá) de bicarbonato de sódio'},
                    {key:11, txt:'2 colheres (chá) de fermento em pó'},
                    {key:12, txt:'1 kg de chocolate fracionado para banhar'}
                ],
                modo:[
                    {key:1, txt:'Primeiramente, bata muito bem os ovos na batedeira, até ficar bem espumoso e amarelo claro'},
                    {key:2, txt:'Depois, adicione o mel, o açúcar, o chocolate, o cravo, a canela, a margarina, o leite e a farinha'},
                    {key:3, txt:'Bata muito bem até ficar uma massa totalmente homogênea'},
                    {key:4, txt:'Por último, adicione o bicarbonato e o fermento e misture a massa à mão, até ficar completamente misturada e homogênea (este é o segredo para a massa além de crescer, não murchar)'},
                    {key:5, txt:'Preaqueça o forno a 180ºC antes de começar a encher as forminhas previamente untadas com margarina ou manteiga'},
                    {key:6, txt:'Asse por aproximadamente 25 minutos, na mesma temperatura'},
                    {key:7, txt:'Corte todos os pãezinhos ao meio e recheie com o sabor de sua preferência'},
                    {key:8, txt:'Banhe-os no chocolate, espere secar bem e embale-os'},
                    {key:9, txt:'Essa receita pode ser vendida a R$ 2,50 cada pãozinho'}
                ]
            },
            {
                key:321,
                nome:"Bolo de Banana Fofinho",
                por:'Equipe Tudo Gostoso',
                descricao:'Este é um bolo de banana fofinho é ótimo.',
                rendimento:16,
                preparo:45,
                imagem:'https://img.itdg.com.br/tdg/images/recipes/000/188/774/268127/268127_original.jpg',
                ingredientes:[
                    {key:1, txt:'1/2 xícara (chá) de leite'},
                    {key:2, txt:'1 xícara (chá) de óleo'},
                    {key:3, txt:'1 xícara (chá) de açúcar'},
                    {key:4, txt:'3 ovos'},
                    {key:5, txt:'2 bananas nanica médias picadas'},
                    {key:6, txt:'2 xícaras (chá) de farinha de trigo'},
                    {key:7, txt:'1 xícara (chá) de amido de milho MAIZENA®'},
                    {key:8, txt:'1 colher (sopa) de fermento em pó'}
                ],
                modo:[
                    {key:1, txt:'Bata no liquidificador o leite, o óleo, o açúcar e os ovos até que fique homogêneo e cremoso'},
                    {key:2, txt:'Junte as bananas e bata até triturar levemente'},
                    {key:3, txt:'Peneire o trigo, a MAIZENA® e o fermento, passe para uma tigela e adicione aos poucos a mistura até obter uma massa cremosa e homogênea'},
                    {key:4, txt:'Coloque a massa em uma forma redonda com furo central (20 cm de diâmetro) untada e enfarinhada, polvilhe com o açúcar e a canela e leve ao forno preaquecido em temperatura média (180°C) por 40 minutos ou até que um palito saia limpo, depois de espetado na massa'},
                    {key:5, txt:'Espere amornar e desenforme'}
                ]
            }
        ]
    };
    
    
        //   firebase.database().ref("receitas").once('value').then((snapshot) =>{
        //       let state = this.state;
        //       this.state.receitas = [];
  
        //       snapshot.forEach((childItem)=>{
        //           state.receitas.push({
        //               key: childItem.key,
        //               nome: childItem.val().nome,
        //               descricao: childItem.val().descricao,
        //               foto: childItem.val().foto
        //           });
        //       });
  
        //       this.setState(state);
        //   });
          this.abrirModal = this.abrirModal.bind(this);
          this.fecharModal = this.fecharModal.bind(this);
          this.clicou = this.clicou.bind(this);
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

    clicou(item){
        this.props.navigation.navigate('Receita', item);

        //alert("aqui"+item.nome);
    }
      render() {
        return (
          <View  style={styles.body}>
          <FlatList 
            data={this.state.list}
            renderItem={({item})=> <ReceitaItem  onPress={()=> {this.clicou(item)}} data={item}/>} 
            />

            {/* <TextInput placeholder="buscar receitas..." onChangeText={(nome)=>this.setState({nome})} />
            <FlatList data={this.state.receitas} renderItem={({item})=>{
                return(
                    <TouchableOpacity onPress={()=>this.abrirModal(item)}>
                    <View style={styles.filmeArea}>
                        <View>
                            <Text style={styles.nome}>{item.nome}</Text>
                            <Image style={styles.filmeImage} source={{uri:item.foto}} style={{width:400, height:130}} />                        
                        </View>
                    </View>
                    </TouchableOpacity>
                );
            }}/> */}
            {/* <Modal animationType="slide" visible={this.state.modalVisible}>
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
            </Modal> */}
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
        color: '#fff',
        backgroundColor: '#d30c5c',
        padding: 10,
        borderRadius: 7
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