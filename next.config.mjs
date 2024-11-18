/** @type {import('next').NextConfig} */
const nextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'lh3.googleusercontent.com'
			},
			{
				protocol: 'https',
				hostname: 'scdn.line-apps.com',
			},
			{
				protocol: 'https',
				hostname: 'qr-official.line.me',
			}
		],
	},
	reactStrictMode: false,
};



export default nextConfig;
