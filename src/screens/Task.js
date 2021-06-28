import React, {Component} from 'react';
import {
  View,
  TextInput,
  Switch,
  Text,
  Button,
  StyleSheet,
  Alert,
  ToastAndroid,
} from 'react-native';
import {writeTaskOnFirebase} from '../services/FirebaseApi';

export default class Task extends Component {
  state = {
    title: '',
    description: '',
    priority: true,
    isDone: false,
  };

  async _saveTask() {
    var task = {
      title: this.state.title,
      description: this.state.description,
      priority: this.state.priority,
      isDone: this.state.isDone,
    };
    try {
      await writeTaskOnFirebase(task).then(() => {
        ToastAndroid.show(
          `Tarefa ${task.title} salva com sucesso`,
          ToastAndroid.LONG,
        );
        this.props.navigation.goBack();
      });
    } catch (error) {
      ToastAndroid.show(
        `Não foi possível salvar a Tarefa. ${error}`,
        ToastAndroid.LONG,
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          placeholder={'Título'}
          value={this.state.title}
          onChangeText={val => this.setState({title: val})}
        />
        <TextInput
          style={styles.input}
          multiline={true}
          numberOfLines={4}
          placeholder={'Descrição'}
          value={this.state.description}
          onChangeText={val => this.setState({description: val})}
        />
        <View style={styles.switchContainer}>
          <Switch
            value={this.state.priority}
            onValueChange={val => this.setState({priority: val})}
          />
          <Text style={styles.switchText}>Prioritária?</Text>
        </View>
        <View style={styles.switchContainer}>
          <Switch
            value={this.state.isDone}
            onValueChange={val => this.setState({isDone: val})}
          />
          <Text>Tarefa finalizada?</Text>
        </View>
        <Button title={'Salvar'} onPress={() => this._saveTask()} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    padding: 20,
  },
  input: {
    marginBottom: 20,
  },
  multilineInput: {
    height: 100,
  },
  switchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
  },
  switchText: {
    marginLeft: 10,
    color: 'black',
    fontSize: 18,
  },
});
