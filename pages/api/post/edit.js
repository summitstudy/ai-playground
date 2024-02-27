import { connectDB } from "@/utils/database";
import { ObjectId } from "mongodb";

export default async function handler(요청, 응답) {
    if (요청.method == 'POST') {
        let 바꿀거 = { username : 요청.body.username, userpro : 요청.body.userpro};
        try{
        const db = (await connectDB).db('userinfoDB');
        let result = await db.collection('profiles').updateOne(
            {_id:new ObjectId(요청.body._id)},
            {$set:바꿀거});
            return 응답.redirect(302, '/user');
        }catch(error){
            return 응답.status(500).json("DB error");
        }
    }
}