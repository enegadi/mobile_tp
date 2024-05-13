import React, {
	ReactNode,
	createContext,
	useState,
	Dispatch,
	SetStateAction,
} from 'react';

interface Post {
	uri: string;
	description: string;
	location: {
		latitude: number;
		longitude: number;
	};
}

type PostContextProvider = {
	post: Post;
	setPost: Dispatch<SetStateAction<Post>>;
};

// Create the context
export const PostsContext = createContext<PostContextProvider | undefined>(
	undefined
);

function usePost() {
	const context = React.useContext(PostsContext);
	if (context === undefined) {
		throw new Error('usePosts must be used within a PostsProvider');
	}
	return context;
}

const PostProvider = ({ children }: { children: ReactNode }) => {
	const [post, setPost] = useState<Post>({
		uri: '',
		description: '',
		location: {
			latitude: 0,
			longitude: 0,
		},
	});

	return (
		<PostsContext.Provider value={{ post, setPost }}>
			{children}
		</PostsContext.Provider>
	);
};

export { PostProvider, usePost };
