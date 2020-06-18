import { fetch, decodeJpeg } from '@tensorflow/tfjs-react-native';
import { CameraCapturedPicture } from 'expo-camera';
// TODO: Replace with model
import * as mobilenet from '@tensorflow-models/mobilenet';

let _model: mobilenet.MobileNet | null = null;


export const getModel = async () => {
    if (_model) return _model
    _model =await  mobilenet.load()
    return _model
}

export const doImage = async (image: CameraCapturedPicture) => {
    try {
        const response = await fetch(image.uri, undefined, {isBinary: true})
        const imageData = await response.arrayBuffer()
        const imageTensor = decodeJpeg(imageData as Uint8Array)
        const prediction = await (await getModel()).classify(imageTensor)
        console.log('We predict', prediction)
    }
}
	// fetch(image.uri, undefined, { isBinary: true }).then(({ arrayBuffer }) =>
	// 	arrayBuffer().then(buff =>
	// 		getModel().then(model => model.classify(decodeJpeg(buff)))
	// 	)
	// );
