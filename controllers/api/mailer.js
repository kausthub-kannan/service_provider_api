import nodemailer from "nodemailer"

const mailer = async (data) =>{
    const msg = {
        from: "serviceprovider0894@gmail.com",
        to:[data.email],
        subject: "Your "+ data.txt +"has been accepted successfully",
        text: "Kudos! Your "+ data.txt +" has been selected. Please conatact your client for further deatils"
        };
        
    nodemailer.createTransport({
        host: "gmail",
        auth: {
                user: "serviceprovider0894@gmail.com",
                pass: "ngzmkuyzwaokwbqu"
            },
        port: 465,
        host: 'smtp.gmail.com'
            }).sendMail(msg, (err)=>{
                if(err){
                    console.log(err)
                }else{
                    console.log("Email Sent")
                }
            });
}

export {mailer}