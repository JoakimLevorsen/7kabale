import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import { Camera } from 'expo-camera';

let camera: Camera | null = null;
export default () => {
	const [hasPermission, setHasPermission] = useState<boolean | null>(null);

	useEffect(() => {
		(async () => {
			const { status } = await Camera.requestPermissionsAsync();
			setHasPermission(status === 'granted');
		})();
	}, []);

	if (hasPermission === null) {
		return <View />;
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
							let photo = await camera?.takePictureAsync();
							//TODO Fix something here
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
