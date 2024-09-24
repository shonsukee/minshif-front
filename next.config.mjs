/** @type {import('next').NextConfig} */
const isProd = process.env.NODE_ENV === 'production';
const basePath = isProd ? '/public' : '';

const nextConfig = {
	publicRuntimeConfig: {
		basePath,
	},
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com'
			}
		],
	},
	reactStrictMode: false,
};



export default nextConfig;
