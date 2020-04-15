import React from 'react';
import { Colors, FontSize } from '../constants';
import { Text, TextProps, TextStyle } from 'react-native';

interface Props {
	children: string | number;
	color?: Colors;
	fontSize?: FontSize;
	textAlign?: TextStyle['textAlign'];
	flex?: number;
	style?: TextProps['style'];
}

const CustomText = ({
	children,
	color = Colors.black,
	fontSize = FontSize.body,
	textAlign = 'center',
	flex = 1,
	style,
}: Props) => (
	<Text
		style={[
			{
				color,
				fontSize,
				flex,
				minHeight: fontSize,
				fontWeight: 'bold',
				textAlign,
			},
			style,
		]}
	>
		{children}
	</Text>
);

export default CustomText;
