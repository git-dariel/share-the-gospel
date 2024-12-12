import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import NavBar from "../../components/NavBar";
import CreatePost from "../../components/CreatePost";
import PostCard from "../../components/PostCard";
import { getStoredPosts, savePost, updatePost, deletePost } from "../../services/localStorage";

interface Post {
  id: string;
  userName: string;
  content: string;
  timestamp: string;
  userImageUrl?: string;
}

const HomePage = () => {
  const { user } = useUser();
  const [posts, setPosts] = useState<Post[]>([]);

  // Load posts from localStorage on component mount
  useEffect(() => {
    const loadedPosts = getStoredPosts();
    setPosts(loadedPosts);
  }, []);

  const handleCreatePost = (content: string) => {
    const newPost: Post = {
      id: Date.now().toString(),
      userName: `${user?.firstName} ${user?.lastName}`,
      content,
      timestamp: new Date().toISOString(),
      userImageUrl: user?.imageUrl,
    };

    savePost(newPost);
    setPosts(prevPosts => [newPost, ...prevPosts]);
  };

  const handleEditPost = (id: string, newContent: string) => {
    updatePost(id, newContent);
    setPosts(prevPosts =>
      prevPosts.map(post =>
        post.id === id
          ? { ...post, content: newContent }
          : post
      )
    );
  };

  const handleDeletePost = (id: string) => {
    deletePost(id);
    setPosts(prevPosts => prevPosts.filter(post => post.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <NavBar />
      
      <div className="max-w-2xl mx-auto px-4 pt-28 pb-10">
        {/* Create Post Section */}
        <CreatePost onPost={handleCreatePost} />

        {/* Posts Feed */}
        <div className="space-y-4">
          {posts.map((post) => (
            <PostCard
              key={post.id}
              id={post.id}
              userName={post.userName}
              content={post.content}
              timestamp={post.timestamp}
              onEdit={handleEditPost}
              onDelete={handleDeletePost}
              currentUser={`${user?.firstName} ${user?.lastName}`}
              userImageUrl={post.userImageUrl}
            />
          ))}
          {posts.length === 0 && (
            <div className="text-center py-10">
              <p className="text-gray-500">No posts yet. Be the first to share something!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
