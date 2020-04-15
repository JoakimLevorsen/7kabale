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

export type AppStackParamlist = {
	Tutorial: {};
	Main: {};
	ChoozPic: { photo?: CameraCapturedPicture };
};

const RootStack = createStackNavigator<AppStackParamlist>();

export default () => (
	<NavigationContainer>
		<RootStack.Navigator
			initialRouteName="Tutorial"
			screenOptions={{ headerShown: false }}
		>
			<RootStack.Screen name="Tutorial" component={Tutorial} />
			<RootStack.Screen name="Main" component={Main} />
			<RootStack.Screen name="ChoozPic" component={ChoozPic} />
		</RootStack.Navigator>
	</NavigationContainer>
);
