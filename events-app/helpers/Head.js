import Head from "next/head";

const HeadData = (title, name, content) => (
    <Head>
        {title && <title>{title || "NextJS Events"}</title>}
        <meta name={name || "description"} content={content || ""} />
    </Head>
);

export default HeadData;