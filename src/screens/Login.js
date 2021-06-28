import React, {useState} from 'react';
import {signInWithEmailAndPassword} from '../services/FirebaseApi';
import {CommonActions} from '@react-navigation/native';
import {
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

const Login = props => {
  const [email, setEmail] = useState(props.email);
  const [password, setPassword] = useState('');

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <View style={styles.topView}>
        <Image style={styles.img} source={img} />
      </View>
      <View style={styles.bottomView}>
        <TextInput
          style={styles.input}
          value={props.email}
          placeholder="Email"
          keyboardType={'email-address'}
          autoCapitalize="none"
          onChangeText={textEmail => setEmail(textEmail)}
        />
        <TextInput
          style={styles.input}
          placeholder="Senha"
          secureTextEntry={true}
          onChangeText={textPassword => setPassword(textPassword)}
        />
        <Button
          title="Entrar"
          onPress={() => {
            const success = signInWithEmailAndPassword(email, password).then(
              result => {
                const title = result.success ? 'Sucesso' : 'Não deu!';
                if (result.success) {
                  props.navigation.dispatch(
                    CommonActions.reset({
                      index: 0,
                      routes: [{name: 'TaskList'}],
                    }),
                  );
                }
              },
            );
          }}
        />
        <View style={styles.textConteiner}>
          <Text>Não faz parte da nossa turma? </Text>
          <Text
            style={styles.textRegister}
            onPress={() => props.navigation.navigate('Register')}>
            Registre-se
          </Text>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  topView: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
  },
  img: {
    width: 200,
    height: 200,
  },
  bottomView: {
    flexDirection: 'column',
    paddingRight: 20,
    paddingLeft: 20,
  },
  input: {
    marginBottom: 20,
    backgroundColor: 'lightgray',
    paddingLeft: 10,
    paddingRight: 10,
  },
  textConteiner: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  textRegister: {
    fontWeight: 'bold',
  },
});

export default Login;
