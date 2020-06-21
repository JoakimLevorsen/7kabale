import React, { useEffect, useState } from 'react';
import {
	View,
	ActivityIndicator,
	StyleSheet,
	Animated,
	FlatList,
	Image,
	Dimensions,
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
	Card,
} from '../types/Card';
import firebase from 'firebase';
import 'firebase/storage';
import { v1 as uuid } from 'uuid';
import { Frame } from '../types/Frame';
import SelectionItem from '../components/SelectionItem';

interface Props {
	route: RouteProp<AppStackParamList, 'Loading'>;
}

interface UnsureCard {
	estimated: Card;
	x: number;
	y: number;
	height: number;
	width: number;
}

const initualUnsureCards: UnsureCard[] = [
	{
		estimated: { suit: 'Club', value: 9 },
		x: 100,
		y: 500,
		height: 300,
		width: 600,
	},
	{
		estimated: { suit: 'Club', value: 9 },
		x: 800,
		y: 800,
		height: 300,
		width: 200,
	},
];

export default ({ route }: Props) => {
	const photo = route.params.photo;

	// Transform image space, to screen space
	const transformCoordinates = ({ x, y, height, width }: Frame): Frame => {
		const imageSize = { height: photo.height, width: photo.width };
		const screenSize = Dimensions.get('window');
		const heightRatio = screenSize.height / imageSize.height;
		const widthRatio = screenSize.width / imageSize.width;
		if (heightRatio === widthRatio) {
			// If this is the case, we just "scale" the coordinates, since the image perfectly fits the screen
			return {
				x: x * heightRatio,
				y: y * widthRatio,
				height: height * heightRatio,
				width: width * widthRatio,
			};
		} else if (heightRatio > widthRatio) {
			// This means that this image is taller than the screen, so we add side padding to compensate
			const expectedWidth =
				(screenSize.height / imageSize.height) * imageSize.width;
			const paddingNeeded = (screenSize.width - expectedWidth) / 2;
			return {
				x: x * heightRatio,
				y: y * widthRatio + paddingNeeded,
				height: height * heightRatio,
				width: width * widthRatio + paddingNeeded,
			};
		} else {
			// This means the image is wider than the screen, so we add top and bottom padding
			const expectedHeight =
				(screenSize.width / imageSize.width) * imageSize.height;
			const paddingNeeded = (screenSize.height - expectedHeight) / 2;
			return {
				x: Math.round(x * heightRatio + paddingNeeded),
				y: Math.round(y * widthRatio),
				height: Math.round(height * heightRatio + paddingNeeded),
				width: Math.round(width * widthRatio),
			};
		}
	};

	const [identifyAnimation] = useState(new Animated.Value(0));
	const [imageAnimation] = useState(new Animated.Value(0));
	const navigation = useNavigation<NavStack>();
	const [unsureIndex, setUnsureIndex] = useState(0);
	const [unsureCards, setUnsureCards] = useState<UnsureCard[]>(
		initualUnsureCards.map(({ x, y, height, width, ...other }) => ({
			...transformCoordinates({ x, y, height, width }),
			...other,
		}))
	);
	const currentCard = unsureCards[unsureIndex].estimated;
	const [editMode, setEditMode] = useState(false);

	const goToNextUnsure = () => {
		if (unsureCards.length === unsureIndex + 1) {
			navigation.navigate('GameGuidePage');
		} else {
			const target = unsureCards[unsureIndex];
			setUnsureIndex(unsureIndex + 1);
			// We now animate the top of the view to the image
		}
	};

	const firebaseDestination = (endFile: string) =>
		`${firebase.auth().currentUser?.uid ?? 'NOUSER'}/${uuid()}/${endFile}`;

	const uploadToFirebase = () =>
		photo.base64
			? Promise.all([
					firebase
						.storage()
						.ref(firebaseDestination('photo.jpeg'))
						.putString(photo.base64, 'base64'),
					firebase
						.storage()
						.ref(firebaseDestination('data.json'))
						.putString(
							// FIX: Add correct object
							JSON.stringify(unsureCards)
						),
			  ])
			: Promise.reject('Invalid photo');

	const updateCurrentCard = (item: Partial<UnsureCard>) => {
		const newUnsure = [...unsureCards];
		newUnsure[unsureIndex] = {
			...newUnsure[unsureIndex],
			...item,
		};
		setUnsureCards(newUnsure);
	};

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
		<View style={styles.container}>
			<Animated.Image
				style={[
					styles.image,
					{
						transform: [
							{
								translateY: imageAnimation.interpolate({
									inputRange: [0, 1000],
									outputRange: [0, -1000],
								}),
							},
						],
					},
				]}
				source={photo}
			/>
			{/* <View style={styles.spinnerContainer}>
				<ActivityIndicator size="large" />
			</View> */}
			{unsureCards.map((uC, i) => (
				<SelectionItem
					key={i}
					position={uC}
					editable={editMode && unsureIndex === i}
					active={unsureIndex === i}
					card={uC.estimated.value}
					suit={uC.estimated.suit}
					setPosition={position => updateCurrentCard(position)}
				/>
			))}
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
						Er dette {currentCard.suit} {currentCard.value}?
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
						onPress={() =>
							setUnsureCards([
								...unsureCards,
								{
									x: 100,
									y: 100,
									height: 200,
									width: 200,
									estimated: {
										suit: 'Diamond',
										value: 'Ace',
									},
								},
							])
						}
					>
						<CustomText flex={0} color={Colors.white}>
							Add
						</CustomText>
					</TouchableOpacity>
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
						onPress={() => {
							Animated.timing(identifyAnimation, {
								toValue: editMode ? 1 : 0.5,
							}).start();
							setEditMode(!editMode);
						}}
					>
						<CustomText flex={0} color={Colors.white}>
							Edit
						</CustomText>
					</TouchableOpacity>
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
						onPress={() => goToNextUnsure()}
					>
						{unsureIndex === unsureCards.length - 1 ? (
							<Image
								source={require('../assets/checkWhite.png')}
							/>
						) : (
							<Image
								source={require('../assets/arrowForwardWhite.png')}
							/>
						)}
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
									suit === currentCard.suit
										? Colors.green
										: Colors.black,
								borderRadius: 35,
								marginRight: 10,
							}}
							onPress={() =>
								updateCurrentCard({
									estimated: {
										suit,
										value: currentCard.value,
									},
								})
							}
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
					keyExtractor={v => v.toString()}
					renderItem={({ item }) => (
						<TouchableOpacity
							key={item}
							onPress={() =>
								updateCurrentCard({
									estimated: {
										suit: currentCard.suit,
										value: item,
									},
								})
							}
							style={{ padding: 10, flexDirection: 'row' }}
						>
							<CustomText textAlign="left">{item}</CustomText>
							<View
								style={{
									height: 40,
									width: 40,
									borderRadius: 20,
									backgroundColor:
										item === currentCard.value
											? Colors.green
											: Colors.black,
								}}
							>
								{item === currentCard.value && (
									<Image
										source={require('../assets/checkWhite.png')}
									/>
								)}
							</View>
						</TouchableOpacity>
					)}
				/>
			</Animated.View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	image: {
		flex: 1,
		resizeMode: 'contain',
	},
	cardHightligt: {
		position: 'absolute',
		borderWidth: 2,
		borderColor: 'yellow',
		top: -5,
		height: Dimensions.get('window').height,
		right: -5,
		left: -5,
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
