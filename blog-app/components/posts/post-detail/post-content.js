import Image from "next/image";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import ReactMarkdown from "react-markdown";

import PostHeader from "./post-header";
import classes from "./post-content.module.css";

const PostContent = ({ post }) => {
    const customRenderers = {
        p(paragraph) {
            if (paragraph.node.children[0].tagName === 'img') {
                const image = paragraph.node.children[0];
                return (
                    <div className={classes.image}>
                        <Image
                            src={image.properties.src}
                            alt={image.properties.alt}
                            width={600}
                            height={300}
                        />
                    </div>
                )
            }
            return <p>{paragraph.children}</p>
        },

        code(code) {
            const language = code.className.includes("language") ?
                code.className.replace("language-", "") : code.className;
            return <SyntaxHighlighter
                style={atomDark}
                language={language}
                children={code.children}
            />
        }
    }

    return (
        <article className={classes.content}>
            <PostHeader
                title={post.title}
                image={`/images/posts/${post.slug}/${post.image}`}
            />
            <ReactMarkdown components={customRenderers}>
                {post.content}
            </ReactMarkdown>
        </article>
    )
}

export default PostContent;