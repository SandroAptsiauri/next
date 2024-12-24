import { GetStaticPaths, GetStaticProps } from "next";

interface Product {
  id: number;
  title: string;
  body: string;
}

interface ProductProps {
  product: Product;
}

export const getStaticPaths: GetStaticPaths = async () => {
  const res = await fetch("https://jsonplaceholder.typicode.com/posts");
  const products = await res.json();

  const paths = products.map((product: Product) => ({
    params: { productId: product.id.toString() },
  }));

  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { productId } = context.params!;
  const res = await fetch(
    `https://jsonplaceholder.typicode.com/posts/${productId}`
  );
  const product = await res.json();

  return { props: { product } };
};

const ProductPage: React.FC<ProductProps> = ({ product }) => {
  return (
    <div>
      <h1>{product.title}</h1>
      <p>{product.body}</p>
    </div>
  );
};

export default ProductPage;
