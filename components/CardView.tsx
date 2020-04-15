import React from 'react';
import {
	Animated,
	StyleSheet,
	View,
	Image,
	ImageProps,
	Dimensions,
} from 'react-native';
import { Colors, FontSize } from '../constants';
import Spacer from './Spacer';
import CustomText from './CustomText';

interface Props {
	text: string;
	number: number;
	image: ImageProps['source'];
	animation: Animated.Value;
	outputRange: [number, number, number];
}

export default ({ text, image, animation, outputRange, number }: Props) => (
	<Animated.View
		style={[
			styles.container,
			{
				transform: [
					{
						translateX: animation.interpolate({
							inputRange: [0, 1, 2],
							outputRange,
						}),
					},
				],
			},
		]}
	>
		<View
			style={{
				flexDirection: 'row',
				flex: 1,
				height: 50,
			}}
		>
			<View
				style={{
					flexDirection: 'column',
					flex: 0,
					height: 80,
				}}
			>
				<CustomText fontSize={FontSize.header} color={Colors.red}>
					{number}
				</CustomText>
				<Image source={image} />
			</View>
			<Spacer />
		</View>
		<CustomText flex={0} fontSize={FontSize.header} color={Colors.red}>
			{text}
		</CustomText>
		<View
			style={{
				flexDirection: 'row',
				flex: 1,
				height: 50,
				transform: [{ rotate: '180deg' }],
			}}
		>
			<View style={{ flexDirection: 'column', height: 80 }}>
				<CustomText fontSize={FontSize.header} color={Colors.red}>
					{number}
				</CustomText>
				<Image source={image} />
			</View>
			<Spacer />
		</View>
	</Animated.View>
);

const styles = StyleSheet.create({
	container: {
		position: 'absolute',
		aspectRatio: 300 / 460,
		maxWidth: '80%',
		top: 150,
		backgroundColor: Colors.white,
		display: 'flex',
		borderRadius: 20,
		shadowColor: '#000000',
		shadowOpacity: 0.25,
		shadowOffset: { height: 4, width: 0 },
		padding: 10,
		height: Dimensions.get('screen').height * 0.7,
	},
});
