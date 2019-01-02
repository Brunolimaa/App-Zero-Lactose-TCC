import React, { Component } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

export default class ReceitaModo extends Component {
    static navigationOptions = {
        tabBarLabel: 'Preparo'
    }

    constructor(props){
        super(props);
        this.state = {};
    }
    
    render() {
        let cont = 0;
        return(
            <View style={styles.areaTab}>
                <FlatList 
                    data={this.props.screenProps.modoPreparo} 
                    renderItem={({item}) => <Text style={styles.ingItem}><Text style={{fontWeight: 'bold'}}>- Passo: </Text> {item.txt}</Text>} />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    areaTab: {
        flex:1,
        margin: 10
    },
    ingItem: {
        fontSize: 16,
        marginBottom:10
    }
})