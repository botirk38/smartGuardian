import { stat } from "fs";

export async function POST(request: Request) {
    const code = await request.json();

    try {
        const response = await fetch("http://localhost:8080/api/analyze-code", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(code),
        });

        if (!response.ok) {
            return new Response(
                JSON.stringify({ error: "Failed to analyze code" }),
                { status: 500 }
            );
        }

        return new Response(JSON.stringify({ data: await response.json() }), {
            status: 200,
        });
    } catch (err: any) {
        console.error(err);
        return new Response(
            JSON.stringify({ error: "Failed to analyze code" }),
            { status: 500 }
        );
    }
}
