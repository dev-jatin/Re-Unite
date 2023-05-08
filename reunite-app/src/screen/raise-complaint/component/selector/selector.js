import {
  Modal,
  StyleSheet,
  Text,
  FlatList,
  View,
  TouchableOpacity,
} from 'react-native';
import React from 'react';

import {Font} from '../../../../../assets';

const Selector = ({
  modalVisible,
  setModalVisible,
  data,
  setState,
  modalType,
}) => {
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.container_1}>
        <View style={styles.container_2}>
          <Text style={styles.text}>Select {modalType}</Text>
          <View style={styles.line} />
          <FlatList
            ItemSeparatorComponent={() => <View style={styles.line} />}
            data={data}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                  onPress={() => {
                    setState(item);
                    setModalVisible(!modalVisible);
                  }}>
                  <Text style={styles.text}>{item}</Text>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </Modal>
  );
};

export default Selector;

const styles = StyleSheet.create({
  container_1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container_2: {
    height: '75%',
    width: '85%',
    backgroundColor: 'white',

    borderRadius: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  text: {
    textAlign: 'center',
    fontSize: 14,
    color: 'black',
    fontFamily: Font.POPPINS_MEDIUM,
    marginVertical: 12,
  },
  line: {
    height: 1,
    width: '100%',
    backgroundColor: '#EBEBEB',
  },
});
