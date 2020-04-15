import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { CameraCapturedPicture } from 'expo-camera';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Colors } from '../constants';
import CustomText from '../components/CustomText';

export default () => {
	const route = useRoute();

	const photo = (route.params! as any).photo as CameraCapturedPicture;
	return (
		<View style={styles.container}>
			<Image source={photo} style={styles.photo}></Image>
			<CustomText color={Colors.white} flex={0}>
				Er billedet i fokus og inkluderer alle kort?
			</CustomText>
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
		width: 200,
		height: 200,
	},
});
