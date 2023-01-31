import { Fragment } from "react";
import Head from "next/head";
import PostContent from "../../components/posts/post-detail/post-content";
import { getPostData, getPostsFiles } from "../../lib/posts-util";

export default function PostDetailPage(props) {
    return (
        <Fragment>
            <Head>
                <title>{props.post.title}</title>
                <meta name="description" content={props.post.excerpt} />
            </Head>
            <PostContent post={props.post} />
        </Fragment>
    )
}

export function getStaticProps(context) {
    return {
        props: {
            post: getPostData(context.params.slug),
        },
        revalidate: 600,
    }
}

export function getStaticPaths() {
    const slugs = getPostsFiles().map(fileName => fileName.replace(/\.md$/, ''));

    return {
        paths: slugs.map(slug => ({ params: { slug }})),
        fallback: false,
    }
}