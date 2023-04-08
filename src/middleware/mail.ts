import { config } from '$/src/config/config.js';
import sgMail from '@sendgrid/mail';

export async function sendVerificationEmail(
  email: string,
  verificationToken: string
): Promise<void> {
  if (config.sendgrid.api_key && config.sendgrid.email_username) {
    sgMail.setApiKey(config.sendgrid.api_key);

    const msg = {
      to: email,
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      from: config.sendgrid.from_email!,
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
