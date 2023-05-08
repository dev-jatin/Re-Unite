import {atom} from 'recoil';

export const imagePickerState = atom({
  key: 'imagePicker',
  default: false,
});

export const imageState = atom({
  key: 'image',
  default: '',
});
