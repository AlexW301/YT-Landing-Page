// setTimeout(function(){ document.querySelector('video').muted = false }, 5000);

let clicked = false;

let conversion = () => {
    if (!clicked) {
        // GET VALUES FROM DOM
    let usersName = document.querySelector('.name-input').value
    let usersEmail = document.querySelector('.email-input').value
    // CHECK IF FIELDS ARE FILLED OUT
    if (usersName.indexOf(' ') !== -1 && usersEmail.indexOf('@') !== -1) {
        // SPLIT FULL NAME INTO FIRST AND LAST
        let nameArr = usersName.split(' ')
        let firstName = nameArr[0]
        let lastName = nameArr[1]
        // PUSH NEW DOCUMENT TO FIREBASE
        firebase.firestore().collection("youtube-leads").add({
            firstName: firstName,
            lastName: lastName,
            email: usersEmail,
            date: Date()
        }).then((docRef) => {
            console.log("Document written with ID: ", docRef.id);
            // TRACK CONVERSION and go to link
            gtag_report_conversion('https://www.blink.mortgage/app/signup/p/premiermortgagelendingllc/michaelcomerfordg')
            // GO TO BLINK LINK do not use this
            // window.location.href = 'https://www.blink.mortgage/app/signup/p/premiermortgagelendingllc/'
        })
            .catch((error) => {
                console.error("Error adding document: ", error);
            });
        // CONSOLE LOG COLLECTED INFORMATION
        console.log(`First Name: ${firstName}`)
        console.log(`Last Name: ${lastName}`)
        console.log(`Email: ${usersEmail}`)
        // Set status to already clicked
        clicked = true;

    } else if (usersName.indexOf(' ') === -1) {
        // IF NAME IS NOT FULL
        alert('Please enter your full name')
    } else if (usersEmail.indexOf('@') === -1) {
        // IF NAME IS NOT FULL
        alert('Please enter valid email')
    }
    } else if (clicked) {
        console.log('already clicked')
    }
}

document.querySelector('.conversion-btn').addEventListener('click', conversion)