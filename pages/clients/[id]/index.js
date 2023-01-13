import { useRouter } from "next/router"

export default function ClientProjects() {
    const router = useRouter();

    return (
        <div>
            <h1>Client Projects of { router.query.id || "" }</h1>
        </div>
    )
}