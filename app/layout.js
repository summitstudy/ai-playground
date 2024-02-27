import './globals.css'
import './animate.css'
import Parents from "@/app/parents.js";
// import { getServerSession } from 'next-auth';
// import { authOptions } from '@/pages/api/auth/[...nextauth]';

export const metadata = {
  title: 'AI PLAYGROUND',
  description: 'AI PLAYGROUND',
}
export default async function RootLayout({ children }) {
  // let session = await getServerSession(authOptions);
  let session = '';
  return (
    <html>
      <head>
      <meta name= "viewport content= width=device-width initial-scale=1.0"/>
      <meta property="og:image" content="https://postfiles.pstatic.net/MjAyNDAyMjZfMjY1/MDAxNzA4OTI4Nzk5MTAw.Zp6IDJ9zKGzt6eUvp4ThK6DzNGg-TC1-23ynmUohelIg.7Xn8M4oEQ867tIVTt1rohoXnRw7uwosKs9t0xm1lzLkg.PNG/%EC%8D%B8%EB%84%A4%EC%9D%BC.png?type=w966"/>
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      </head>
      <body>
        <Parents session={session} children={children}>
          {children}
        </Parents>
      </body>
    </html>
  )
}
