import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { CameraCapturedPicture } from 'expo-camera';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Colors } from '../constants';
import CustomText from '../components/CustomText';
import RedButton from '../components/RedButton';
import Spacer from '../components/Spacer';

/* TODO:
- Check-text viser ikke hele string ("Er billedet i fokus...") (Fixed?)
- "JA" Knap impl. mangler
*/
export default () => {
	const route = useRoute();
	const navigation = useNavigation();

	const photo = (route.params! as any).photo as CameraCapturedPicture;
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
				<Spacer flex={1} minHeight={5} minWidth={5}></Spacer>
				<RedButton
					style={styles.smallerButtons}
					title="JA"
					onPress={() => {
						console.log('JA, IMPLEMENTER MIG LIGE');
					}}
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
		margin: 40,
	},
	amazingText: {
		color: Colors.white,
		flex: 1,
	},
	horizontalView: {
		flexDirection: 'row',
	},
	smallerButtons: {
		minWidth: 100,
		flex: 10,
		margin: 10,
	},
});
