exports.sendSMS = (client, fromNum, toNum, message, res) => { 
    client.messages.create({
            body: 'From: ' + message.name + '%0Email: ' + message.email + '%0Details: ' + message.enquiry,
            to: fromNum, // Text my number
            from: toNum // That's a valid TESTING number
        })
        .then((message) => res.send('Sms sent! ' + message.body))
        .catch(function (error) {
            console.log(error);
        })
        .done()
}