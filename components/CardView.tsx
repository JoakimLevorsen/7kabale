import React from 'react';
import { Animated, StyleSheet, View, Image, ImageProps } from 'react-native';
import { Colors, FontSize } from '../constants';
import Spacer from './Spacer';
import CustomText from './CustomText';

interface Props {
	text: string;
	image: ImageProps['source'];
}

export default ({ text, image }: Props) => (
	<Animated.View style={styles.container}>
		<View style={{ flexDirection: 'row', flex: 0, height: 50 }}>
			<View>
				<CustomText>1</CustomText>
			</View>
			<Spacer />
		</View>
		<Spacer flex={2.2} />
		<CustomText flex={0} fontSize={FontSize.header} color={Colors.red}>
			{text}
		</CustomText>
		<View
			style={{
				flexDirection: 'row',
				flex: 0,
				height: 50,
				transform: [{ rotate: '180deg' }],
			}}
		>
			<View style={{ flexDirection: 'column' }}>
				<CustomText fontSize={FontSize.header} color={Colors.red}>
					1
				</CustomText>
				<Image source={image} />
			</View>
			<Spacer />
		</View>
	</Animated.View>
);

const styles = StyleSheet.create({
	container: {
		aspectRatio: 300 / 460,
		flex: 1,
		maxWidth: '100%',
		backgroundColor: Colors.white,
		display: 'flex',
		borderRadius: 15,
		shadowColor: '#000000',
		shadowOpacity: 0.25,
		shadowOffset: { height: 4, width: 0 },
		padding: 10,
	},
});
