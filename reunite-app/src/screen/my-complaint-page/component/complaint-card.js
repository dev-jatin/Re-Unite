import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {Color, Font} from '../../../../assets';
import {TouchableOpacity} from 'react-native-gesture-handler';

import {useRecoilValue} from 'recoil';
import {userState} from '../../../recoil';

const ComplaintCard = ({
  age,
  name,
  imageUrl,
  complainerMobNo,
  complainerName,
  userId,
}) => {
  const user = useRecoilValue(userState);

  return (
    <>
      {user?.key === userId && (
        <TouchableOpacity onPress={() => {}} style={styles.container}>
          <Image style={styles.image} source={{uri: imageUrl}} />

          <View style={styles.container_1}>
            <Text style={styles.text}>Name: </Text>
            <Text style={styles.text_1}>{name}</Text>

            <Text style={styles.text}>Age :</Text>
            <Text style={styles.text_1}>{age} year old</Text>
          </View>
        </TouchableOpacity>
      )}
    </>
  );
};

export default ComplaintCard;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 15,
    margin: 2,
    elevation: 1,
    flexDirection: 'row',
    borderWidth: 1,
    borderRadius: 4,
    borderColor: '#EBEBEB',
  },
  container_1: {
    marginLeft: 20,
    flex: 1,
  },
  space: {
    height: 20,
  },
  text: {
    fontSize: 12,
    color: Color.GREY,
    fontFamily: Font.POPPINS_MEDIUM,
  },
  text_1: {
    fontSize: 14,
    color: Color.BLACK,
    fontFamily: Font.POPPINS_REGULAR,
  },
  text_2: {
    fontSize: 16,
    color: Color.BLACK,
    fontFamily: Font.POPPINS_BOLD,
  },
  image: {
    resizeMode: 'contain',
    height: 100,
    width: 85,
    backgroundColor: 'grey',
    borderRadius: 5,
  },
  container_2: {
    marginLeft: 'auto',
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
  },
});
