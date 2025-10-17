import {connectToDatabase} from '@/lib/dbConnection';

export async function GET(req) {
    try {
        const conn = await connectToDatabase();
        const db = conn.db ? conn.db() : conn;
        const users = await db.collection('users').find({}).toArray();

        return new Response(JSON.stringify(users), {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        });
    } catch (error) {
        console.error(error);
        return new Response(JSON.stringify({ error: 'Failed to fetch users' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}