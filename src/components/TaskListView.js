import React, {Component} from 'react';
import {
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  TouchableHighlight,
  ToastAndroid,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {writeTaskOnFirebase} from '../services/FirebaseApi';

export default class TaskListView extends Component {
  _buttonSize = Dimensions.get('window').width / 20;

  componentDidUpdate(
    prevProps: Readonly<P>,
    prevState: Readonly<S>,
    snapshot: SS,
  ) {
    console.log('section', prevProps, prevState, snapshot);
  }

  _onClickTask(task) {
    const {navigate} = this.props.navigation;
    navigate('Tarefa', {task});
  }

  _renderSectionHeader(sectionData) {
    return (
      <View style={styles.headerConteiner}>
        <View style={styles.headerTagConteiner}>
          <Text style={styles.headerTagText}>
            {sectionData.section.title.substr(0, 1)}
          </Text>
        </View>
        <Text style={styles.headerText}>{sectionData.section.title}</Text>
      </View>
    );
  }
  _doneOrDeleteTask(itemData, bool: boolean, exclude=false) {
    itemData.item.isDone = bool;
    console.log('item', itemData);
    if(!exclude) {
      writeTaskOnFirebase(itemData.item).then(r => {
        if (bool) {
          ToastAndroid.show(
              `Tarefa ${itemData.item.title} foi completada!`,
              ToastAndroid.LONG,
          );
        } else {
          ToastAndroid.show(
              `Tarefa ${itemData.item.title} retornou para a lista de tarefas.`,
              ToastAndroid.LONG,
          );
        }
      });
    } else {
      itemData.item.flagex = exclude;
      writeTaskOnFirebase(itemData.item).then(r => {
        ToastAndroid.show(
          `Tarefa ${itemData.item.title} foi removida!`,
            ToastAndroid.LONG,
        );
      });
    }
  }

  _renderItem(itemData) {
    let doneButton;
    if (!itemData.item.isDone) {
      doneButton = (
        <TouchableOpacity onPress={() => this._doneOrDeleteTask(itemData, true)}>
          <Icon
            size={this._buttonSize}
            color={'darkgreen'}
            reverse
            name={'done'}
          />
        </TouchableOpacity>
      );
    } else {
      doneButton = (
        <TouchableOpacity
          onPress={() => this._doneOrDeleteTask(itemData, false)}>
          <Icon
            size={this._buttonSize}
            color={'orange'}
            reverse
            type={'font-awesome'}
            name={'undo'}
          />
        </TouchableOpacity>
      );
    }
    return (
      <View style={styles.testContainer}>
        <TouchableOpacity
          style={styles.itemConteiner}
          onPress={() => this._onClickTask(itemData.item)}>
          <View>
            <Text style={styles.itemTextTitle}>{itemData.item.title}</Text>
            <Text>{itemData.item.description}</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            this._doneOrDeleteTask(itemData, itemData.item.isDone, true)
          }>
          <Icon
            size={this._buttonSize}
            color={'darkred'}
            reverse
            name={'delete'}
          />
        </TouchableOpacity>
        {doneButton}
      </View>
    );
  }

  render() {
    return (
      <SectionList
        renderSectionHeader={section => this._renderSectionHeader(section)}
        sections={[
          {
            data: this.props.tasks.filter(data => {
              console.log(data);
              return data.priority;
            }),
            key: 'priority',
            title: 'Prioridade',
          },
          {
            data: this.props.tasks.filter(data => {
              return !data.priority;
            }),
            key: 'noPriority',
            title: 'Outras tarefas',
          },
        ]}
        renderItem={data => this._renderItem(data)}
        keyExtractor={(item, index) => index.toString()}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    paddingLeft: 10,
    paddingRight: 10,
  },
  headerConteiner: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'silver',
    borderRadius: 25,
    marginTop: 10,
  },
  headerTagConteiner: {
    backgroundColor: 'gray',
    height: 35,
    width: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  headerTagText: {
    color: '#FFF',
    fontSize: 22,
  },
  headerText: {
    fontSize: 16,
    marginLeft: 10,
  },
  itemConteiner: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#F3F2F0',
    marginTop: 5,
    padding: 10,
    height: 75,
  },
  itemTextTitle: {
    fontSize: 22,
  },
  testContainer: {
    flexDirection: 'row',
    alignContent: 'space-between',
  },
});
