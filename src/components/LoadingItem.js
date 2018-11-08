import React, { Component } from 'react';
import { View, Modal, StyleSheet, ActivityIndicator,Text } from 'react-native';


export default class LoadingItem extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Modal animationType="none" transparent visible={this.props.visible}>
                <View style={styles.loading}>
                    <ActivityIndicator size="large" color="#00ff00" />
                    <Text style={styles.loadingTxt}>Carregando...</Text>
                </View>
            </Modal>
        );
    }
}

const styles = StyleSheet.create({
    loading: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000000',
        opacity: 0.5
    },
	loadingTxt: {
		fontSize: 18,
        fontWeight: 'bold',
        color: '#fff'
	}
});