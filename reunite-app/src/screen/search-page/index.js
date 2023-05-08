import React, {useEffect, useState} from 'react';
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  FlatList,
  TouchableOpacity,
  View,
  ToastAndroid,
} from 'react-native';
import {useRecoilValue, useSetRecoilState} from 'recoil';
import {Color, Font} from '../../../assets';
import {imagePickerState, imageState} from '../../recoil';
import {isLoadingState} from '../../recoil/loading';
import {normalize} from '../../utils';
import SearchCard from './component/search-card';

const SearchPage = () => {
  const image = useRecoilValue(imageState);
  const [result, setResult] = useState([]);

  const setImagePicker = useSetRecoilState(imagePickerState);

  const setLoading = useSetRecoilState(isLoadingState);

  const openImagePicker = () => {
    setImagePicker(true);
  };

  useEffect(() => {
    const compareImage = async () => {
      setLoading(true);

      if (!image) {
        // Alert.alert('Please select image');
        setLoading(false);
        return;
      }

      var formdata = new FormData();
      formdata.append('file', image);

      var requestOptions = {
        method: 'POST',
        body: formdata,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'multipart/form-data',
        },
      };
      try {
        const response = await fetch(
          'https://4781hy.deta.dev/compare',
          requestOptions,
        );
        const json = await response.json();

        console.log('json', json);

        setResult(json.response);

        // Alert.alert(json.message ? json.message : json);

        ToastAndroid.show(
          json.message ? json.message : json,
          ToastAndroid.LONG,
        );

        setLoading(false);
      } catch (e) {
        console.log('Error-----', e);
        setLoading(false);
      }
    };

    compareImage();
  }, [image, setLoading]);

  return (
    <>
      <View style={styles.page}>
        <FlatList
          data={result}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.space} />}
          ListHeaderComponent={() => {
            return (
              <View style={styles.container_1}>
                {image ? (
                  <View style={styles.container_2}>
                    <Image style={styles.image} source={{uri: image?.uri}} />
                    <Text onPress={openImagePicker} style={styles.text}>
                      Change
                    </Text>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.button}
                    onPress={openImagePicker}>
                    <Text style={styles.buttonText}>Select Image</Text>
                  </TouchableOpacity>
                )}

                <View style={styles.space} />
              </View>
            );
          }}
          renderItem={({item}) => {
            return <SearchCard {...item} />;
          }}
        />
      </View>
    </>
  );
};

export default SearchPage;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
  },

  space: {
    height: 10,
  },

  image: {
    height: 50,
    width: 50,
    resizeMode: 'contain',
    backgroundColor: 'grey',
    borderRadius: 4,

    margin: 2,
    elevation: 1,
    flexDirection: 'row',
    borderWidth: 1,

    borderColor: '#EBEBEB',
  },

  container_2: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  text: {
    fontSize: 12,
    color: Color.SECONDARY,
    fontFamily: Font.POPPINS_MEDIUM,
    marginLeft: 20,
  },

  button: {
    backgroundColor: Color.SECONDARY,
    alignItems: 'center',
    borderRadius: normalize(5),
    marginBottom: 15,
  },
  buttonText: {
    fontSize: normalize(18),
    color: Color.WHITE,
    lineHeight: normalize(40),
    fontFamily: Font.POPPINS_MEDIUM,
  },
});
