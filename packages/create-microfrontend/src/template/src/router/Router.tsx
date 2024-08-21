import { createBrowserRouter } from "react-router-dom"
import App from "../components/App"

const routes = [
	{
		path: "/shop",
		element: <App />,
		// children: [
		// 	{
		// 		path: '/about',
		// 		element: <Suspense fallback={'Loading...'}>{/* enter a page lazy component*/}</Suspense>
		// 	},
		// ]
	},
]

export const router = createBrowserRouter(routes)

export default routes
