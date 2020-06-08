import React, { useState, useEffect } from 'react';
import { Animated, View, Image, Dimensions, ViewStyle } from 'react-native';
import CustomText from './CustomText';
import { Card, Suit, iconForSuit } from '../types/Card';
import { Colors } from '../constants';

interface Props {
	row: 0 | 1;
	card: Card;
	column: number;
	columnIndex?: number;
	animationTarget?: {
		row: number;
		column: number;
		columnIndex?: number;
	};
	visible: boolean;
}

export default ({
	row,
	card,
	column,
	columnIndex = 0,
	animationTarget,
	visible = false,
}: Props) => {
	const [moveAnimation] = useState(new Animated.Value(0));
	useEffect(() => {
		if (animationTarget) {
			Animated.loop(
				Animated.sequence([
					Animated.timing(moveAnimation, {
						toValue: 1,
						duration: 500,
					}),
					Animated.timing(moveAnimation, {
						toValue: 0,
						duration: 500,
					}),
				])
			).start();
		}
	});

	// Now we find our position
	const screenWidth = Dimensions.get('window').width;
	// Our width is the total width - 8 margins of 10, divided by 7
	const myWidth = (screenWidth - 80) / 7;
	const x = 10 + column * (myWidth + 10);
	// Now we find the effective height
	const myHeight = (myWidth / 300) * 460;
	// We set the expected height, and add the offset
	const y = 10 + row * (myHeight * 10) + columnIndex * 20;

	const cardStyle: ViewStyle = {
		height: myHeight,
		width: myWidth,
		position: 'absolute',
		top: y,
		left: x,
		backgroundColor: visible ? Colors.red : undefined,
	};

	// We don't need an animated view if we don't animate
	if (!animationTarget) {
		return (
			<View style={cardStyle}>
				{visible && (
					<>
						<Image source={iconForSuit(card.suit)} />
						<CustomText>{card.value}</CustomText>
					</>
				)}
			</View>
		);
	}

	// Now we do the calculation to interpolate the animation
	const targetX = 10 + animationTarget.column * (myWidth + 10);
	const targetY =
		10 +
		animationTarget.row * (myHeight + 10) +
		(animationTarget.columnIndex ?? 0) * 20;
	const deltaX = targetX - x;
	const deltaY = targetY - y;

	return (
		<Animated.View
			style={[
				cardStyle,
				{
					transform: [
						{
							translateX: moveAnimation.interpolate({
								inputRange: [0, 1],
								outputRange: [0, deltaX],
							}),
						},
						{
							translateY: moveAnimation.interpolate({
								inputRange: [0, 1],
								outputRange: [0, deltaY],
							}),
						},
					],
				},
			]}
		>
			{visible && (
				<>
					<Image source={iconForSuit(card.suit)} />
					<CustomText>{card.value}</CustomText>
				</>
			)}
		</Animated.View>
	);
};
