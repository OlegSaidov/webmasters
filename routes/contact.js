var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var mailer = require('nodemailer');

var transporter = mailer.createTransport({service:'gmail', 
auth: {
        user: 'touro.msin.636@gmail.com',
        pass: 'tourocollege'

}

});
//form data goes here

router.post('/', (req, res, next) => {

    // get the body of the form and assign each element to a variable
    console.log(req.body)
    var info = req.body
    var name = info.name
    var email = info.email
    var mobile = info.mobile
    var carrier =info.carrier
    var subject = info.subject
    var message = info.message
    var getCopyBy = info.contact

    //carriers object
    var network = {
    'att'      :'@txt.att.net',
    'tmobile'  : '@tmomail.net',
    'verizon'  : '@vtext.com',
    'metro'    : '@mymetropcs.com',
    'sprint'   : '@messaging.sprintpcs.com'
    }

    //Time to check how user wants get a copy of what he wrote to us, by email or by phone

    if(getCopyBy == "email"){
    var mailOptions = {
        from: 'Webmasters',
        to:  email,
        subject: 'Received: ' + subject,
        html: `Hello ${name},<br/> Thank you very much for reaching us. Here is what we have received:<br/><pre> ${message}</pre><br/> We'll review it, and get back to you as soon as possible. <br/> Best, <br/> The Webmasters Team` 
    }

    transporter.sendMail(mailOptions, (error, inform) => {
        if(error){
            console.log(error)
        }else{
            console.log(`Email sent to ${name} at ${email}.`)
            
            res.send(`<p>Thank you ${name}, we are processing your request.<br/> We'll send you a confirmation to ${email}, shortly.<p>`);
        }
    });

    }else if(getCopyBy == "phone"){
    console.log("no, text her, she doen't read emails");

    var mailOptions = {
        from: 'touro.msin.636@gmail.com',
        to:  mobile + network[carrier],
        subject: 'Received: ' + subject,
        text: `Hello ${name}, we have received your message. We're working on it. Thank you` 
    }
      console.log(mobile + network[carrier]);
    transporter.sendMail(mailOptions, (error, inform) => {
        if(error){
            console.log(error)
        }else{
            console.log(`Text message sent to ${name} at ${mobile}.`)
            
            res.send(`<p>Thank you ${name}, we are processing your request.<br/> We'll send you a confirmation to ${mobile}, shortly.<p>`);
        }
    });
    


    }else{
      
        console.log(`Somebody is trying to hack the contact form`)
            
        res.send(`<p>Sorry, ${name}, we can't process your request.<br/> We only send e-mails and text messages period<p> <p>Try again, and remeber to choose "email" or "sms" option on the contact form. </p>`);

    } 


});

router.get('/', (req, res, next) => {
    res.render('contact', {title:"Contact Us"})
});

module.exports = router;