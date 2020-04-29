import React, { useEffect, useState } from 'react';
import {
	ImageBackground,
	View,
	ActivityIndicator,
	StyleSheet,
	Animated,
	Text,
	FlatList,
} from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { AppStackParamList } from '../AppNavigator';
import { Colors, FontSize } from '../constants';
import CustomText from '../components/CustomText';
import RedButton from '../components/RedButton';
import { TouchableOpacity } from 'react-native-gesture-handler';

interface Props {
	route: RouteProp<AppStackParamList, 'Loading'>;
}

const allSuits = ['Heart', 'Club', 'Diamond', 'Spade'] as const;
type Suit = typeof allSuits[number];

const allCardTypes = [
	'Ace',
	'1',
	'2',
	'3',
	'4',
	'5',
	'6',
	'7',
	'8',
	'9',
	'10',
	'Jack',
	'Queen',
	'King',
] as const;
type CardType = typeof allCardTypes[number];

export default ({ route }: Props) => {
	const photo = route.params.photo;
	const [identifyAnimation, setIndentifyAnimation] = useState(
		new Animated.Value(0)
	);

	const [identifiedType, setIdentifiedType] = useState<CardType>('Ace');
	const [identifiedSuit, setIdentifiedSuit] = useState<Suit>('Club');

	useEffect(() => {
		setTimeout(
			() =>
				Animated.timing(identifyAnimation, {
					toValue: 1,
					duration: 300,
				}).start(),
			500
		);
	}, []);

	return (
		<ImageBackground source={photo} style={styles.container}>
			<View style={styles.spinnerContainer}>
				<ActivityIndicator size="large" />
			</View>
			<Animated.View
				style={[
					styles.identifyView,
					{
						transform: [
							{
								translateY: identifyAnimation.interpolate({
									inputRange: [0, 1],
									outputRange: [1000, 0],
								}),
							},
						],
					},
				]}
			>
				<View style={{ flexDirection: 'row' }}>
					<CustomText
						style={{ margin: 20 }}
						fontSize={FontSize.header}
					>
						Er dette {identifiedSuit} {identifiedType}?
					</CustomText>
				</View>
				<View style={{ flexDirection: 'row' }}>
					{allSuits.map(suit => (
						<RedButton
							key={suit}
							fontSize={12}
							style={{
								flex: 1,
								margin: 5,
								backgroundColor:
									suit === identifiedSuit
										? Colors.green
										: Colors.black,
							}}
							title={suit}
							onPress={() => setIdentifiedSuit(suit)}
						/>
					))}
				</View>
				<FlatList
					data={allCardTypes}
					keyExtractor={v => v}
					renderItem={({ item }) => (
						<TouchableOpacity
							key={item}
							onPress={() => setIdentifiedType(item)}
							style={{ padding: 10, flexDirection: 'row' }}
						>
							<CustomText textAlign="left">{item}</CustomText>
							<View
								style={{
									height: 30,
									width: 30,
									borderRadius: 15,
									backgroundColor:
										item === identifiedType
											? Colors.green
											: Colors.black,
								}}
							/>
						</TouchableOpacity>
					)}
				/>
			</Animated.View>
		</ImageBackground>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	spinnerContainer: {
		height: 80,
		width: 80,
		borderRadius: 10,
		backgroundColor: Colors.white,
		justifyContent: 'center',
		alignItems: 'center',
	},
	identifyView: {
		borderTopLeftRadius: 10,
		borderTopRightRadius: 10,
		backgroundColor: Colors.white,
		width: '100%',
		position: 'absolute',
		left: 0,
		bottom: 0,
		top: 300,
	},
});
