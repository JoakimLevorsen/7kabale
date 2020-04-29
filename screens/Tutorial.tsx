import React from 'react';
import RedButton from '../components/RedButton';
import { SafeAreaView } from 'react-navigation';
import { Colors, FontSize } from '../constants';
import CardView from '../components/CardView';
import CustomText from '../components/CustomText';
import Spacer from '../components/Spacer';
import { Animated, Dimensions } from 'react-native';
import { StackNavigationProp } from '@react-navigation/stack';
import { AppStackParamList } from '../AppNavigator';

export type TutorialNavigationProp = StackNavigationProp<
	AppStackParamList,
	'Tutorial'
>;

interface Props {
	navigation: TutorialNavigationProp;
}
/* TODO:
- Ikke al teksten "Introduktion"/"Quick Tutorial" bliver vist
- Ovenstående gælder også for "Tag et billede af din kabale" teksten
- Alle anim's måtte gerne hæves lidt over knappen og tættere på overskrift/titel
- Tilføj start-oversigt over de 3 trin ala Figma
*/

export default class Tutorial extends React.Component<Props> {
	state = {
		firstCardAnim: new Animated.Value(0),
		secondCardAnim: new Animated.Value(0),
		thirdCardAnim: new Animated.Value(0),
		animationState: 0,
	};

	render = () => {
		const { firstCardAnim, secondCardAnim, thirdCardAnim } = this.state;

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
					Introduktion
				</CustomText>
				<CardView
					number={1}
					text="Tag et billede af din kabale"
					image={require('../assets/cameraRed.png')}
					animation={firstCardAnim}
					outputRange={[500, 0, -60]}
				/>
				<CardView
					number={2}
					text="Bekræft kabalen er synlig"
					image={require('../assets/eyeRed.png')}
					animation={secondCardAnim}
					outputRange={[500, 0, -60]}
				/>
				<CardView
					number={3}
					text="Gør som appen anbefaler"
					image={require('../assets/gavelRed.png')}
					animation={thirdCardAnim}
					outputRange={[500, 0, -60]}
				/>
				<Spacer
					flex={1}
					minHeight={Dimensions.get('screen').height * 0.7}
				/>
				<RedButton
					style={{ marginTop: 20 }}
					title="Næste"
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
								this.props.navigation.navigate('Main');
						}
						this.setState({ animationState });
					}}
				/>
			</SafeAreaView>
		);
	};
}
