const express = require('express');
const nodemailer = require('nodemailer');
const rateLimit = require('express-rate-limit');
const router = express.Router();

// Rate limiting for contact form
const contactLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // limit each IP to 5 contact form submissions per windowMs
  message: {
    error: 'Too many contact form submissions',
    message: 'Please wait before sending another message'
  }
});

// Input validation middleware
const validateInput = (req, res, next) => {
  const { name, email, message } = req.body;
  
  if (!name || !email || !message) {
    return res.status(400).json({
      error: 'Missing required fields',
      message: 'Name, email, and message are required'
    });
  }
  
  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      error: 'Invalid email',
      message: 'Please provide a valid email address'
    });
  }
  
  // Length validation
  if (name.length > 100 || message.length > 1000) {
    return res.status(400).json({
      error: 'Input too long',
      message: 'Name must be under 100 characters, message under 1000 characters'
    });
  }
  
  next();
};

// Contact form endpoint
router.post('/', contactLimiter, validateInput, async (req, res) => {
  const { name, email, message, subject = 'Portfolio Contact' } = req.body;

  try {
    // Create transporter
    const transporter = nodemailer.createTransporter({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      },
      secure: true
    });

    // Verify transporter
    await transporter.verify();

    // Email options
    const mailOptions = {
      from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER || 'jaichaudhary0303@gmail.com',
      replyTo: email,
      subject: `Portfolio: ${subject} - from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #87CEEB, #FFB6C1); padding: 20px; border-radius: 10px 10px 0 0; }
            .header h2 { color: white; margin: 0; text-align: center; }
            .content { background: #f9f9f9; padding: 20px; border-radius: 0 0 10px 10px; }
            .field { margin-bottom: 15px; }
            .field strong { color: #2F4F4F; }
            .message-box { background: white; padding: 15px; border-left: 4px solid #87CEEB; margin: 15px 0; }
            .footer { text-align: center; margin-top: 20px; color: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>🏔️ New Portfolio Contact</h2>
            </div>
            <div class="content">
              <div class="field">
                <strong>From:</strong> ${name}
              </div>
              <div class="field">
                <strong>Email:</strong> ${email}
              </div>
              <div class="field">
                <strong>Subject:</strong> ${subject}
              </div>
              <div class="field">
                <strong>Received:</strong> ${new Date().toLocaleString()}
              </div>
              <div class="message-box">
                <strong>Message:</strong><br>
                ${message.replace(/\n/g, '<br>')}
              </div>
            </div>
            <div class="footer">
              Sent via Jai Chaudhary's Portfolio Website
            </div>
          </div>
        </body>
        </html>
      `,
      text: `
        New Portfolio Contact
        
        From: ${name}
        Email: ${email}
        Subject: ${subject}
        Received: ${new Date().toLocaleString()}
        
        Message:
        ${message}
      `
    };

    // Send email
    const info = await transporter.sendMail(mailOptions);
    
    console.log('Email sent successfully:', info.messageId);
    
    res.status(200).json({ 
      success: true,
      message: 'Message sent successfully! I\'ll get back to you soon.',
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    console.error('Email error:', error);
    
    res.status(500).json({ 
      error: 'Failed to send message',
      message: 'There was an error sending your message. Please try again later or contact me directly.',
      timestamp: new Date().toISOString()
    });
  }
});

// Test endpoint
router.get('/test', (req, res) => {
  res.json({
    message: 'Contact route is working!',
    emailConfigured: !!process.env.EMAIL_USER,
    timestamp: new Date().toISOString()
  });
});

module.exports = router;
