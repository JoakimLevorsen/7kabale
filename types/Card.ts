export const allSuits = ['Hearts', 'Clubs', 'Diamonds', 'Spades'] as const;
export type Suit = typeof allSuits[number];

export const allCardTypes = [
	'Ace',
	2,
	3,
	4,
	5,
	6,
	7,
	8,
	9,
	10,
	'Jack',
	'Queen',
	'King',
] as const;
export type CardType = typeof allCardTypes[number];

export interface Card {
	suit: Suit;
	value: CardType;
}

export const suitIcons = [
	require('../assets/heartWhite.png'),
	require('../assets/clubsWhite.png'),
	require('../assets/diamondsWhite.png'),
	require('../assets/spadesWhite.png'),
];

export const iconForSuit = (
	suit: Suit,
	color: 'White' | 'Colored' = 'White'
) => {
	switch (suit) {
		case 'Club':
			return color === 'White'
				? require('../assets/clubsWhite.png')
				: require('../assets/clubsBlack.png');
		case 'Diamond':
			return color === 'White'
				? require('../assets/diamondsWhite.png')
				: require('../assets/diamondsRed.png');
		case 'Heart':
			return color === 'White'
				? require('../assets/heartWhite.png')
				: require('../assets/heartRed.png');
		case 'Spade':
			return color === 'White'
				? require('../assets/spadesWhite.png')
				: require('../assets/spadesBlack.png');
	}
};
