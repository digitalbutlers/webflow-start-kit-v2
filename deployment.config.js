// eslint-disable-next-line import/no-extraneous-dependencies
import FtpDeploy from 'ftp-deploy';

import { FTP, DIRECTORIES } from './config.js';
import { USERNAME, PASSWORD } from './config.local.js';


export const deploy = (files) => {
	const ftpDeployer = new FtpDeploy();

	const deployConfig = {
		user: USERNAME,
		password: PASSWORD,
		host: FTP.HOST,
		port: FTP.PORT,
		remoteRoot: `${FTP.REMOTE_ROOT}/`,

		localRoot: `${process.cwd()}/${DIRECTORIES.BUILD}`,
		include: files,
		exclude: [
			'node_modules/**',
			'node_modules/**/.*',
			'.git/**',
		],

		deleteRemote: false,
		forcePasv: true,
		sftp: false,
	};

	ftpDeployer
		.deploy(deployConfig)
		.then(() => {
			// eslint-disable-next-line no-console
			console.log('\u001B[32m', `
███████████████████████████████████████████
██               DEPLOYED!               ██
███████████████████████████████████████████
			`);
		})
		.catch((error) => {
			// eslint-disable-next-line no-console
			console.error(error);
		});
};


