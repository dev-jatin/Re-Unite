import {atom} from 'recoil';
import AsyncStorage from '@react-native-async-storage/async-storage';

const localForageEffect =
  key =>
  ({setSelf, onSet, trigger}) => {
    const loadPersisted = async () => {
      const savedValue = await AsyncStorage.getItem(key);

      if (savedValue != null) {
        setSelf(JSON.parse(savedValue));
      } else {
        setSelf({
          status: 'loggedOut',
        });
      }
    };

    if (trigger === 'get') {
      loadPersisted();
    }

    onSet((newValue, _, isReset) => {
      isReset
        ? AsyncStorage.removeItem(key)
        : AsyncStorage.setItem(key, JSON.stringify(newValue));
    });
  };

export const userState = atom({
  key: 'user',
  default: {
    status: 'loading',
  },
  effects: [localForageEffect('@user')],
});
