import { GetServerSideProps } from "next";

interface Post {
  id: number;
  title: string;
  body: string;
}

interface BlogPostProps {
  post: Post;
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { postId } = context.params!;
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${postId}`
  );
  const post = await res.json();

  return { props: { post } };
};

const BlogPost: React.FC<BlogPostProps> = ({ post }) => {
  return (
    <div>
      <h1>{post.title}</h1>
      <p>{post.body}</p>
    </div>
  );
};

export default BlogPost;
