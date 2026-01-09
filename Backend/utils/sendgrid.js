import sgMail from "@sendgrid/mail";

// ✅ YAHAN SECRET KEY LOAD HOTI HAI
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const sendEmail = async ({ to, subject, html }) => {
  try {
    await sgMail.send({
      to,
      from: process.env.SENDER_EMAIL, // verified email
      subject,
      html,
    });

    console.log("✅ SendGrid: Email sent");
  } catch (err) {
    console.error("❌ SendGrid ERROR ↓↓↓");
    console.error(err.response?.body || err.message);
    throw new Error("Email sending failed");
  }
};
