import { useRouter } from "next/router";

const ClientProjectPage = () => {
    const router = useRouter();
    console.log(router.query)

    return (
        <div>
            <h1>The {router.query.clientprojectid || ""} Project Page for Client { router.query.id || "" }</h1>
        </div>
    )
}

export default ClientProjectPage