import PostItem from "./post-item";
import classes from "./posts-grid.module.css"

const PostsGrid = ({ posts = [] }) => (
    <ul className={classes.grid}>
        {posts.map(post => (
            <PostItem key={post.slug} post={post} />
        ))}
    </ul>
)

export default PostsGrid;