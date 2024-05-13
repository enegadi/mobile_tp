import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import {
	StyleSheet,
	View,
	Text,
	TextInput,
	Pressable,
	ScrollView,
	Image,
} from 'react-native';
import * as Location from 'expo-location';
import { Link } from 'expo-router';
import { usePost } from '@/context/SinglePostContext';
import { usePosts } from '@/context/PostContext';

export default function App() {
	const [mapRegion, setMapRegion] = useState({
		latitude: 33.67049627269136,
		longitude: -7.379628725233621,
		latitudeDelta: 0.0922,
		longitudeDelta: 0.0421,
	});

	const [location, setLocation] = useState<Location.LocationObjectCoords>();
	const [errorMsg, setErrorMsg] = useState('');
	const [imageDescription, setImageDescription] = useState('');
	const { post, setPost } = usePost();
	const { posts, setPosts } = usePosts();

	useEffect(() => {
		(async () => {
			let { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== 'granted') {
				setErrorMsg('Permission to access location was denied');
				return;
			}

			let location: Location.LocationObjectCoords = await (
				await Location.getCurrentPositionAsync({})
			).coords;
			Location.watchPositionAsync({}, (location) => {
				setLocation(location.coords);
			});

			setLocation(location);
			setMapRegion({
				latitude: location.latitude,
				longitude: location.longitude,
				latitudeDelta: 0.0922,
				longitudeDelta: 0.0421,
			});
		})();
	}, []);

	let text = 'Waiting..';
	if (errorMsg) {
		text = errorMsg;
	} else if (location) {
		text = JSON.stringify(location.latitude);
		text = location.latitude + ' ' + location.longitude;
	}

	let intitiazePost = () => {
		setPost({
			uri: '',
			description: imageDescription,
			location: {
				latitude: 0,
				longitude: 0,
			},
		});
	};

	let sharePost = () => {
		setPost((current) => {
			return {
				...current,
				description: imageDescription,
				location: {
					latitude: location?.longitude || 0,
					longitude: location?.longitude || 0,
				},
			};
		});
		console.log("location", location);
		
		setPosts([...posts, post]);

		setImageDescription('');
		console.log(JSON.stringify(post));
		intitiazePost();
	};

	return (
		<View style={styles.container}>
			<View>
				<Link href={'/home/'}>
					<Text
						style={{
							fontSize: 16,
							color: 'blue',
							textDecorationLine: 'underline',
						}}
					>
						go to posts
					</Text>
				</Link>
			</View>
			<MapView style={styles.map} region={mapRegion}>
				<Marker coordinate={mapRegion} title="Marker" />
			</MapView>
			<View>
				<Text style={styles.paragraph}>your location is :{text}</Text>
			</View>
			{post.uri ? (
				<Image source={{ uri: post.uri }} style={styles.image} />
			) : (
				<View>
					<Link href={'/home/camera'} style={styles.Button}>
						<Text>go to take a photo to share</Text>
					</Link>
				</View>
			)}
			<View
				style={{
					// flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
					padding: 20,
					height: '10%',
					width: '100%',
				}}
			>
				<TextInput
					value={imageDescription}
					style={styles.input}
					placeholder="Type a description of The image"
					onChangeText={(text) => setImageDescription(text)}
				/>
			</View>
			<View
				style={{
					justifyContent: 'center',
					alignItems: 'center',
					padding: 10,
					height: '10%',
					width: '40%',
				}}
			>
				<Pressable style={styles.Button} onPress={sharePost}>
					<Text>Share</Text>
				</Pressable>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 10,
		width: '100%',
		height: '100%',
	},
	map: {
		width: '80%',
		height: '30%',
	},
	containerd2: {
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		padding: 20,
	},
	paragraph: {
		fontSize: 18,
		textAlign: 'center',
	},
	image: {
		width: 200,
		height: 200,
	},
	input: {
		width: '100%',
		height: '100%',
		borderWidth: 1,
		borderColor: 'gray',
		padding: 10,
		borderRadius: 10,
	},
	Button: {
		width: '100%',
		height: 40,
		backgroundColor: '#3273a8',
		paddingHorizontal: 20,
		paddingVertical: 10,
		borderRadius: 6,
		alignItems: 'center',
	},
});
