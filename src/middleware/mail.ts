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

    (async () => {
      try {
        await sgMail.send(msg);
      } catch (error) {
        console.error(error);

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        if (error.response) {
          // eslint-disable-next-line @typescript-eslint/ban-ts-comment
          // @ts-ignore
          console.error(error.response.body);
        }
      }
    })();
  }
}
