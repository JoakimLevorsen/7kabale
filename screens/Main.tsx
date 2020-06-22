import React, { useState, useEffect } from 'react';
import {
	View,
	StyleSheet,
	Image,
	TouchableOpacity,
	Text,
	Dimensions,
	ActivityIndicator,
	Button,
} from 'react-native';
import { Camera } from 'expo-camera';
import { useNavigation } from '@react-navigation/native';
import { NavStack } from '../AppNavigator';
import * as SecureStore from 'expo-secure-store';
import Tutorial from './Tutorial';
import RedButton from '../components/RedButton';
import Colors from '../constants/Colors';
import {
	doImage,
	doTensor,
	_model,
	tensorFromServer,
} from '../scripts/tensorTools';
import { cameraWithTensors } from '@tensorflow/tfjs-react-native';
import { Tensor3D, tensor4d, Tensor4D, tensor1d } from '@tensorflow/tfjs';
import { wait } from '../scripts/wait';

const TensorCamera = cameraWithTensors(Camera);

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
			SecureStore.getItemAsync('hasBeenShown')
				.then(info => {
					if (info !== 'true') {
						navigation.navigate('Tutorial');
					}
				})
				.catch(e => console.log('Main (Tutorial state) error', e));
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
				// cameraTextureHeight={1920}
				// cameraTextureWidth={1080}
				// resizeHeight={500}
				// resizeWidth={500}
				// resizeDepth={3}
				// onReady={images => {
				// 	const loop = async () => {
				// 		console.log('Doing');
				// 		await wait(1000);
				// 		// if (_model !== null) {
				// 		const nextImageTensor = images.next().value as Tensor3D;
				// 		const raw = await nextImageTensor.toInt().array();
				// 		console.log('raw is', [
				// 			raw.length,
				// 			raw[0].length,
				// 			raw[0][0].length,
				// 		]);
				// 		const combined = tensor4d(
				// 			[raw],
				// 			[1, 500, 500, 3],
				// 			'int32'
				// 		);
				// 		doTensor(combined);
				// 		// console.log('slice is', pureData.slice(0, 100));
				// 		// console.log('')
				// 		// We transform this array into the correct size
				// 		// console.log(
				// 		// 	'got tensor',
				// 		// 	JSON.stringify(nextImageTensor.dataSync())
				// 		// );
				// 		return;

				// 		await doImage(nextImageTensor);
				// 		// } else console.log('ignoring for now');
				// 		// requestAnimationFrame(loop)
				// 	};
				// 	loop();
				// }}
				// autorender
			>
				<View style={[styles.container, styles.buttonView]}>
					<RedButton
						// padding={10}
						style={styles.greenButton}
						title={'Tutorial'}
						onPress={() => navigation.navigate('Tutorial')}
					></RedButton>
					<TouchableOpacity
						onPress={async () => {
							let photo = await camera?.takePictureAsync({
								base64: true,
							})!;
							// console.log('Started tensorflow', photo.uri);
							// doImage(photo).catch((e: Error) =>
							// 	console.error('Network error', e.message)
							// );
							// console.log('Did');
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
		justifyContent: 'space-between',
	},
	cameraImage: {
		width: 100,
		height: 100,
		marginBottom: 20,
	},
	greenButton: {
		marginTop: 40,
		backgroundColor: Colors.green,
		width: 125,
		// height: 25,
	},
});
