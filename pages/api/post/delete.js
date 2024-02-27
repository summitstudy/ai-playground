import { connectDB } from "@/utils/database";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(요청, 응답) {
    if (요청.method == 'DELETE') {
        let session = await getServerSession(요청, 응답, authOptions);
        if (session != null) {
            try {
                const db = (await connectDB).db('userinfoDB');
                let 찾은거 = await db.collection('profiles').findOne({ _id: new ObjectId(요청.body) });
                if (찾은거.author == session.user.email) {
                    let result = await db.collection('profiles').deleteOne({ _id: new ObjectId(요청.body) })
                    
                    return 응답.json("success").redirect(302, '/user');
                } else {
                    return 응답.status(500).json('fail');
                }
            } catch (error) {
                return 응답.status(500).json("fail");
            }
        }
    }
}