import { Card } from '../types/Card';
import { Game, DrawPile } from './suggestMove';

interface Box {
	top: number;
	bottom: number;
	left: number;
	right: number;
}

interface CardGuess extends Box {
	values: Array<
		| { confidence: number; card: Card; back: false }
		| { confidence: number; back: true }
	>;
}

export const tensorToGame = (input: CardGuess[]): Game => {
	// We don't know how the cards are oriented, but we assume between -30 and 30 ish degrees. First we determine the size of our play area
	const playArea = getPlayArea(input);
	const normalizer = getNormalizer(playArea);
	const normalized = input.map(card => normalizer(card));
	// Now with the normalized board we can start looking for axes in the cards

	const columnsAmount = getColumns(
		normalized,
		playArea.right - playArea.left
	);
	const columns: CardGuess[][] = Array(columnsAmount).fill([]);
	// The width of a row is 1/7 of the total playArea
	const verticalWidth = (playArea.right - playArea.left) / columnsAmount;
	// Now we assign the cards to the appropriate row
	for (const card of normalized) {
		const targetColumn = card.left % verticalWidth;
		// TODO: Add/Remove margins here to ensure that cards end up in the correct column
		columns[targetColumn].push(card);
	}

	// Now we extract all the draw/foundation cards to their own collection
	const foundationRow: Array<null | CardGuess> = Array(columnsAmount).fill(
		null
	);
	for (const [index, pile] of columns.entries()) {
		// If the top of the card is within 10% of the top of the image, we assume it's foundational
		// TODO: Modify so it uses size of cards to change the top margin value.
		const topMargin = (playArea.bottom - playArea.top) / 10;
		if (pile[0]?.top && pile[0]?.top <= topMargin) {
			foundationRow[index] = pile.splice(0, 1)[0];
		}
	}

	// Now we have all the cards assigned, and can make a Game with them
	// We assign the top of the draw pile to the first card, unless it's a back card, then we do the second
	const drawPile = new DrawPile(getDrawPile(foundationRow) ?? undefined);
};

const getPlayArea = (input: CardGuess[]): Box => {
	type opNum = number | undefined;
	let minTop: opNum, maxBottom: opNum, minLeft: opNum, maxRight: opNum;
	for (const { top, bottom, left, right } of input) {
		if (!minTop || top < minTop) minTop = top;
		if (!maxBottom || bottom < maxBottom) maxBottom = bottom;
		if (!minLeft || left < minLeft) minLeft = left;
		if (!maxRight || right < maxRight) maxRight = right;
	}
	if (!minTop || !maxBottom || !minLeft || !maxRight)
		throw new Error('No cards detected');
	return {
		top: minTop,
		bottom: maxBottom,
		left: minLeft,
		right: maxRight,
	};
};

const getNormalizer = ({ top: deltaTop, left: deltaLeft }: Box) => ({
	top,
	bottom,
	right,
	left,
	values,
}: CardGuess) => ({
	// We only need to move with top and left, since the size of the card has not changed, just position
	top: top - deltaTop,
	bottom: bottom - deltaTop,
	left: left - deltaLeft,
	right: right - deltaLeft,
	values: values?.sort((a, b) => a.confidence - b.confidence),
});

const getColumns = (cards: CardGuess[], playWidth: number): number => {
	// We try to assert the relative size of the cards to the width of the playArea. If a back is present, we use the width of it as a base. Otherwise we assume the logo found is approx 1/6 of the card width
	const back = cards.find(card =>
		card.values?.find(potential => potential.back)
	);
	if (back) {
		// We maximum return 7
		return Math.min(playWidth / (back.right - back.left), 7);
	}
	const any = cards.find(card =>
		card.values?.find(potential => !potential.back)
	);
	if (any) {
		return Math.min(playWidth / ((any.right - any.left) * 6), 7);
	}
	throw new Error('No cards sent');
};

const getDrawPile = (
	from: Array<null | CardGuess>
): [CardGuess] | undefined => {
	const [first, second] = from;
	if (first && first.values?.[0]?.back !== true) {
		return [first];
	}
	if (second && second.values?.[0]?.back !== true) {
		return [second];
	}
};
