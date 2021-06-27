import React, {Component} from 'react';
import {createUserWithEmailAndPassword} from '../services/FirebaseApi';
import {
  SafeAreaView,
  KeyboardAvoidingView,
  View,
  Image,
  TextInput,
  Button,
  Text,
  StyleSheet,
  Alert,
} from 'react-native';

const img = require('../assets/TodoList.png');

export default class Register extends Component {
  static navigationOptions = {
    title: 'Register',
  };

  state = {
    email: '',
    password: '',
  };

  render() {
    return (
      <SafeAreaView style={{flex: 1}}>
        <KeyboardAvoidingView style={styles.container} behavior={'padding'}>
          <View style={styles.topView}>
            <Image style={styles.img} source={img} />
            <Text style={styles.title}>Cadastrando um novo usuário</Text>
          </View>
          <View style={styles.bottomView}>
            <TextInput
              style={styles.input}
              placeholder={'Email'}
              keyboardType={'email-address'}
              autoCapitalize={'none'}
              onChangeText={email => this.setState({email: email})}
            />
            <TextInput
              style={styles.input}
              placeholder={'Senha'}
              secureTextEntry={true}
              onChangeText={password => this.setState({password: password})}
            />
            <Button
              title={'Finalizar registro'}
              onPress={() => {
                const success = createUserWithEmailAndPassword(
                  this.state.email,
                  this.state.password,
                );
                if (success === true) {
                  Alert.alert(
                    'Sucesso',
                    `Usuario criado com o e-mail ${this.state.email}`,
                    [
                      {
                        text: 'Ok',
                        onPress: () => this.props.navigation.goBack(),
                      },
                    ],
                  );
                } else {
                  Alert.alert(
                    'Não deu!',
                    'Cara...não deu, depois vamos melhorar essa mensagem..mas não deu mesmo!\nTente utilizar outro e-mail cara...',
                    [{text: 'Ok', onPress: () => null}],
                  );
                }
              }}
            />
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  topView: {
    flex: 0.2,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 25,
  },
  img: {
    width: 50,
    height: 50,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 20,
  },
  bottomView: {
    flex: 1,
    flexDirection: 'column',
    paddingRight: 20,
    paddingLeft: 20,
  },
  input: {
    marginBottom: 20,
  },
});
