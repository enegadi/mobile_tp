import React from 'react';
import { usePosts } from '@/context/PostContext';
import {
	View,
	Image,
	Text,
	StyleSheet,
	ScrollView,
	Pressable,
} from 'react-native';
import { Link, router } from 'expo-router';
// import { ScrollView } from 'react-native-reanimated/lib/typescript/Animated';

const Posts = () => {
	const { posts } = usePosts();
	return (
		<ScrollView
			contentContainerStyle={{
				alignItems: 'center',
			}}
		>
			{posts.map((post, index) => (
				<View key={index} style={styles.postContainer}>
					<Image
						style={styles.image}
						source={{ uri: post.uri }}
						// alt={post.description}
						onError={(e) => {
							console.log('error', e);
						}}
					/>
					<Text style={styles.description}>{post.description}</Text>
					<Text style={styles.location}>
						{post.location.latitude}, {post.location.longitude}
					</Text>
				</View>
			))}
		</ScrollView>
	);
};

const PostPage = () => {
	const { posts } = usePosts();
	console.log('posts', posts);
	return (
		<View
			style={{
				flex: 1,
				justifyContent: 'center',
				alignItems: 'center',
				padding: 20,
				paddingTop: 50,
			}}
		>
			<View>
				<Text
					style={{
						fontSize: 24,
						fontWeight: 'bold',
					}}
				>
					Posts
				</Text>
				<Pressable
					onPress={() => {
						router.replace('/home/camera');
					}}
				>
					<Text
						style={{
							color: 'blue',
							textDecorationLine: 'underline',
						}}
					>
						Post a Place
					</Text>
				</Pressable>
			</View>
			{posts.length > 0 ? (
				<Posts />
			) : (
				<View
					style={{
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center',
					}}
				>
					<Text
						style={{
							fontSize: 24,
							fontWeight: 'bold',
						}}
					>
						No posts yet ...
					</Text>
					<Link href="/home/camera">
						<Text
							style={{
								color: 'blue',
								textDecorationLine: 'underline',
							}}
						>
							Take a picture
						</Text>
					</Link>
				</View>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	postContainer: {
		marginBottom: 10,
	},
	image: {
		width: 400,
		height: 400,
	},
	description: {
		fontSize: 16,
		marginTop: 5,
	},
	location: {
		fontSize: 12,
		color: 'gray',
	},
});

export default PostPage;
