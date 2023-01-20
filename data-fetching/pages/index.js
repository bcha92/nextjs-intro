import path from 'path';
import fs from "fs/promises";
import Link from "next/link";

export default function HomePage(props) {
  const { products } = props;

  return (
    <ul>
      {products.map(product => (
        <li key={product.id}>
          <Link href={`/products/${product.id}`}>{product.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export const getStaticProps = async (context) => {
  console.log("(Re-)Generating...")
  const data = JSON.parse(await fs.readFile(path.join(process.cwd(), 'data', 'dummy-backend.json')));

  if (!data) {
    return {
      redirect: {
        destination: '/no-data'
      }
    }
  }

  if (data.products.length === 0) {
    return { notFound: true };
  }

  return {
    props: { products: data.products },
    revalidate: 10,
  };
};