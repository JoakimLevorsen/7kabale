import React from 'react';
import { Colors, FontSize } from '../constants';
import { Text } from 'react-native';

interface Props {
	children: string;
	color?: Colors;
	fontSize?: FontSize;
}

const CustomText = ({
	children,
	color = Colors.black,
	fontSize = FontSize.body,
}: Props) => (
	<Text
		style={{
			color,
			fontSize,
			fontWeight: 'bold',
		}}
	>
		{children}
	</Text>
);

export default CustomText;
