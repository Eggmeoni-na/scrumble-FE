import { useEffect } from 'react';

const HomePage = () => {
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/posts');
        const data = await response.json();
        console.log(data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []);

  const handleCreatePost = async () => {
    try {
      const response = await fetch('/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: 2, title: 'title' }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const handleDeletePost = async () => {
    try {
      const response = await fetch(`/posts/2`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <>
      <div>HomePage</div>
      <button onClick={handleCreatePost}>Post Test</button>
      <button onClick={handleDeletePost}>Delete Post</button>
    </>
  );
};

export default HomePage;
