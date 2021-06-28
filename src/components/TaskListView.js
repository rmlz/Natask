import React, {Component} from 'react';
import {
  SectionList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export default class TaskListView extends Component {

  componentDidUpdate(
    prevProps: Readonly<P>,
    prevState: Readonly<S>,
    snapshot: SS,
  ) {
    console.log('sectio', prevProps, prevState, snapshot);
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

  _renderItem(itemData) {
    return (
      <TouchableOpacity>
        <View style={styles.itemConteiner}>
          <Text style={styles.itemTextTitle}>{itemData.item.title}</Text>
          <Text>{itemData.item.description}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <SectionList
        renderSectionHeader={(section) => this._renderSectionHeader(section)}
        sections={[
          {
            data: this.props.tasks.filter((data) => {
              console.log(data)
              return data.priority;
            }),
            key: 'priority',
            title: 'Prioridade',
          },
          {
            data: this.props.tasks.filter((data) => {
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
});
