import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { CameraCapturedPicture } from 'expo-camera';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { Colors } from '../constants';
import CustomText from '../components/CustomText';
import RedButton from '../components/RedButton';
import Spacer from '../components/Spacer';
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
				Er billedet i fokus og inkluderer alle kort?
			</CustomText>
			<View style={styles.horizontalView}>
				<RedButton
					style={styles.smallerButtons}
					title="NEJ"
					onPress={() => {
						navigation.navigate('Main');
					}}
				/>
				<RedButton
					style={styles.smallerButtons}
					title="JA"
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
