import React, { Component } from 'react';
import { View, Text,  Button, TextInput, Image, FlatList, StyleSheet, Modal, TouchableOpacity, ScrollView } from 'react-native';
import firebase from './FirebaseCon';
import LoadingItem from './components/LoadingItem';
import OneSignal from 'react-native-onesignal'; 
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
		OneSignal.setLogLevel(7, 0);

        OneSignal.init("f4bf60bc-a702-4e11-b1fa-26dcd2608a51", {kOSSettingsKeyAutoPrompt : true});
    
        OneSignal.addEventListener('received', this.onReceived);
        OneSignal.addEventListener('opened', this.onOpened);
        OneSignal.addEventListener('ids', this.onIds);
    
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
    componentWillUnmount() {
        OneSignal.removeEventListener('received', this.onReceived);
        OneSignal.removeEventListener('opened', this.onOpened);
        OneSignal.removeEventListener('ids', this.onIds);
      }
    
      onReceived(notification) {
        alert("Notification received: ", notification);
      }
    
      onOpened(openResult) {
        alert('Message: ', openResult.notification.payload.body);
        alert('Data: ', openResult.notification.payload.additionalData);
        alert('isActive: ', openResult.notification.isAppInFocus);
        alert('openResult: ', openResult);
      }
    
      onIds(device) {
        alert('Device info: ', device);
      }

    render() {
        return(
            <View style={styles.body}>
                 <LoadingItem visible={this.state.loading} />

                 <View style={{flex:1, flexDirection:'row', justifyContent:'flex-start'}}>
                    <TouchableOpacity style={{flex:1, height: 323}} onPress={()=>this.props.navigation.navigate('CategoriaScreen', {id: 1})}>
                        <View style={styles.filmeArea}>
                            <Image style={{flex:1, height: 323}} source={require('../assets/images/zero-lactose.png')}/>                        
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex:1, height: 323}} onPress={()=>this.props.navigation.navigate('CategoriaScreen', {id: 2})}>
                        <View style={styles.filmeArea}>
                            <Image style={{flex:1, height: 323}} source={require('../assets/images/sem-gluten.png')}/>                        
                        </View>
                    </TouchableOpacity>
                </View>
                <View style={{flex:1, flexDirection:'row', justifyContent:'flex-end'}}>
                    <TouchableOpacity style={{flex:1, height: 323}} onPress={()=>this.props.navigation.navigate('CategoriaScreen', {id: 3})}>
                        <View style={styles.filmeArea}>
                            <Image style={{flex:1, height: 323}} source={require('../assets/images/vegano.png')}/>                        
                        </View>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={{flex:1, height: 323}} onPress={()=>this.props.navigation.navigate('CategoriaScreen', {id: 4})}>
                        <View style={styles.filmeArea}>
                            <Image style={{flex:1, height: 323}} source={require('../assets/images/vegetariano.png')}/>                        
                        </View>
                    </TouchableOpacity>
                 </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    body: {
        flex: 1,
        backgroundColor: '#fff'
        //padding: 10
    },
    container: {
		flex:1,
		marginTop:20
	},
	filmeArea: {
		flex: 1,
		flexDirection: 'row',
		margin:1
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