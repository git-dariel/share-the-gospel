interface Post {
  id: string;
  userName: string;
  content: string;
  timestamp: string;
}

const POSTS_STORAGE_KEY = 'user_posts';

export const getStoredPosts = (): Post[] => {
  try {
    const storedPosts = localStorage.getItem(POSTS_STORAGE_KEY);
    return storedPosts ? JSON.parse(storedPosts) : [];
  } catch (error) {
    console.error('Error loading posts from localStorage:', error);
    return [];
  }
};

export const savePost = (post: Post): void => {
  try {
    const currentPosts = getStoredPosts();
    const updatedPosts = [post, ...currentPosts];
    localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(updatedPosts));
  } catch (error) {
    console.error('Error saving post to localStorage:', error);
  }
};

export const updatePost = (id: string, newContent: string): void => {
  try {
    const currentPosts = getStoredPosts();
    const updatedPosts = currentPosts.map(post =>
      post.id === id ? { ...post, content: newContent } : post
    );
    localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(updatedPosts));
  } catch (error) {
    console.error('Error updating post in localStorage:', error);
  }
};

export const deletePost = (id: string): void => {
  try {
    const currentPosts = getStoredPosts();
    const updatedPosts = currentPosts.filter(post => post.id !== id);
    localStorage.setItem(POSTS_STORAGE_KEY, JSON.stringify(updatedPosts));
  } catch (error) {
    console.error('Error deleting post from localStorage:', error);
  }
};

export const clearAllPosts = (): void => {
  try {
    localStorage.removeItem(POSTS_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing posts from localStorage:', error);
  }
};
