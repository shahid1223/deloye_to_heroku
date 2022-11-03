const nodemailer = require('nodemailer');

const sendEmail = (email, id) => {
    const tranporter = nodemailer.createTransport({
        service: 'hotmail',
        auth: {
            user: 'mohd_shahid_123@outlook.com',
            pass: 'shahid7860'
        }
    });

    const option = {
        from: 'mohd_shahid_123@outlook.com',
        to: email,
        subject: 'sending email with node js',
        text: 'hii, I am shahid to reset password click on the given link',
        html: `<a href='http://localhost:5000/api/user/forgotPassword/${email}/${id}' target='_blank' >hii, I am shahid to reset password click here to redirect on the reset password page<a/>`
    };

    tranporter.sendMail(option, function (err, info) {
        if (err) {
            return console.error(err.message)
        };

        console.log("send", info.response)
    });
};

module.exports = sendEmail;