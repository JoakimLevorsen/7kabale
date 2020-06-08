import React from 'react';
import { Colors, FontSize } from '../constants';
import { Text, TextProps, TextStyle } from 'react-native';

interface Props {
	children: string | number | Array<string | number>;
	color?: Colors;
	fontSize?: FontSize;
	lineHeight?: FontSize | number;
	textAlign?: TextStyle['textAlign'];
	flex?: number;
	style?: TextProps['style'];
}

const CustomText = ({
	children,
	color = Colors.black,
	fontSize = FontSize.body,
	lineHeight,
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
				lineHeight: lineHeight ?? fontSize + 5,
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
