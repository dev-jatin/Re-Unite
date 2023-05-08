import {StyleSheet, Text, ToastAndroid, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useSetRecoilState} from 'recoil';
import {isLoadingState} from '../../recoil';
import {FlatList} from 'react-native-gesture-handler';
import {Font} from '../../../assets';
import ComplaintCard from './component/complaint-card';

const MyComplaints = () => {
  const setLoading = useSetRecoilState(isLoadingState);
  const [complaint, setComplaint] = useState([]);

  useEffect(() => {
    const fetchComplaint = async () => {
      setLoading(true);

      try {
        const res = await fetch('https://4781hy.deta.dev/complaints');
        const json = await res.json();

        json?.result?._items && setComplaint(json.result._items);
      } catch {
        ToastAndroid.show(
          'Something Went Wrong. Please try agian later',
          ToastAndroid.LONG,
        );
      }

      setLoading(false);
    };

    fetchComplaint();
  }, [setLoading]);

  console.log('comp', complaint[0]);

  return (
    <View style={styles.page}>
      {complaint?.length > 0 ? (
        <FlatList
          data={complaint}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.space} />}
          renderItem={({item}) => <ComplaintCard {...item} />}
        />
      ) : (
        <Text style={styles.text_1}>No complaint found </Text>
      )}
    </View>
  );
};

export default MyComplaints;

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 20,
  },
  space: {
    height: 20,
  },
  text_1: {
    textAlign: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',

    fontSize: 14,
    color: 'black',
    fontFamily: Font.POPPINS_LIGHTITALIC,
  },
});
