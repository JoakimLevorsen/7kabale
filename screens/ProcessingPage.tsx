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

interface Props {
	route: RouteProp<AppStackParamList, 'Loading'>;
}

interface UnsureCard {
	estimated: Card;
	top: number;
	bottom: number;
	left: number;
	right: number;
}

const initualUnsureCards: UnsureCard[] = [
	{
		estimated: { suit: 'Club', value: 9 },
		top: 100,
		bottom: 200,
		left: 100,
		right: 200,
	},
	{
		estimated: { suit: 'Club', value: 9 },
		top: 500,
		bottom: 700,
		left: 300,
		right: 450,
	},
];

export default ({ route }: Props) => {
	const photo = route.params.photo;
	const [identifyAnimation, setIndentifyAnimation] = useState(
		new Animated.Value(0)
	);
	const [imageAnimation] = useState(new Animated.Value(0));
	const navigation = useNavigation<NavStack>();
	const [unsureIndex, setUnsureIndex] = useState(0);
	const [unsureCards, setUnsureCards] = useState<UnsureCard[]>([
		{
			estimated: { value: 8, suit: 'Club' },
			top: 10,
			bottom: 10,
			left: 10,
			right: 10,
		},
	]);
	const [topHighlightAnimation] = useState(new Animated.Value(-5));
	const [rightHighlightAnimation] = useState(new Animated.Value(-5));
	const [heightHighlightAnimation] = useState(new Animated.Value(-5));
	const [leftHighlightAnimation] = useState(new Animated.Value(-5));

	const [identifiedType, setIdentifiedType] = useState<CardType>('Ace');
	const [identifiedSuit, setIdentifiedSuit] = useState<Suit>('Club');

	const transformCoordinates = ({
		top,
		left,
		bottom,
		right,
	}: Frame): Frame => {
		const imageSize = { height: photo.height, width: photo.width };
		const screenSize = Dimensions.get('window');
		const heightRatio = screenSize.height / imageSize.height;
		const widthRatio = screenSize.width / imageSize.width;
		if (heightRatio === widthRatio) {
			// If this is the case, we just "scale" the coordinates, since the image perfectly fits the screen
			return {
				top: top & heightRatio,
				left: left * widthRatio,
				bottom: bottom * heightRatio,
				right: right * widthRatio,
			};
		} else if (heightRatio > widthRatio) {
			// This means that this image is taller than the screen, so we add side padding to compensate
			const expectedWidth =
				(screenSize.height / imageSize.height) * imageSize.width;
			const paddingNeeded = (screenSize.width - expectedWidth) / 2;
			return {
				top: top * heightRatio,
				left: left * widthRatio + paddingNeeded,
				bottom: bottom * heightRatio,
				right: right * widthRatio + paddingNeeded,
			};
		} else {
			// This means the image is wider than the screen, so we add top and bottom padding
			const expectedHeight =
				(screenSize.width / imageSize.width) * imageSize.height;
			const paddingNeeded = (screenSize.height - expectedHeight) / 2;
			return {
				top: Math.round(top * heightRatio + paddingNeeded),
				left: Math.round(left * widthRatio),
				bottom: Math.round(bottom * heightRatio + paddingNeeded),
				right: Math.round(right * widthRatio),
			};
		}
	};

	const goToNextUnsure = () => {
		if (unsureCards.length === unsureIndex) {
			navigation.navigate('GameGuidePage');
		} else {
			const target = unsureCards[unsureIndex];
			setUnsureIndex(unsureIndex + 1);
			// We now animate the top of the view to the image
			const transformedTarget = transformCoordinates(target);
			const { top, right, bottom, left } = transformedTarget;
			console.log('width', right - left);
			console.log('height', bottom - top - 50);
			console.log('target', {
				target,
				transformedTarget,
				window: Dimensions.get('window'),
			});
			Animated.timing(imageAnimation, {
				toValue: top - 50,
				duration: 200,
			}).start();
			Animated.timing(topHighlightAnimation, {
				toValue: 50,
				duration: 200,
			}).start();
			Animated.timing(rightHighlightAnimation, {
				toValue: right,
				duration: 200,
			}).start();
			Animated.timing(heightHighlightAnimation, {
				toValue: Dimensions.get('window').height - bottom - top,
				duration: 200,
			}).start(() =>
				console.log(
					'Bottom is now',
					(heightHighlightAnimation as any)._value
				)
			);
			Animated.timing(leftHighlightAnimation, {
				toValue: left,
				duration: 200,
			}).start();
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
			<Animated.View
				style={[
					styles.cardHightligt,
					{
						top: topHighlightAnimation,
						right: rightHighlightAnimation,
						height: heightHighlightAnimation,
						left: leftHighlightAnimation,
					},
				]}
			></Animated.View>
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
						onPress={() => goToNextUnsure()}
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
					keyExtractor={v => v.toString()}
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
