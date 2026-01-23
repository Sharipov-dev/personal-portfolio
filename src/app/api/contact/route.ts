import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

interface ContactFormData {
    name: string;
    email: string;
    subject: string;
    message: string;
}

export async function POST(request: NextRequest) {
    try {
        const body: ContactFormData = await request.json();
        const { name, email, subject, message } = body;

        // Validate required fields
        if (!name || !email || !subject || !message) {
            return NextResponse.json(
                { error: 'All fields are required' },
                { status: 400 }
            );
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            );
        }

        // Create transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
        });

        // Email content
        const mailOptions = {
            from: process.env.EMAIL_USER,
            to: 'sharipov@sheridancollege.ca',
            replyTo: email,
            subject: `Portfolio Contact: ${subject}`,
            html: `
                <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%); border-radius: 16px; overflow: hidden;">
                    <div style="background: linear-gradient(135deg, #8b5cf6 0%, #6366f1 100%); padding: 30px; text-align: center;">
                        <h1 style="color: white; margin: 0; font-size: 24px;">New Transmission Received</h1>
                        <p style="color: rgba(255,255,255,0.8); margin: 10px 0 0 0;">From your portfolio contact form</p>
                    </div>

                    <div style="padding: 30px;">
                        <div style="background: rgba(139, 92, 246, 0.1); border-left: 4px solid #8b5cf6; padding: 20px; margin-bottom: 20px; border-radius: 0 8px 8px 0;">
                            <h3 style="color: #22d3ee; margin: 0 0 10px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Sender Information</h3>
                            <p style="color: #f1f5f9; margin: 5px 0;"><strong>Name:</strong> ${name}</p>
                            <p style="color: #f1f5f9; margin: 5px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: #22d3ee;">${email}</a></p>
                        </div>

                        <div style="background: rgba(34, 211, 238, 0.1); border-left: 4px solid #22d3ee; padding: 20px; margin-bottom: 20px; border-radius: 0 8px 8px 0;">
                            <h3 style="color: #8b5cf6; margin: 0 0 10px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Subject</h3>
                            <p style="color: #f1f5f9; margin: 0;">${subject}</p>
                        </div>

                        <div style="background: rgba(255, 255, 255, 0.05); padding: 20px; border-radius: 8px;">
                            <h3 style="color: #22d3ee; margin: 0 0 15px 0; font-size: 14px; text-transform: uppercase; letter-spacing: 1px;">Message</h3>
                            <p style="color: #cbd5e1; margin: 0; line-height: 1.8; white-space: pre-wrap;">${message}</p>
                        </div>
                    </div>

                    <div style="background: rgba(0,0,0,0.3); padding: 20px; text-align: center;">
                        <p style="color: #64748b; margin: 0; font-size: 12px;">
                            Sent from your portfolio at ${new Date().toLocaleString()}
                        </p>
                    </div>
                </div>
            `,
        };

        // Send email
        await transporter.sendMail(mailOptions);

        return NextResponse.json(
            { message: 'Transmission successful' },
            { status: 200 }
        );
    } catch (error) {
        console.error('Email error:', error);
        return NextResponse.json(
            { error: 'Failed to send transmission. Please try again later.' },
            { status: 500 }
        );
    }
}
