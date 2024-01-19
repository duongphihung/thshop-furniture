/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['i.pinimg.com'],
    },
    async redirects() {
        return [
            {
                source: '/admin',
                destination: '/admin/dashboard',
                permanent: true,
            },
        ]
    },
}

module.exports = nextConfig