import { Fragment } from "react";
import path from 'path';
import fs from "fs/promises";

export default function ProductDetailPage(props) {
    const { loadedProduct } = props;

    // if (!loadedProduct) {
    //     return <p>Loading...</p>
    // }

    return (
        <Fragment>
            <h1>{loadedProduct.title}</h1>
            <p>{loadedProduct.description}</p>
        </Fragment>
    )
}

const getData = async () => (
    JSON.parse(await fs.readFile(path.join(process.cwd(), 'data', 'dummy-backend.json')))
)

export const getStaticProps = async (context) => {
    const data = await getData();
    const product = data.products.find(product => product.id === context.params.pid);

    if (!product) {
        return { notFound: true }
    }

    return {
        props: { loadedProduct: product }
    };
}

export const getStaticPaths = async () => {
    const data = await getData();

    return {
        paths: data.products.map(product => (
            { params: { pid: product.id } }
        )),
        fallback: true,
        // fallback: "blocking",
    }
}