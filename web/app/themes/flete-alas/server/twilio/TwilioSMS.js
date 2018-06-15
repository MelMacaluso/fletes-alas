exports.sendSMS = (client, fromNum, toNum, message, res) => { 
    client.messages.create({
            body: 'From: ' + message.name + '\nEmail: ' + message.email + '\nDetails: ' + message.enquiry,
            to: toNum, // Text my number
            from: fromNum // That's a valid TESTING number
        })
        .then((message) => res.send('Sms sent! ' + message.body))
        .catch(function (error) {
            console.log(error);
        })
        .done()
}