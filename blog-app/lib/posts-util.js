import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), 'posts');

export const getPostsFiles = () => fs.readdirSync(postsDirectory);

export const getPostData = postIdentifier => {
    const postSlug = postIdentifier.replace(/\.md$/, ''); // removes the file extension
    const { data, content } = matter(fs.readFileSync(path.join(postsDirectory, `${postSlug}.md`), 'utf-8'));

    return {
        slug: postSlug,
        ...data,
        content,
    };
};

export const getAllPosts = () => (
    getPostsFiles().map(postFile => getPostData(postFile)) // maps posts
        .sort((postA, postB) => postA.date > postB.date ? -1 : 1) // sorts by date
);

export const getFeaturedPosts = () => (
    getAllPosts().filter(post => post.isFeatured)
);