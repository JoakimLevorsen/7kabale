import React, { useEffect } from 'react';
// import { StyleSheet, Text, View } from 'react-native';
import AppNavigator from './AppNavigator';
import { StatusBar } from 'react-native';

export default () => {
	useEffect(() => {
		StatusBar.setBarStyle('light-content');
	}, []);

	return <AppNavigator />;
};

// const styles = StyleSheet.create({
// 	container: {
// 		flex: 1,
// 		backgroundColor: '#fff',
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 	},
// });
