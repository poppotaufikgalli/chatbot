// app/api/chat/route.ts
import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { matchFAQ } from "@/lib/rules";
import { v4 as uuid } from "uuid";

export async function POST(req: Request) {
    const { message, sessionId } = await req.json();
    const sid = sessionId || uuid();

    await db.query(
        "INSERT IGNORE INTO chat_session (id) VALUES (?)",
        [sid]
    );

    const [faqs]: any = await db.query("SELECT * FROM faq");
    const answer = matchFAQ(message, faqs);

    await db.query(
        "INSERT INTO chat_message (session_id,sender,message) VALUES (?,?,?)",
        [sid, "user", message]
    );

    if (answer) {
        await db.query(
            "INSERT INTO chat_message (session_id,sender,message) VALUES (?,?,?)",
            [sid, "bot", answer]
        );

        return NextResponse.json({
            sessionId: sid,
            reply: answer,
            from: "bot"
        });
    }

    await db.query(
        "UPDATE chat_session SET status='agent' WHERE id=?",
        [sid]
    );

    return NextResponse.json({
        sessionId: sid,
        reply: "Saya hubungkan ke agen kami 🙏",
        from: "system",
        handoff: true
    });
}
