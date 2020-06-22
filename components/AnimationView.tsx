import React from 'react';
import { View } from 'react-native';
import { Game } from '../scripts/suggestMove';
import CustomText from './CustomText';
import AnimationCard from './AnimationCard';
import { Colors } from '../constants';

interface Props {
	game: Game;
}

export default ({ game }: Props) => {
	const { drawPile, foundationPiles, playPiles } = game;
	const moveToShow = game.suggestMove();
	console.log('Suggested is', moveToShow);
	return (
		<View
			style={{
				backgroundColor: Colors.green,
				position: 'absolute',
				top: 0,
				bottom: 0,
				left: 0,
				right: 0,
			}}
		>
			{drawPile.top && (
				<AnimationCard
					row={0}
					column={0}
					visible
					game={game}
					card={drawPile.top!.appCard}
					animationTarget={
						moveToShow && moveToShow.from.pile === 'draw'
							? moveToShow
							: undefined
					}
				/>
			)}
			{foundationPiles.map(
				(pile, i) =>
					pile.top! && (
						<AnimationCard
							row={0}
							column={3 + i}
							key={`f${i}`}
							card={pile.top!.appCard}
							visible
							game={game}
							animationTarget={
								moveToShow &&
								moveToShow.from.pile === 'foundation'
									? moveToShow
									: undefined
							}
						/>
					)
			)}
			{playPiles.map((pile, pileIndex) =>
				pile.content.map((card, cardIndex) => (
					<AnimationCard
						row={1}
						column={pileIndex}
						card={card.appCard}
						key={`p${pileIndex}${cardIndex}`}
						columnIndex={cardIndex}
						game={game}
						visible={card.visible}
						animationTarget={
							moveToShow &&
							moveToShow.from.pile === 'play' &&
							moveToShow.from.index === pileIndex &&
							(moveToShow.amount
								? cardIndex >=
								  pile.content.length - moveToShow.amount
								: cardIndex === pile.content.length - 1)
								? moveToShow
								: undefined
						}
					/>
				))
			)}
			{moveToShow === null && (
				<CustomText>Could not find a move</CustomText>
			)}
		</View>
	);
};
