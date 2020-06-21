import React from 'react';
import { View } from 'react-native';

export interface Position {
	x: number;
	y: number;
}

type RelativePosition =
	| { top: number; left: number }
	| { bottom: number; right: number };

interface Props {
	positon: RelativePosition;
	setPosition: (p: Position) => void;
}

export default ({ positon, setPosition }: Props) => {
	return (
		<View
			style={{
				backgroundColor: 'red',
				height: 30,
				width: 30,
				borderRadius: 15,
				position: 'absolute',
				...positon,
			}}
			onTouchMove={({ nativeEvent }) => {
				setPosition({
					x: nativeEvent.pageX - 15,
					y: nativeEvent.pageY - 15,
				});
			}}
		/>
	);
};
