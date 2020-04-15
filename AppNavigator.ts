import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import Main from './screens/Main';

const stack = createSwitchNavigator({
	Main,
});

export default createAppContainer(stack);
