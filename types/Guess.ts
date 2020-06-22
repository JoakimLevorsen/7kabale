import { Card } from './Card';

export interface Box {
	top: number;
	bottom: number;
	left: number;
	right: number;
}

export interface CardGuess extends Box {
	values: Array<
		| { confidence: number; card: Card; back: false }
		| { confidence: number; back: true }
	>;
}

export const fakeGuess = (card?: Card): CardGuess => ({
	top: 0,
	bottom: 0,
	left: 0,
	right: 0,
	values: [
		card
			? { confidence: 1, back: false, card }
			: { confidence: 1, back: true },
	],
});
