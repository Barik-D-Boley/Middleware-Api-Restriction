let emails = {};

// Checks for valid email addresses
function validateEmail(input) {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if (input.match(validRegex)) {
        console.log("Valid email address");
        return true;
    } else {
        console.log("Invalid email address");
        return false;
    }
}

// If the email has not been used before, then add it to an object, but if it has, then add 1 to it. If the number is equal to 6, return unauthorized.
const authorize = (req, res, next) => {
    const { email } = req.query

    if ((email == undefined) || (validateEmail(email) === false)) { // If no query, no input, or if the email is invalid, then the page errors out
        console.log('Unauthorized Request');
        res.send({ result: [], status: 401, message: 'Unauthorized Request' });
    } else if (!emails[email]) { // If the object does not have the email already in the object, it adds the email with a value of 1 to the object
        emails[email] = 1;
        console.log(emails);
        console.log('Authorized');
        req.user = { name: email }
        next()
    } else { // Adds 1 to the emails already in the object 
        emails[email]++;
        console.log(emails);
        if (emails[email] < 6) { // If the input email has a value of less than 6, it returns the page normally
            console.log('Authorized');
            req.user = { name: email }
            next()
        } else { // If the input email has been used more than 5 times, the page errors out
            console.log('Too many requests');
            res.send({ result: [], status: 429, message: 'Too many requests' });
        }
    }
}

module.exports = authorize;