import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import admin from "firebase-admin";

const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT_KEY);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const app = express();
app.use(cors());
app.use(express.json());

// Email sender (Gmail example)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Endpoint your Expo app will call
app.post("/sendVerification", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email.toLowerCase().endsWith("@ufl.edu")) {
      return res.status(400).json({ error: "Must use @ufl.edu email" });
    }

    const actionCodeSettings = {
      url: "https://YOUR-VERIFY-PAGE-URL.com/verify-email",
      handleCodeInApp: false,
    };

    const link = await admin
      .auth()
      .generateEmailVerificationLink(email, actionCodeSettings);

    await transporter.sendMail({
      from: '"POD Connect" <no-reply@your-domain.com>',
      to: email,
      subject: "Verify your UFL email",
      html: `
        <p>Welcome to POD Connect!</p>
        <p>Click below to verify your @ufl.edu email:</p>
        <a href="${link}">Verify Email</a>
      `,
    });

    res.json({ success: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send verification email" });
  }
});

app.listen(3000, () => console.log("Server running on port 3000"));