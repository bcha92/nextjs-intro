export default function UserIdPage(props) {
    return(
        <h1>{props.id}</h1>
    )
}

export async function getServerSideProps(context) {
    const { uid } = context.params;

    return {
        props: {
            id: 'userid-' + uid,
        }
    };
}