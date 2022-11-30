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

	/* eslint-disable no-console */
	console.log('\n|DEPLOY START  DEPLOY START  DEPLOY START  DEPLOY START  DEPLOY START  DEPLOY START  DEPLOY STA|');

	ftpDeployer
		.deploy(deployConfig)
		.then(() => {
			console.log('\nDeployed files:');
			console.log(files);
			console.log('\n|DEPLOY END  DEPLOY END  DEPLOY END  DEPLOY END  DEPLOY END  DEPLOY END  DEPLOY END  DEPLOY END|');
		})
		.catch((error) => {
			console.error(error);
		});
	/* eslint-enable no-console */
};


