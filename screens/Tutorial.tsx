import React from 'react';
import RedButton from '../components/RedButton';
import { SafeAreaView } from 'react-navigation';
import { Colors, FontSize } from '../constants';
import CardView from '../components/TutorialCardView';
import CustomText from '../components/CustomText';
import Spacer from '../components/Spacer';
import { Animated, Dimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppStackParamList } from '../AppNavigator';
import * as SecureStore from 'expo-secure-store';

export type TutorialNavigationProp = StackNavigationProp<
	AppStackParamList,
	'Tutorial'
>;

interface Props {
	navigation: TutorialNavigationProp;
}
/* TODO:
- Ikke al teksten "Introduktion"/"Quick Tutorial" bliver vist
- Ikke al teksten "Tag et billede af din kabale" bliver vist
*/

export default class Tutorial extends React.Component<Props> {
	state = {
		firstCardAnim: new Animated.Value(0),
		secondCardAnim: new Animated.Value(0),
		thirdCardAnim: new Animated.Value(0),
		fourthCardAnim: new Animated.Value(0),
		animationState: 1,
	};

	componentDidMount = () => {
		SecureStore.setItemAsync('hasBeenShown', 'true').catch(e =>
			console.log('Tutorial state save error:', e)
		);

		Animated.timing(this.state.firstCardAnim, {
			toValue: 1,
			duration: 300,
		}).start();
	};

	render = () => {
		const {
			firstCardAnim,
			secondCardAnim,
			thirdCardAnim,
			fourthCardAnim,
		} = this.state;

		return (
			<SafeAreaView
				style={{
					flex: 1,
					backgroundColor: Colors.green,
					padding: 20,
					alignItems: 'center',
				}}
			>
				<CustomText
					style={{ margin: 20 }}
					fontSize={FontSize.title}
					color={Colors.white}
					flex={0}
				>
					Introduction
				</CustomText>
				<CardView
					number={1}
					text="Take a picture of your solitaire game"
					image={require('../assets/cameraRed.png')}
					animation={firstCardAnim}
					outputRange={[500, 0, -60]}
				/>
				<CardView
					number={2}
					text="Confirm that the entire solitaire game is visible"
					image={require('../assets/eyeRed.png')}
					animation={secondCardAnim}
					outputRange={[500, 0, -60]}
				/>
				<CardView
					number={3}
					text="Make sure there's a proper distance between cards"
					image={require('../assets/eyeRed.png')}
					centerImage={require('../assets/cardInstructions.jpg')}
					animation={thirdCardAnim}
					outputRange={[500, 0, -60]}
				/>
				<CardView
					number={4}
					text="Do as the app recommends"
					image={require('../assets/gavelRed.png')}
					animation={fourthCardAnim}
					outputRange={[500, 0, -60]}
				/>
				<Spacer
					flex={1}
					minHeight={Dimensions.get('screen').height * 0.7}
				/>
				<RedButton
					style={{ marginTop: 20 }}
					title={this.state.animationState >= 3 ? 'Done' : 'Next'}
					onPress={() => {
						const animationState = this.state.animationState + 1;
						switch (animationState) {
							case 1:
								Animated.timing(firstCardAnim, {
									toValue: 1,
									duration: 300,
								}).start();
								break;
							case 2:
								Animated.parallel([
									Animated.timing(firstCardAnim, {
										toValue: 2,
										duration: 300,
									}),
									Animated.timing(secondCardAnim, {
										toValue: 1,
										duration: 300,
									}),
								]).start();
								break;
							case 3:
								Animated.parallel([
									Animated.timing(secondCardAnim, {
										toValue: 2,
										duration: 300,
									}),
									Animated.timing(thirdCardAnim, {
										toValue: 1,
										duration: 300,
									}),
								]).start();
								break;
							case 4:
								Animated.parallel([
									Animated.timing(thirdCardAnim, {
										toValue: 2,
										duration: 300,
									}),
									Animated.timing(fourthCardAnim, {
										toValue: 1,
										duration: 300,
									}),
								]).start();
								break;
							case 5:
								this.props.navigation.navigate('Main');
						}
						this.setState({ animationState });
					}}
				/>
			</SafeAreaView>
		);
	};
}
