/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		domains: ['todayslook.s3.us-east-1.amazonaws.com', '/'],
	},
	reactStrictMode: true,
	async redirects() {
		return [
			{
				source: '/',
				destination: '/home',
				permanent: false,
			},
		];
	},
};

module.exports = nextConfig;
