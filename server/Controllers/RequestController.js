const Request = require("../Models/RequestModel");
const nodemailer = require("nodemailer");

module.exports.Request = async (req, res) => {
  const { name, email, message } = req.body;

  try {
    // Save the request in the database
    const newRequest = new Request({ name, email, message });
    await newRequest.save();

    // Send email notification
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.BUSINESS_EMAIL,
      subject: "New Restaurant Request",
      text: `
          You have received a new restaurant request:
          Name: ${name}
          Email: ${email}
          Message: ${message}
        `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    res.status(201).json({ message: "Request created successfully" });
  } catch (error) {
    console.error("Error creating request:", error);
    res.status(500).json({ error: "An error occurred" });
  }
};
