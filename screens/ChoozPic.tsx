import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { useNavigation, RouteProp } from '@react-navigation/native';
import { Colors } from '../constants';
import CustomText from '../components/CustomText';
import RedButton from '../components/RedButton';
import { AppStackParamList } from '../AppNavigator';

/* TODO:
- Ikke al teksten "Er billedet i fokus..." bliver vist
*/

interface Props {
	route: RouteProp<AppStackParamList, 'ChoozPic'>;
}

export default ({ route }: Props) => {
	const navigation = useNavigation();

	const photo = route.params.photo;
	return (
		<View style={styles.container}>
			<Image source={photo} style={styles.photo}></Image>
			<CustomText style={styles.amazingText}>
				Is the picture in focus and does it include all cards?
			</CustomText>
			<View style={styles.horizontalView}>
				<RedButton
					style={styles.smallerButtons}
					title="NO"
					onPress={() => {
						navigation.navigate('Main');
					}}
				/>
				<RedButton
					style={styles.smallerButtons}
					title="YES"
					onPress={() => navigation.navigate('Loading', { photo })}
				/>
			</View>
		</View>
	);
};

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		display: 'flex',
		alignItems: 'center',
		width: '100%',
		flex: 1,
		backgroundColor: Colors.green,
	},
	photo: {
		flex: 10,
		aspectRatio: 3 / 4,
		marginTop: 30,
	},
	amazingText: {
		color: Colors.white,
		flex: 1,
		marginTop: 20,
	},
	horizontalView: {
		flexDirection: 'row',
		marginLeft: 30,
	},
	smallerButtons: {
		minWidth: 50,
		flex: 1,
		marginRight: 30,
		marginBottom: 30,
	},
});
