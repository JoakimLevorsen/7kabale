import React, { useEffect } from 'react';
import AppNavigator from './AppNavigator';
import { StatusBar } from 'react-native';
import firebase from 'firebase';
import { firebaseConfig } from './config';
// import * as tf from '@tensorflow/tfjs';
// import '@tensorflow/tfjs-react-native';
// import { getModel } from './scripts/tensorTools';

export default () => {
	useEffect(() => {
		StatusBar.setBarStyle('light-content');
		firebase.initializeApp(firebaseConfig);
		if (firebase.auth().currentUser === null) {
			firebase.auth().signInAnonymously();
		}
		// tf.ready()
		// 	.then(() => {
		// 		console.log('noice');
		// 		// getModel()
		// 		// 	.then(() => 'Got model')
		// 		// 	.catch(e => console.error('model', e));
		// 	})
		// 	.catch(e => console.error('tensor', e));
	}, []);

	return <AppNavigator />;
};
