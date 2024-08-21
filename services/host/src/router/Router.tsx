import { createBrowserRouter } from 'react-router-dom'
import App from '../components/App'
import React from 'react'

export const router = createBrowserRouter([
	{
		path : '/',
		element : <App/>,
		children : [
			// ...adminRoutes // add microfrontends for this
		]
	}
])