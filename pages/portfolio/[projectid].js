import { useRouter } from 'next/router';

const PortfolioProject = () => {
    // send a request to some backend server
    // to fetch the piece of data with an id of router.query.projectid
    const router = useRouter();

    return (
        <div>
            <h1>Portfolio Project Page: { router.query.projectid || "" }</h1>
        </div>
    )
}

export default PortfolioProject