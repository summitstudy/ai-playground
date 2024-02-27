import { connectDB } from "@/utils/database";
import bcrypt from 'bcrypt';
function isValidUsername(username) {
    const regex = /^[a-z0-9_-]{5,20}$/;
    return regex.test(username);
}
function isValidPassword(password) {
    const regex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,16}$/;
    return regex.test(password);
}
function doPasswordsMatch(password, password2) {
    return password === password2;
}
export default async function handler(요청, 응답) {
    if (요청.method === 'POST') {
        const { name, email, password, password2 } = 요청.body;
        if (!name || !email || !password) {
            응답.status(400).json({ message: '모든 필드를 채워주세요.' });
            return;
        }
        if (!isValidUsername(email)) {
            응답.status(400).json({ message: '아이디: 5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.' });
            return;
        }
        if (!isValidPassword(password)) {
            응답.status(400).json({ message: '비밀번호: 8~16자의 영문, 숫자, 특수문자를 사용해 주세요.' });
            return;
        }
        if (!doPasswordsMatch(password, password2)) {
            응답.status(400).json({ message: '비밀번호가 일치하지 않습니다.' });
            return;
        }
        let db = (await connectDB).db('userinfoDB');
        const existingUser = await db.collection('user_cred').findOne({ email: email });
        if (existingUser) {
            응답.status(400).json({ message: '이미 존재하는 아이디입니다.' });
            return;
        }
        let hash = await bcrypt.hash(password, 1);      
        await db.collection('user_cred').insertOne({
            name: name,
            email: email,
            password: hash
        });
        await db.collection('userActions').insertOne({
            email: email,
            chapter: "1",
            nickname: "Mimi",
        });
        응답.status(200).json({ message: '가입이 완료되었습니다.' });
    }
}
