import { PHASE_DEVELOPMENT_SERVER } from 'next/constants.js';

/**
 * @type {import('next').NextConfig}
 */

const nextConfig = (phase, { defaultConfig }) => {
    if (phase === PHASE_DEVELOPMENT_SERVER) {
        return {
            env: {
                type: 'dev',
                mongodb_username: 'example_dev_name',
                mongodb_password: 'example_dev_pass',
                mongodb_clustername: 'cluster0',
                mongodb_database: 'my-site-dev',
                sample_text: "Hello World",
            }
        }
    }

    return {
            env: {
                type: 'prd',
                mongodb_username: 'example_prd_name',
                mongodb_password: 'example_prd_pass',
                mongodb_clustername: 'cluster0',
                mongodb_database: 'my-site-prd',
            }
        }
};

export default nextConfig;