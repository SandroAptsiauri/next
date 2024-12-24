import { GetStaticPaths, GetStaticProps } from "next";

interface Author {
  id: number;
  name: string;
  email: string;
}

interface AuthorProps {
  author: Author;
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [], // No pre-rendered paths
    fallback: "blocking", // Dynamically render on first request
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { authorId } = context.params!;
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/users/${authorId}`
  );
  const author = await res.json();

  return { props: { author }, revalidate: 10 };
};

const AuthorPage: React.FC<AuthorProps> = ({ author }) => {
  return (
    <div>
      <h1>Author: {author.name}</h1>
      <p>Email: {author.email}</p>
    </div>
  );
};

export default AuthorPage;
