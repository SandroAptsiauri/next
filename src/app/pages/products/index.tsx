import { GetStaticProps } from 'next';

interface Product {
  id: number;
  title: string;
}

interface ProductsProps {
  products: Product[];
}

export const getStaticProps: GetStaticProps = async () => {
  const res = await fetch('https://jsonplaceholder.typicode.com/posts');
  const products = await res.json();

  return { props: { products } };
};

const Products: React.FC<ProductsProps> = ({ products }) => {
  return (
    <div>
      <h1>Our Products</h1>
      <ul>
        {products.map((product) => (
          <li key={product.id}>{product.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default Products;
