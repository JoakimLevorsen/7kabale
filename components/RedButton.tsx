import React from 'react';
import {
	ButtonProps,
	ViewProps,
	TouchableOpacity,
	StyleSheet,
} from 'react-native';
import Colors from '../constants/Colors';
import CustomText from './CustomText';
import { FontSize } from '../constants';

interface Props {
	title: string;
	onPress: ButtonProps['onPress'];
	style?: ViewProps['style'];
	padding?: number;
	fontSize?: FontSize | number;
}

export default ({
	title,
	onPress,
	style,
	padding = 20,
	fontSize = FontSize.body,
}: Props) => (
	<TouchableOpacity
		style={[styles.container, style, { padding }]}
		onPress={onPress}
	>
		<CustomText color={Colors.white} fontSize={fontSize}>
			{title}
		</CustomText>
	</TouchableOpacity>
);

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.red,
		borderRadius: 10,
		shadowColor: '#000000',
		shadowOpacity: 0.25,
		shadowOffset: { width: 0, height: 4 },
		display: 'flex',
		flexDirection: 'row',
		minWidth: 40,
		minHeight: 20,
	},
});
