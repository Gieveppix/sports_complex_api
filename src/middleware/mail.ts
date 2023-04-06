import dotenv from 'dotenv';
import sgMail from '@sendgrid/mail';

dotenv.config();

export async function sendVerificationEmail(
  email: string,
  verificationToken: string
): Promise<void> {
  if (process.env.SENDGRID_API_KEY && process.env.SENDGRID_FROM_EMAIL) {
    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
      to: email,
      from: process.env.SENDGRID_FROM_EMAIL,
      subject: 'Email Verification',
      text: `Please click the link to verify your email: http://localhost:3000/api/verify-email/${verificationToken}`,
    };

    await sgMail.send(msg);
  }
}
