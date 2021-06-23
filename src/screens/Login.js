import React from 'react';
import { SafeAreaView, KeyboardAvoidingView, View, Image, TextInput, Button, Text, StyleSheet } from 'react-native';

const img = require('../assets/TodoList.png');

const Login = () => {
    return (
        <SafeAreaView style={{flex: 1}}>
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <View style={styles.topView}>
                    <Image style={styles.img} source={img} />
                </View>
                <View style={styles.bottomView}>
                    <TextInput style={styles.input} placeholder="Email" keyboardType={'email-address'} autoCapitalize="none" />
                    <TextInput style={styles.input} placeholder="Senha" secureTextEntry={true} />
                    <Button title="Sign In" />
                    <View style={styles.textConteiner}>
                        <Text>Não faz parte da nossa turma? </Text>
                        <Text style={styles.textRegister}>Registre-se</Text>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column'
    },
    topView: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: 50
    },
    img: {
        width: 200,
        height: 200
    },
    bottomView: {
        flexDirection: 'column',
        paddingRight: 20,
        paddingLeft: 20},
    input: {
        marginBottom: 20,
        backgroundColor: 'lightgray',
        paddingLeft: 10,
        paddingRight: 10
    },
    textConteiner: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 20
    },
    textRegister: {
        fontWeight: 'bold'
    },
});

export default Login;
