import Contact from '../models/Contact.js';
import nodemailer from 'nodemailer';
import axios from 'axios';

const sendTelegramMessage = async (message) => {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  
  try {
    await axios.post(url, {
      chat_id: chatId,
      text: message,
      parse_mode: 'HTML',
    });
  } catch (error) {
    console.error('Telegram error:', error.message);
  }
};

const sendEmail = async (name, email, message) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
  
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: `New Contact from ${name}`,
    html: `
      <h3>New Contact Form Submission</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong></p>
      <p>${message}</p>
    `,
  };
  
  await transporter.sendMail(mailOptions);
};

export const submitContact = async (req, res) => {
  try {
    const { name, email, message } = req.body;
    
    const contact = await Contact.create({ name, email, message });
    
    const telegramMsg = `
🔐 <b>New Contact from Portfolio</b>
👤 <b>Name:</b> ${name}
📧 <b>Email:</b> ${email}
💬 <b>Message:</b> ${message}
    `;
    
    await sendTelegramMessage(telegramMsg);
    await sendEmail(name, email, message);
    
    res.status(201).json({ message: 'Message sent successfully!' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};