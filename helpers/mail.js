const formData = require("form-data");
const Mailgun = require("mailgun.js");
const mailgun = new Mailgun(formData);

const API_KEY = process.env.MAILGUN_API_KEY;
const DOMAIN = process.env.MAILGUN_DOMAIN;

const mg = mailgun.client({
username: DOMAIN,
key: API_KEY
});


const sendMail = async ({ from, to, subject, html }) => {
const messageBody = {
    from: from ?? "Abamade <no-reply@abamade.com.ng>",
    to,
    subject,
    html
};



try {
    const message = await mg.messages.create(DOMAIN, messageBody);

    await message;
    return { data: true };
} catch (err) {
    console.log(err);
    return { error: "Something went wrong", message: err.details };
}
};

module.exports = {
sendMail
};
