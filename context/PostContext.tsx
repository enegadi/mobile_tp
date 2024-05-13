import React, {
	ReactNode,
	createContext,
	useState,
	Dispatch,
	SetStateAction,
} from 'react';

interface Posts {
	uri: string;
	description: string;
	location: {
		latitude: number;
		longitude: number;
	};
}

type PostsContextProvider = {
	posts: Posts[];
	setPosts: Dispatch<SetStateAction<Posts[]>>;
};

// Create the context
export const PostsContext = createContext<PostsContextProvider | undefined>(
	undefined
);

function usePosts() {
	const context = React.useContext(PostsContext);
	if (context === undefined) {
		throw new Error('usePosts must be used within a PostsProvider');
	}
	return context;
}

const PostsProvider = ({ children }: { children: ReactNode }) => {
	const [posts, setPosts] = useState<Posts[]>([]);

	return (
		<PostsContext.Provider value={{ posts, setPosts }}>
			{children}
		</PostsContext.Provider>
	);
};

export { PostsProvider, usePosts };
