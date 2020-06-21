import { CardType, Suit, iconForSuit } from '../types/Card';
import { Frame } from '../types/Frame';
import React from 'react';
import { View, Image } from 'react-native';
import SelectionMarker from './SelectionMarker';
import CustomText from './CustomText';
import { Colors } from '../constants';

interface Props {
	card: CardType;
	suit: Suit;
	position: Frame;
	setPosition: (frame: Frame) => void;
	marginTop?: number;
	editable?: boolean;
	active?: boolean;
}

export default ({
	card,
	suit,
	position,
	setPosition,
	marginTop,
	editable,
	active,
}: Props) => (
	<View
		style={{
			position: 'absolute',
			top: position.y,
			left: position.x,
			height: position.height,
			width: position.width,
			borderWidth: 2,
			borderColor: active ? 'red' : 'yellow',
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			zIndex: active && 10,
		}}
	>
		{editable && (
			<>
				<SelectionMarker
					// marginTop={marginTop}
					positon={{ top: -15, left: -15 }}
					setPosition={({ x, y }) =>
						setPosition({ ...position, x, y })
					}
				/>
				<SelectionMarker
					// marginTop={marginTop}
					positon={{ bottom: -15, right: -15 }}
					setPosition={({ x, y }) =>
						setPosition({
							...position,
							height: y - position.y,
							width: x - position.x,
						})
					}
				/>
			</>
		)}
		<Image style={{ height: 30, width: 30 }} source={iconForSuit(suit)} />
		<CustomText flex={0} color={Colors.white}>
			{card}
		</CustomText>
	</View>
);
