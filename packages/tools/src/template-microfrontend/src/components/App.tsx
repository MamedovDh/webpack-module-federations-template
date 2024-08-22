import cl from '@/sass/App.module.sass'
import { Outlet } from 'react-router-dom'

function App() {

	return (
		<div className={cl.app}>
			Empty App
			<Outlet/>
		</div>
	)
}

export default App
