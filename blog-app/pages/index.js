import { Fragment } from "react";
import Head from "next/head";
import { Hero, FeaturedPosts } from "../components/home";
import { getFeaturedPosts } from "../lib/posts-util";

export default function HomePage(props) {
    return (
        <Fragment>
            <Head>
                <title>Brandy's Blog {process.env.mongodb_database}</title>
                <meta name="description" content="I post about programming and web development" />
            </Head>
            <Hero />
            <FeaturedPosts posts={props.posts} />
        </Fragment>
    )
};

export function getStaticProps() {
    return {
        props: {
            posts: getFeaturedPosts()
        },
        revalidate: 60,
    }
}