import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppStackParamList } from '../AppNavigator';
import { Game } from '../scripts/suggestMove';
import AnimationView from '../components/AnimationView';
import { Colors } from '../constants';

type NavProp = StackNavigationProp<AppStackParamList>;

export default () => {
	const navigation = useNavigation<NavProp>();
	const [game] = useState(new Game());

	return (
		<View
			style={{
				alignItems: 'center',
				flex: 1,
				backgroundColor: Colors.green,
				width: '100%',
			}}
		>
			<AnimationView game={game} />
			<Button title="GoBack" onPress={() => navigation.popToTop()} />
		</View>
	);
};
