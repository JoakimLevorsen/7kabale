import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import {
	StackNavigationProp,
	createStackNavigator,
} from '@react-navigation/stack';
import Main from './screens/Main';
import Tutorial from './screens/Tutorial';
import ChoozPic from './screens/ChoozPic';
import { CameraCapturedPicture } from 'expo-camera';
import { NavigationContainer } from '@react-navigation/native';
import ProcessingPage from './screens/ProcessingPage';

export type AppStackParamList = {
	Tutorial: {};
	Main: {};
	ChoozPic: { photo: CameraCapturedPicture };
	Loading: { photo: CameraCapturedPicture };
};

const RootStack = createStackNavigator<AppStackParamList>();

export default () => (
	<NavigationContainer>
		<RootStack.Navigator
			initialRouteName="Tutorial"
			screenOptions={{ headerShown: false }}
		>
			<RootStack.Screen name="Tutorial" component={Tutorial} />
			<RootStack.Screen name="Main" component={Main} />
			<RootStack.Screen name="ChoozPic" component={ChoozPic} />
			<RootStack.Screen name="Loading" component={ProcessingPage} />
		</RootStack.Navigator>
	</NavigationContainer>
);
