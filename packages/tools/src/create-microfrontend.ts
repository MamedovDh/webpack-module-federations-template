import fs from 'fs'
import { exec, ExecException } from 'node:child_process'

const changeFiles = [
	{
		path : '/public/', 
		name : 'index.html',
	},
	{
		path : '/', 
		name : 'package.json'
	},
	{
		path : '/', 
		name : 'webpack.config.ts'
	},
]

const nameMicroFrontend = process.env.NAME

if(nameMicroFrontend){

exec(`cp -r ./src/template-microfrontend ../../services/${nameMicroFrontend}`, (error: ExecException | null, stdout: string, stderr: string) => {
	if (!error){
		for(const file of changeFiles){
			if(file)
			fs.readFile(`../../services/${nameMicroFrontend}${file.path}${file.name}`, 'utf8', (err, data) => {
				fs.writeFile(`../../services/${nameMicroFrontend}${file.path}${file.name}`, data.replace('template', nameMicroFrontend), () => {
					console.log(`file ${file.name} update`);
				})
			})
		}

	}
	else {
		console.error('Error!!!\n', stderr);
	}
})

} else {
	console.error('Don\'t name in env');
	console.error('Enter "export NAME=projectName && npm run mkmf"');
}