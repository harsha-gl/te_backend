const nodemailer = require('nodemailer');
// const path = require('path')
// const fs = require('fs')

// const ThanksEmail = path.join(__dirname, '../view/email.html');

const clientMail = async(req, res, next) => {
    try {
        const {
            name,
            email,
            phone,
            description
        } = req.body;
        var transporter = nodemailer.createTransport({
            host: "smtpout.secureserver.net",
            port: 465,
            secure: false,
            requireTLS: true,
            service: "Godaddy",
            auth: {
                user: process.env.Email,
                pass: process.env.Password,
            },
        });
        var mailOptions = {
            from: process.env.Email,
            to: process.env.ClientMail,
            subject: "Enquiry mail ",
            html: `<h1><strong>Name: </strong>${name}</h1> </br>
        <h1><strong>Email: </strong>${email}</h1> </br>
        <h1><strong>Phone: </strong>${phone}</h1> </br>
        <h1><strong>Message: </strong>${description}</h1> </br>`,
        };
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error)
                res.status(404).json({
                    error: true,
                    message: "Something went wrong"
                })
            } else {
                sendAccToClient(req.body);
                console.log("email sent" + info.response)
                res.status(200).json({
                    error: false,
                    message: "Thank you for reaching Us",
                    html: ``
                })
            }
        })

    } catch (err) {
        next(err.message);
    }
}

const careerMail = async(req, res, next) => {
    try {
        const {
            fullName,
            emailId,
            phoneNo,
            currentCompany,
            additionalInfo
        } = req.body
        console.log(req.body);
        if (req.file !== null && req.file !== undefined) {
            let pathName = `./Resumes/${req.file.filename}`
            var transporter = nodemailer.createTransport({
                host: 'smtpout.secureserver.net',
                port: 465,
                secure: false,
                requireTLS: true,
                service: 'Godaddy',
                auth: {
                    user: process.env.Email,
                    pass: process.env.Password
                }
            });
            var mailOptions = {
                from: process.env.Email,
                to: process.env.CareerMail,
                subject: 'Career Enqury',
                html: "<h1> Hello </h1>",
                attachments: [{
                    filename: req.file.filename,
                    path: `./Resumes/${req.file.filename}`
                }]
            };
            await transporter.sendMail(mailOptions, function(error) {
                if (error) {
                    console.log("Error sending mail", error);
                } else {
                    console.log("Mail sent successfully");
                }
            });
            sendAccToCandidate(req.body);
            res.status(200).json({
                error: false,
                message: "ThankYou for your interest"
            })
        } else {
            res.status(404).json({
                error: true,
                message: "Please upload your CV"
            })
        }
    } catch (err) {
        next(err.message)
    }
}

const sendAccToClient = async(req, res, next) => {
    // const EmailTemplate = await fs.readFileSync(ThanksEmail, { encoding: 'utf-8' })
    var transporter = nodemailer.createTransport({
        host: 'smtpout.secureserver.net',
        port: 465,
        secure: false,
        requireTLS: true,
        service: 'Godaddy',
        auth: {
            user: process.env.Email,
            pass: process.env.Password
        }
    });
    var mailOptions = {
        from: process.env.Email,
        to: req.email,
        subject: 'Techno Elevate',
        html: ` <div>
        <div style="text-align: center;">
            <img src="https://breezie-prod-files.s3.amazonaws.com/images/screens/Screen1652762703109" alt="" style="height: 12%; width: 12%;">
        </div>
        <p style="font-weight: 700; font-family: system-ui; font-size: 30px; text-align: center; margin: 0px;">Thanks</p>
        <div style="margin-top: 20px; margin-bottom: 30px; font-weight: 700; font-family: system-ui; font-size: 20px; text-align: center;">
            <p style=" margin: 4px; color: black;">We've receieved your request, and will</p>
            <p style=" margin: 4px;  color: black;">get in touch with you shortly</p>
        </div>
        <hr style="width: 600px;">
        <div style="margin-top: 30px;font-weight: 600; font-family: system-ui; font-size: 20px; text-align: center; color: gray;">
            <p style=" margin: 3px;">TechnoElevate</p>
            <p style=" margin: 3px;">Vijayanagaram Layout, Jayanagar,</p>
            <p style=" margin: 3px;">Bengaluru,Karnatak 560070</p>
        </div>
    </div>`

    };
    await transporter.sendMail(mailOptions, function(error) {
        if (error) {
            console.log("Error sending mail", error);
        } else {
            console.log("Mail sent successfully");
        }
    });
}



const sendAccToCandidate = async(req, res, next) => {
    // const EmailTemplate = await fs.readFileSync(ThanksEmail, { encoding: 'utf-8' })
    var transporter = nodemailer.createTransport({
        host: 'smtpout.secureserver.net',
        port: 465,
        secure: false,
        requireTLS: true,
        service: 'Godaddy',
        auth: {
            user: process.env.Email,
            pass: process.env.Password
        }
    });
    var mailOptions = {
        from: process.env.Email,
        to: req.emailId,
        subject: 'Techno Elevate',
        html: ` <div>
        <div style="text-align: center;">
            <img src="https://breezie-prod-files.s3.amazonaws.com/images/screens/Screen1652762703109" alt="" style="height: 12%; width: 12%;">
        </div>
        <p style="font-weight: 700; font-family: system-ui; font-size: 30px; text-align: center; margin: 0px;">Thanks</p>
        <div style="margin-top: 20px; margin-bottom: 30px; font-weight: 700; font-family: system-ui; font-size: 20px; text-align: center;">
            <p style=" margin: 4px; color: black;">We've receieved your request, and will</p>
            <p style=" margin: 4px;  color: black;">get in touch with you shortly</p>
        </div>
        <hr style="width: 600px;">
        <div style="margin-top: 30px;font-weight: 600; font-family: system-ui; font-size: 20px; text-align: center; color: gray;">
            <p style=" margin: 3px;">TechnoElevate</p>
            <p style=" margin: 3px;">Vijayanagaram Layout, Jayanagar,</p>
            <p style=" margin: 3px;">Bengaluru,Karnatak 560070</p>
        </div>
    </div>`

    };
    await transporter.sendMail(mailOptions, function(error) {
        if (error) {
            console.log("Error sending mail", error);
        } else {
            console.log("Mail sent successfully");
        }
    });

}

module.exports = {
    clientMail,
    careerMail
}