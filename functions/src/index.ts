import * as functions from 'firebase-functions';
import * as nodemailer from 'nodemailer';

const Store = "earlyAdopters/{adopter}";

const gmailEmail = functions.config().gmail.email;
const gmailPassword = functions.config().gmail.password;

const mailTransport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: gmailEmail,
    pass: gmailPassword,
  },
});


exports.createUser = functions.firestore.document(Store).onCreate(
  (event) => {
    const newValue = event.data.data();
    const mailOptions = {
      from: '"Sabbn" <developer@sabbn.co.za>',
      to: newValue.email,
      subject: "Thank you for signing up",
      html: `<p>Thank you for signing up. Name: ${newValue.name} - Email: ${newValue.email} </p>`,
    };
    return mailTransport.sendMail(mailOptions)
    .then(() => console.log(`Email sent to ${newValue.email}`))
    .catch((error) => console.error("was an error sending an email", error))
  }
  );
