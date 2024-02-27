import { connectDB } from "@/utils/database";
import { getServerSession } from "next-auth";
import { useRouter } from 'next/router';
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(요청, 응답) {
    let session = await getServerSession(요청,응답,authOptions);
    if(session) {
        요청.body.author = session.user.email;
    }
    if (요청.method == 'POST') {
        if (요청.body.username == '') {
            return 응답.status(500).json("제목을 입력해주세요.");
        } else {
            try{
            const db = (await connectDB).db("userinfoDB");
            let result = await db.collection('profiles').insertOne(요청.body);
            return 응답.redirect(302, '/user');
            }catch(error){
                return 응답.status(500).json("DB error");
            }
        }
    }
}
