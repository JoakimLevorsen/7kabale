import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Main from './screens/Main';
import Tutorial from './screens/Tutorial';

const stack = createSwitchNavigator({
	Main,
	Tutorial,
});

export default createAppContainer(stack);
