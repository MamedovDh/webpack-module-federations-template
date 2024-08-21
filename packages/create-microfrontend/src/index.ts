// import 'dotenv/config'
import { exec, ExecException } from 'node:child_process'

console.log(process.env.name);


exec('cp -r ./src/template ../../services/untiled', (error: ExecException | null, stdout: string, stderr: string) => {
	if (!error){
		console.log('Complite!\nNext, change files:"')
		console.log('"./src/components/App.tsx"')
		console.log('"./src/router/Router.tsx"')
		console.log('"./package.json"')
		console.log('"./webpack.config.ts"')
		console.log('And create pages in dir "./src/pages"');
	}
	else {
		console.error('Error!!!\n', stderr);
	}
})
