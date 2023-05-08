import React from 'react';
import {SvgCss} from 'react-native-svg';
import {useRecoilValue} from 'recoil';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {BottomTab} from './bottom-navigation';
import {Color, Routes, Svg} from '../../assets';
import {ImagePicker, Loader} from '../components';
import {imagePickerState, isLoadingState, userState} from '../recoil';
import {
  RaiseComplaint,
  SearchPage,
  LoginPage,
  SignUpPage,
  MyComplaints,
  SearchDetail,
} from '../screen';
import SplashScreen from 'react-native-splash-screen';

const Stack = createStackNavigator();

const horizontalAnimation = {
  gestureDirection: 'horizontal',
  cardStyleInterpolator: ({current, layouts}) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
        ],
      },
    };
  },
};

const Navigation = () => {
  const loading = useRecoilValue(isLoadingState);
  const user = useRecoilValue(userState);
  const imagePicker = useRecoilValue(imagePickerState);

  console.log('user', user);

  if (user.status !== 'loading') {
    SplashScreen.hide();
  }

  if (user.status === 'loading') {
    return null;
  }

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator>
          {user.status !== 'loggedOut' ? (
            <Stack.Group
              screenOptions={{
                ...horizontalAnimation,
                headerStyle: {
                  backgroundColor: Color.PRIMARY,
                },
                headerTintColor: Color.WHITE,
              }}>
              <Stack.Screen
                name={Routes.BOTTOM_TAB}
                component={BottomTab}
                options={{
                  headerTitle: () => <SvgCss xml={Svg.REUNITE_LOGO} />,
                }}
              />
              <Stack.Screen
                name={Routes.RAISE_COMPLAINT_PAGE}
                component={RaiseComplaint}
                options={{
                  headerTitle: 'Raise Complaint',
                }}
              />
              <Stack.Screen
                name={Routes.SEARCH_PAGE}
                component={SearchPage}
                options={{
                  headerTitle: 'Search Complaint',
                }}
              />
              <Stack.Screen
                name={Routes.MY_COMPLAINT_PAGE}
                component={MyComplaints}
                options={{
                  headerTitle: 'My Complaints',
                }}
              />
              <Stack.Screen
                name={Routes.SEARCH_DETAIL_PAGE}
                component={SearchDetail}
                options={{
                  headerTitle: 'Complaint Detail',
                }}
              />
            </Stack.Group>
          ) : (
            <Stack.Group
              screenOptions={{...horizontalAnimation, headerShown: false}}>
              <Stack.Screen name={Routes.LOGIN_PAGE} component={LoginPage} />
              <Stack.Screen name={Routes.SIGNUP_PAGE} component={SignUpPage} />
            </Stack.Group>
          )}
        </Stack.Navigator>
      </NavigationContainer>
      {loading && <Loader />}
      {imagePicker && <ImagePicker />}
    </>
  );
};

export default Navigation;
