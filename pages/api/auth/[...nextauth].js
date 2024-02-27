import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
import { connectDB } from "@/utils/database";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from 'bcrypt';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions = {
  providers: [
    // GoogleProvider({
    //   clientId: process.env.GOOGLE_ID,
    //   clientSecret: process.env.GOOGLE_SECRET,
    // }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {}, // 비어 있는 객체로 설정하여 기본 로그인 폼 비활성화
      async authorize(credentials) {
        let db = (await connectDB).db('userinfoDB');
        let user = await db.collection('user_cred').findOne({ email: credentials.email })
        if (!user) {
          throw new Error('해당 이메일이 존재하지 않습니다.');
        }
        const pwcheck = await bcrypt.compare(credentials.password, user.password);
        if (!pwcheck) {
          throw new Error('비밀번호가 올바르지 않습니다.');
        }
        return user
      }
    })
  ],
  //   // 추가
  pages: {
    // signIn: '/auth/signin',  // 로그인 페이지
    // error: '/auth/error',    // 에러 페이지
    // verifyRequest: '/auth/verify-request', // 이메일 확인 요청 페이지
    // newUser: '/chapter1' // 새 사용자의 경우 리다이렉트할 페이지
  },
  //3. jwt 써놔야 잘됩니다 + jwt 만료일설정
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60 //24시간
  },

  callbacks: {
    async signIn({ user, account }) {
      if (account.provider === "google") {
        let db = (await connectDB).db('userinfoDB');
        let existingUser = await db.collection('users').findOne({ email: user.email });
        // 사용자가 DB에 없다면 새로 저장
        if (!existingUser) {
          // 'userActions' 컬렉션에 추가 정보 저장
          await db.collection('userActions').insertOne({
            email: user.email,
            chapter: "1",
            nickname: "Mimi",
          });
        }
      }
      return true; // 로그인 허용
    },
    //4. jwt 만들 때 실행되는 코드 
    //user변수는 DB의 유저정보담겨있고 token.user에 뭐 저장하면 jwt에 들어갑니다.
    jwt: async ({ token, user }) => {
      if (user) {
        token.user = {};
        token.user.name = user.name
        token.user.email = user.email
      }
      return token;
    },
    //5. 유저 세션이 조회될 때 마다 실행되는 코드
    session: async ({ session, token }) => {
      session.user = token.user;
      return session;
    },
  },
  secret: process.env.SECRET,
  adapter: MongoDBAdapter(connectDB)
};
export default NextAuth(authOptions); 