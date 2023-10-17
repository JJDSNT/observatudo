//https://reacthustle.com/blog/nextjs-setup-role-based-authentication?expand_article=1
export { default } from 'next-auth/middleware'

export const config = { matcher: ['/admin', '/protected/:path*','/api/popular/:function*'] }

