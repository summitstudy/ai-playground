// import { getServerSession } from 'next-auth';
// import { authOptions } from "@/pages/api/auth/[...nextauth].js";
// import { connectDB } from "@/utils/database.js";

export default async function Getuserinfo() {
    // let session = await getServerSession(authOptions);
    // if (session) {
    //     let db = (await connectDB).db('userinfoDB');
    //     let result = await db.collection('userActions').findOne({ $text: { $search: session.user.email } });
    //     result = {
    //         ...result,
    //         _id: result._id.toString()
    //     };
    //     return {session, result};
    // }else{
    //     return;
    // }
    return;
}