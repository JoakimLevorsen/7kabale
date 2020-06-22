import React, { useState } from 'react';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppStackParamList } from '../AppNavigator';
import { Game } from '../scripts/suggestMove';
import AnimationView from '../components/AnimationView';
import { Colors } from '../constants';
import RedButton from '../components/RedButton';

type NavProp = StackNavigationProp<AppStackParamList>;

export default () => {
	const navigation = useNavigation<NavProp>();
	const [game] = useState(new Game());

	return (
		<View
			style={{
				alignItems: 'center',
				justifyContent: 'space-between',
				flex: 1,
				backgroundColor: Colors.green,
				width: '100%',
				paddingBottom: 30,
				paddingHorizontal: 20,
			}}
		>
			<View style={{ flex: 1 }} />
			<AnimationView game={game} />
			<RedButton title="Go Back" onPress={() => navigation.popToTop()} />
		</View>
	);
};
