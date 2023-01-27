import Head from "next/head";

const HeadData = (title, name, content) => (
    <Head>
        {title && <title>{title || "NextJS Events"}</title>}
        <meta name={name || "description"} content={content || ""} />
        <meta name='viewport' content='initial-scale=1.0, width=device-width' />
    </Head>
);

export default HeadData;