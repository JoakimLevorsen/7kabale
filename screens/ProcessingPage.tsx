import React, { useEffect, useState } from 'react';
import {
	ImageBackground,
	View,
	ActivityIndicator,
	StyleSheet,
	Animated,
	FlatList,
	Image,
} from 'react-native';
import { RouteProp, useNavigation } from '@react-navigation/native';
import { AppStackParamList, NavStack } from '../AppNavigator';
import { Colors, FontSize } from '../constants';
import CustomText from '../components/CustomText';
import { TouchableOpacity } from 'react-native-gesture-handler';
import {
	CardType,
	Suit,
	allSuits,
	allCardTypes,
	suitIcons,
} from '../types/Card';

interface Props {
	route: RouteProp<AppStackParamList, 'Loading'>;
}

export default ({ route }: Props) => {
	const photo = route.params.photo;
	const [identifyAnimation, setIndentifyAnimation] = useState(
		new Animated.Value(0)
	);
	const navigation = useNavigation<NavStack>();

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
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						marginBottom: 10,
					}}
				>
					<CustomText
						style={{ margin: 20 }}
						fontSize={FontSize.header}
						textAlign="left"
					>
						Er dette {identifiedSuit} {identifiedType}?
					</CustomText>
					<TouchableOpacity
						style={{
							height: 40,
							width: 40,
							justifyContent: 'center',
							alignItems: 'center',
							backgroundColor: Colors.black,
							borderRadius: 20,
							marginRight: 10,
						}}
						onPress={() => navigation.navigate('GameGuidePage')}
					>
						<Image
							source={require('../assets/arrowForwardWhite.png')}
						/>
					</TouchableOpacity>
				</View>
				<View
					style={{
						flexDirection: 'row',
						marginHorizontal: 15,
						justifyContent: 'space-between',
					}}
				>
					{allSuits.map((suit, index) => (
						<TouchableOpacity
							key={suit}
							style={{
								height: 70,
								width: 70,
								justifyContent: 'center',
								alignItems: 'center',
								backgroundColor:
									suit === identifiedSuit
										? Colors.green
										: Colors.black,
								borderRadius: 35,
								marginRight: 10,
							}}
							onPress={() => setIdentifiedSuit(suit)}
						>
							<Image
								style={{ height: 50, width: 50 }}
								source={suitIcons[index]}
							/>
						</TouchableOpacity>
					))}
				</View>
				<FlatList
					style={{ marginHorizontal: 10 }}
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
									height: 40,
									width: 40,
									borderRadius: 20,
									backgroundColor:
										item === identifiedType
											? Colors.green
											: Colors.black,
								}}
							>
								{item === identifiedType && (
									<Image
										source={require('../assets/checkWhite.png')}
									/>
								)}
							</View>
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
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		backgroundColor: Colors.white,
		width: '100%',
		position: 'absolute',
		left: 0,
		bottom: 0,
		top: 300,
	},
});
