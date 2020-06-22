import {
	fetch,
	decodeJpeg,
	bundleResourceIO,
} from '@tensorflow/tfjs-react-native';
import * as tf from '@tensorflow/tfjs';
import { CameraCapturedPicture } from 'expo-camera';
// TODO: Replace with model
import * as mobilenet from '@tensorflow-models/mobilenet';
import { Tensor3D, Tensor } from '@tensorflow/tfjs';
import axios from 'axios';

export let _model: tf.GraphModel | null = null;

export const getModel = async () => {
	if (_model) return _model;
	// _model =await  mobilenet.load()
	const modelJSON = await require('../assets/AI/model.json');
	const modelWeights = await require('../assets/AI/group1-shard1of1.bin');
	// console.log('Weight is', modelWeights);
	console.log('Starting download');
	// _model = await tf.loadGraphModel('http://10.0.0.100/model.json');
	_model = await tf.loadGraphModel(bundleResourceIO(modelJSON, modelWeights));
	// _model = await mobilenet.load()
	// console.log('downloaded', _model.inputs);
	// await _model.load();
	// console.log('Did load');
	return _model;
};

export const doImage = async (image: CameraCapturedPicture) => {
	try {
		const response = await fetch(image.uri, undefined, { isBinary: true });
		const imageData = await response.arrayBuffer();
		const imageTensor = decodeJpeg(imageData as Uint8Array);
		// const prediction = await (await getModel()).classify(imageTensor)
		// const prediction = await (await getModel()).predict(imageTensor);
		// console.log('We predict', prediction);
		console.log('Got imageTensor', imageTensor);
	} catch (e) {
		console.error('Got tensorflow error', e);
	}
};

export const tensorFromServer = async (photo: CameraCapturedPicture) => {
	console.log('Contacting server', photo.base64 !== undefined);
	const preTest = await window
		.fetch('130.225.170.238:8501')
		.catch(e => console.log('J', JSON.stringify(e)));
	console.log('pre', JSON.stringify(preTest));

	// const response = await window.fetch(
	// 	'130.225.170.238:8501/v1/models/half_plus_two:classify',
	// 	{

	// 		examples: [{ image: { b64: photo.base64 } }],
	// 	}
	// );
	// console.log('Got response', response);
};

export const doTensor = async (tensor: Tensor) => {
	const output: string[] = ['', '', '', ''];
	// const prediction = await (await getModel()).executeAsync(tensor);
	console.log(
		'Test',
		JSON.stringify(
			await window.fetch(
				'http://130.225.170.238:8501/v1/models/half_plus_two/metadata'
			)
		)
	);
	console.log('did fetch');
	const raw = await tensor.data();
	// const response = await window.fetch(
	// 	'130.225.170.238:8501/v1/models/half_plus_two:classify',
	// 	{

	// 		instances: raw,
	// 	}
	// );
	const response = await window.fetch(
		'http://130.225.170.238:8501/v1/models/half_plus_two:predict',
		{
			method: 'POST',
			body: JSON.stringify({
				instances: raw,
			}),
		}
	);
	console.log('Got response', JSON.stringify(response));
	// console.log('We predict', JSON.stringify(prediction));
	// console.log('also', output);
};
// fetch(image.uri, undefined, { isBinary: true }).then(({ arrayBuffer }) =>
// 	arrayBuffer().then(buff =>
// 		getModel().then(model => model.classify(decodeJpeg(buff)))
// 	)
// );
