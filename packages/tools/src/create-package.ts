import fs from 'fs'
import { exec, ExecException } from 'node:child_process'

const changeFiles = [
	{
		path : '/', 
		name : 'package.json'
	},
]

const namePackage = process.env.NAME
console.log(namePackage);

if(namePackage !== undefined){

exec(`cp -r ./src/template-package ../${namePackage}`, (error: ExecException | null, stdout: string, stderr: string) => {
	if (!error){
		for(const file of changeFiles){
			if(file)
			fs.readFile(`../../${namePackage}${file.path}${file.name}`, 'utf8', (err, data) => {
				fs.writeFile(`../../services/${namePackage}${file.path}${file.name}`, data.replace('template', namePackage), () => {
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
	console.error('Dont name in env');
	console.error('Enter "export NAME=packageName && export PARENT=parentPackage && npm run mkp"');
}