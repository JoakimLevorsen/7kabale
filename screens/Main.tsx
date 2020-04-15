import React from 'react';
import {
	View,
	ImageBackground,
	StyleSheet,
	Image,
	TouchableOpacity,
} from 'react-native';

export default () => (
	<View style={styles.container}>
		<ImageBackground
			source={require('../assets/placeholderMainScreen.jpg')}
			style={styles.backgroundImage}
		>
			<TouchableOpacity
				onPress={() =>
					console.log('Did Work Amaze Camera Button Yes Timmy')
				}
			>
				<Image
					source={require('../assets/cameraButton.png')}
					style={styles.cameraImage}
				></Image>
			</TouchableOpacity>
		</ImageBackground>
	</View>
);

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		display: 'flex',
		alignItems: 'center',
		flex: 1,
	},

	backgroundImage: {
		width: '100%',
		height: '100%',
		justifyContent: 'flex-end',
		alignItems: 'center',
	},
	cameraImage: {
		width: 100,
		height: 100,
		marginBottom: 20,
	},
});
