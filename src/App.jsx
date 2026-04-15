import {
	Route,
	createBrowserRouter,
	createRoutesFromElements,
	RouterProvider,
} from "react-router-dom";
import { toast } from "react-toastify";
import MainLayout from "./layouts/MainLayout";

import HomePage from "./pages/HomePage";
import JobsPage from "./pages/JobsPage";
import NotFoundPage from "./pages/NotFoundPage";
import JobPage, { jobLoader } from "./pages/JobPage";
import AddJobPage from "./pages/AddJobPage";
import EditJobPage from "./pages/EditJobPage";

function App() {
	async function addJob(newJob) {
		const res = await fetch("/api/jobs", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newJob),
		});

		return;
	}

	async function updateJob(job) {
		const res = await fetch(`/api/jobs/${job.id}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(job),
		});

		return;
	}

	async function deleteJob(id) {
		const res = await fetch(`/api/jobs/${id}`, {
			method: "DELETE",
		});

		return;
	}

	const router = createBrowserRouter(
		createRoutesFromElements(
			<Route path="/" element={<MainLayout />}>
				<Route index element={<HomePage />} />
				<Route path="/jobs" element={<JobsPage />} />

				<Route
					path="/edit-job/:id"
					element={<EditJobPage updateJobSubmit={updateJob} />}
					loader={jobLoader}
				/>

				<Route
					path="/jobs/:id"
					element={<JobPage deleteJob={deleteJob} />}
					loader={jobLoader}
				/>
				<Route path="*" element={<NotFoundPage />} />
				<Route
					path="/add-job"
					element={<AddJobPage addJobSubmit={addJob} />}
				/>
			</Route>,
		),
	);

	return <RouterProvider router={router} />;
}

export default App;
