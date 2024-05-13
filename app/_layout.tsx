import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from '@react-navigation/native';
import { useFonts } from 'expo-font';
import { Slot, Stack, router } from 'expo-router';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import 'react-native-reanimated';
import { PostsProvider } from '@/context/PostContext';
import { PostProvider, PostsContext } from '@/context/SinglePostContext';
import { useColorScheme } from '@/hooks/useColorScheme';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
	const colorScheme = useColorScheme();
	const [loaded] = useFonts({
		SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
	});

	let navigateTologin = () => {
		router.replace('/login');
	};
	useEffect(() => {
		if (loaded) {
			SplashScreen.hideAsync();
			// navigateTologin();
		}
	}, [loaded]);

	if (!loaded) {
		return null;
	}

	return (
		<PostsProvider>
			<PostProvider>
				<ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
					<Slot />
				</ThemeProvider>
			</PostProvider>
		</PostsProvider>
	);
}
