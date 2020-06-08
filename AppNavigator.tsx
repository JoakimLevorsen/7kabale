import React from 'react';
import {
	createStackNavigator,
	StackNavigationProp,
} from '@react-navigation/stack';
import Main from './screens/Main';
import Tutorial from './screens/Tutorial';
import ChoozPic from './screens/ChoozPic';
import { CameraCapturedPicture } from 'expo-camera';
import { NavigationContainer } from '@react-navigation/native';
import ProcessingPage from './screens/ProcessingPage';
import GameGuidePage from './screens/GameGuidePage';

export type AppStackParamList = {
	Tutorial: {};
	Main: {};
	ChoozPic: { photo: CameraCapturedPicture };
	Loading: { photo: CameraCapturedPicture };
	GameGuidePage: {};
};

const RootStack = createStackNavigator<AppStackParamList>();

export type NavStack = StackNavigationProp<AppStackParamList>;

export default () => (
	<NavigationContainer>
		<RootStack.Navigator
			initialRouteName="Main"
			screenOptions={{ headerShown: false }}
		>
			<RootStack.Screen name="Tutorial" component={Tutorial} />
			<RootStack.Screen name="Main" component={Main} />
			<RootStack.Screen name="ChoozPic" component={ChoozPic} />
			<RootStack.Screen name="Loading" component={ProcessingPage} />
			<RootStack.Screen name="GameGuidePage" component={GameGuidePage} />
		</RootStack.Navigator>
	</NavigationContainer>
);
