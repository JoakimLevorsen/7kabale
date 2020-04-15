import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Main from './screens/Main';
import Tutorial from './screens/Tutorial';
import ChoozPic from './screens/ChoozPic';

const stack = createSwitchNavigator({
	Main,
	Tutorial,
	ChoozPic,
});

export default createAppContainer(stack);
