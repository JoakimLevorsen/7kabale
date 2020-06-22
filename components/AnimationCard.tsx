import React, { useState, useEffect } from 'react';
import { Animated, View, Image, Dimensions, ViewStyle } from 'react-native';
import CustomText from './CustomText';
import { Card, Suit, iconForSuit } from '../types/Card';
import { Colors } from '../constants';
import { Move, Game } from '../scripts/suggestMove';

interface Props {
	row: 0 | 1;
	card: Card;
	column: number;
	columnIndex?: number;
	animationTarget?: Move;
	// animationTarget?: {
	// 	row: number;
	// 	column: number;
	// 	columnIndex?: number;
	// };
	visible?: boolean;
	game: Game;
}

export default ({
	row,
	card,
	column,
	columnIndex = 0,
	animationTarget,
	game,
	visible = false,
}: Props) => {
	const [moveAnimation] = useState(new Animated.Value(0));
	useEffect(() => {
		if (animationTarget) {
			Animated.loop(
				Animated.sequence([
					Animated.timing(moveAnimation, {
						toValue: 1,
						duration: 1000,
					}),
					Animated.timing(moveAnimation, {
						toValue: 0,
						duration: 1000,
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
	const y = 100 + row * (myHeight + 10) + columnIndex * 20;

	const cardStyle: ViewStyle = {
		borderColor: 'black',
		borderWidth: 1,
		borderRadius: 2,
		height: myHeight,
		width: myWidth,
		position: 'absolute',
		top: y,
		left: x,
		backgroundColor: Colors.white,
	};

	// We don't need an animated view if we don't animate
	if (!animationTarget) {
		return (
			<View style={cardStyle}>
				{visible && (
					<>
						<Image
							style={{ height: 20, width: 20 }}
							source={iconForSuit(card.suit, 'Colored')}
						/>
						<CustomText>
							{card.value.toString().substr(0, 1)}
						</CustomText>
					</>
				)}
			</View>
		);
	}

	// Now we do the calculation to interpolate the animation
	const getTargetRow = (move: Move) => {
		if (move.to.pile === 'play') return 1;
		if (move.to.pile === 'draw' && move.from.pile === 'draw') return -0.5;
		return 0;
	};
	const getTargetColumn = (move: Move) => {
		if (move.to.pile === 'draw') return 0;
		if (move.to.pile === 'foundation') return 3 + move.to.index;
		return move.to.index;
	};
	const targetColumn = getTargetColumn(animationTarget);
	const targetRow = getTargetRow(animationTarget);
	// We get the targetPile
	const targetPile =
		animationTarget.to.pile === 'draw'
			? game.drawPile
			: animationTarget.to.pile === 'foundation'
			? game.foundationPiles[animationTarget.to.index]
			: game.playPiles[animationTarget.to.index];
	const targetColumnIndex =
		targetPile.size + (animationTarget.amount ?? 1) - 1;

	console.log('Target is', { targetColumn, targetRow, targetColumnIndex });

	const targetX = 10 + targetColumn * (myWidth + 10);
	const targetY =
		100 + targetRow * (myHeight + 10) + (targetColumnIndex ?? 0) * 20;
	const deltaX = targetX - x;
	const deltaY = targetY - y;

	return (
		<Animated.View
			style={[
				cardStyle,
				{
					zIndex: 10,
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
			{
				<>
					<Image
						style={{ height: 20, width: 20 }}
						source={iconForSuit(card.suit, 'Colored')}
					/>
					<CustomText>
						{card.value.toString().substr(0, 1)}
					</CustomText>
				</>
			}
		</Animated.View>
	);
};
