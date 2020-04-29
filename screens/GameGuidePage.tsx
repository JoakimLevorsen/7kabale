import React from 'react';
import { View, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppStackParamList } from '../AppNavigator';

type NavProp = StackNavigationProp<AppStackParamList>;

export default () => {
	const navigation = useNavigation<NavProp>();

	return (
		<View
			style={{
				justifyContent: 'center',
				alignItems: 'center',
				backgroundColor: 'pink',
				flex: 1,
			}}
		>
			<Button title="GoBack" onPress={() => navigation.popToTop()} />
		</View>
	);
};
