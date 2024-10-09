/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    pageExtensions: ['js', 'jsx', 'mdx', 'ts', 'tsx'],
    typescript: {
        ignoreBuildErrors: true
    },
    transpilePackages: ['lucide-react'],
};

export default nextConfig;
