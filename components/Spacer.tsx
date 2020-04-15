import React from 'react';
import { View } from 'react-native';

interface Props {
	flex?: number;
	minHeight?: number;
	minWidth?: number;
}

export default ({ flex = 1, minHeight, minWidth }: Props) => (
	<View style={{ flex, minHeight, minWidth }} />
);
