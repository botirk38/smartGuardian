import { NextResponse } from "next/server";
import { Resend } from 'resend';
import { EmailContactTemplate } from "@/components/ui/email-template-contact";



export async function POST(request: NextResponse) {
	const contactInfoResponse = await request.json();

	const resend = new Resend(process.env.RESEND_API_KEY);



	const { data, error } = await resend.emails.send({
		from: `onboarding@resend.dev`,
		to: ['btrghstk@gmail.com','yassinekj07@gmail.com', 'oudrhiriyouneslfim@gmail.com'],
		subject: `Contact email from ${contactInfoResponse.contactEmail} for SmartGuardian`,
		react: EmailContactTemplate({ firstName: contactInfoResponse.firstName, lastName: contactInfoResponse.lastName, message: contactInfoResponse.message }) as React.ReactElement


	})

	if (error) {
		console.error(error);
		return NextResponse.json({ error })

	}

	return Response.json({ data });




}