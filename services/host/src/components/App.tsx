import cl from '@/sass/App.module.sass'
import { sum } from '@packages/shared/src/index'
import { Outlet } from 'react-router-dom'

function App() {

	console.log(sum(5,5));

	return (
		<div className={cl.app}>
			App
			<Outlet/>
		</div>
	)
}

export default App
