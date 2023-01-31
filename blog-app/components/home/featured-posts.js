import PostsGrid from "../../components/posts/posts-grid";
import classes from "./featured-posts.module.css";

const FeaturedPosts = (props) => (
    <section className={classes.latest}>
        <h2>Featured Posts</h2>
        <PostsGrid posts={props.posts} />
    </section>
)

export default FeaturedPosts;