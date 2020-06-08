import React, { useState, useEffect } from 'react';
import {
	View,
	StyleSheet,
	Image,
	TouchableOpacity,
	Text,
	Dimensions,
	ActivityIndicator,
} from 'react-native';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { NavStack } from '../AppNavigator';
import * as SecureStore from 'expo-secure-store';
import Tutorial from './Tutorial';

/* TODO:
- Lav en simpel loading anim der popper op onpress før navigation (der går lige et sekund inden skærmskifte)
- For some reason virker det kamera-view man ser at være lidt underligt stretched/distorted
*/
let camera: Camera | null = null;
export default () => {
	const [hasPermission, setHasPermission] = useState<boolean | null>(null);
	const navigation = useNavigation<NavStack>();

	useEffect(() => {
		(async () => {
			await SecureStore.getItemAsync('hasBeenShown').then(info => {
				if (info !== 'true') {
					navigation.navigate('Tutorial');
				}
			});
			const { status } = await Camera.requestPermissionsAsync();
			setHasPermission(status === 'granted');
		})();
	}, []);

	if (hasPermission === null) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
				}}
			>
				<ActivityIndicator size="large" />
			</View>
		);
	}
	if (hasPermission === false) {
		return <Text>No access to camera!</Text>;
	}

	return (
		<View style={styles.container}>
			<Camera
				style={styles.container}
				type={Camera.Constants.Type.back}
				ref={ref => {
					camera = ref;
				}}
			>
				<View style={[styles.container, styles.buttonView]}>
					<TouchableOpacity
						onPress={async () => {
							let photo = await camera?.takePictureAsync()!;
							navigation.navigate('ChoozPic', { photo });
						}}
					>
						<Image
							source={require('../assets/cameraButton.png')}
							style={styles.cameraImage}
						></Image>
					</TouchableOpacity>
				</View>
			</Camera>
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
	},
	buttonView: {
		justifyContent: 'flex-end',
	},
	cameraImage: {
		width: 100,
		height: 100,
		marginBottom: 20,
	},
});
