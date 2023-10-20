const nodemailer=require('nodemailer')

const sendEmail= async options=>{
    //create a transporter

    const transporter=nodemailer.createTransport(
        {
            host:"smtp-relay.brevo.com",
            port:587,
            auth :{
                user:"kamalpanwar80060@gmail.com",
                pass:"UGF278xp0hLzVNX6"

            }
          
        }
    )

    //define the email options
    const mailOptions={
        from:'Kamal Panwar<kamalpanwar80060@gmail.com>',
        to:options.email,
        subject :options.subject,
        text:options.message

    }

    //send the email with nodemailer

    await transporter.sendMail(mailOptions)

}
module.exports=sendEmail