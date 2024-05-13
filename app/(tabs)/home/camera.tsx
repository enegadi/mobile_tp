import {
	CameraCapturedPicture,
	CameraView,
	useCameraPermissions,
} from 'expo-camera';
import { useRef, useState } from 'react';
import {
	Button,
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { router } from 'expo-router';
import { usePost } from '@/context/SinglePostContext';

const PremisionNotGranted = (requestPermission: () => void) => (
	<View style={styles.container}>
		<Text style={{ textAlign: 'center' }}>
			We need your permission to show the camera
		</Text>
		<Button onPress={requestPermission} title="grant permission" />
	</View>
);

export default function App() {
	const [facing, setFacing] = useState('back');
	const [picture, setPicture] = useState('');
	const [permission, requestPermission] = useCameraPermissions();
	const cameraRef = useRef<CameraView>(null);
	const { post, setPost } = usePost();
	if (!permission) {
		return <View />;
	}

	if (!permission.granted) {
		return PremisionNotGranted(requestPermission);
	}

	let goBack = () => {
		router.navigate('/home/sharePost');
	};
	let savePicture = async () => {
		if (cameraRef.current) {
			const options = { quality: 0.5, base64: true };
			const data: CameraCapturedPicture | undefined =
				await cameraRef.current.takePictureAsync(options);
			if (data) {
				setPicture(data.uri);
				setPost((current) => {
					return {
						...current,
						uri: data.uri,
					};
				});
				goBack();
				console.log(JSON.stringify(post));
			}
		}
	};

	function toggleCameraFacing() {
		setFacing((current) => (current === 'back' ? 'front' : 'back'));
	}

	return (
		<View style={styles.container}>
			<CameraView style={styles.camera} ref={cameraRef}>
				<View style={styles.buttonContainer}>
					<TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
						<Text style={styles.text}>Flip Camera</Text>
					</TouchableOpacity>
					<Pressable onPress={savePicture}>
						<Text style={styles.text}>Save Picture</Text>
					</Pressable>
				</View>
			</CameraView>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
	},
	camera: {
		flex: 1,
	},
	buttonContainer: {
		flex: 1,
		flexDirection: 'row',
		backgroundColor: 'transparent',
		margin: 64,
	},
	button: {
		flex: 1,
		alignSelf: 'flex-end',
		alignItems: 'center',
	},
	text: {
		fontSize: 24,
		fontWeight: 'bold',
		color: 'white',
	},
});
