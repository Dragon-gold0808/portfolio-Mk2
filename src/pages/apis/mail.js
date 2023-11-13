import nodemailer from 'nodemailer';

export default function handler(req, res) {
  // if(req.method === 'POST') {

  //   // const output = `
  //   // <p>You have a new contact request</p>
  //   //   <h3>Contact Details</h3>
  //   //   <ul>  
  //   //     <li>Email: ${req.body.email}</li>
  //   //   </ul>
  //   //   <h3>Message</h3>
  //   //   <p>${req.body.message}</p>
  //   // `
  //   return res.status(200).json(req.body) ;
  //   let transporter = nodemailer.createTransport({
  //     service: "gmail",
  //     auth: {
  //       user: process.env.EMAIL,
  //       pass: process.env.PASSWORD
  //     }
  //   });

  //   let mailOptions = {
  //     from: req.body.email,
  //     to: process.env.EMAIL,
  //     subject: "New message from contact form",
  //     text: output
  //   };

  //   transporter.sendMail(mailOptions, (error, info) => {
  //     if(error) {
  //       return console.log(error);
  //     } else {
  //       res.status(200).json({result: "Success"});
  //     }
  //   })
  // } else {
  //   res.setHeader('Allow', ['POST']);
  //   res.status(405).end(`Method ${req.method} Not Allowed`)
  // }
  res.status(200).json({text: "Hello"});
}