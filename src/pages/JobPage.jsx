import { useParams, useLoaderData } from "react-router-dom";

function JobPage() {
	const { id } = useParams();
	const job = useLoaderData();
	return <h1>{job.title}</h1>;
}

async function jobLoader({ params }) {
	const res = await fetch(`/api/jobs/${params.id}`);
	const data = await res.json();

	return data;
}

// eslint-disable-next-line react-refresh/only-export-components
export { JobPage as default, jobLoader };
