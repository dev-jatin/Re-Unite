import {StyleSheet, View} from 'react-native';
import React from 'react';
import Spinner from 'react-native-spinkit';

export const Loader = () => {
  return (
    <View style={styles.page}>
      <View style={styles.shadow} />
      <View style={styles.container}>
        <Spinner
          isVisible={true}
          size={100}
          type={'Circle'}
          color={'#FF9100'}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    position: 'absolute',
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  shadow: {
    backgroundColor: 'black',
    position: 'absolute',
    height: '100%',
    width: '100%',
    opacity: 0.7,
  },
  container: {
    opacity: 1,
  },
});
