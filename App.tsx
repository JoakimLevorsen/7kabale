import React, { useEffect } from 'react';
import AppNavigator from './AppNavigator';
import { StatusBar } from 'react-native';
import firebase from 'firebase';
import { firebaseConfig } from './config';

export default () => {
	useEffect(() => {
		StatusBar.setBarStyle('light-content');
		firebase.initializeApp(firebaseConfig);
		if (firebase.auth().currentUser === null) {
			firebase.auth().signInAnonymously();
		}
	}, []);

	return <AppNavigator />;
};
