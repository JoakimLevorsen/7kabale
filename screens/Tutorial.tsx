import React from 'react';
import RedButton from '../components/RedButton';
import { SafeAreaView } from 'react-navigation';
import { Colors, FontSize } from '../constants';
import CardView from '../components/CardView';
import CustomText from '../components/CustomText';
import Spacer from '../components/Spacer';

export default class Tutorial extends React.Component {
	render = () => (
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
				Quick tutorial
			</CustomText>
			<Spacer flex={0.1} />
			<CardView
				text="Tag et billede af din kabale"
				image={require('../assets/eyeRed.png')}
			/>
			<Spacer flex={0.1} />
			<RedButton
				style={{ marginTop: 20 }}
				title="Knappen"
				onPress={() => {}}
			/>
		</SafeAreaView>
	);
}
