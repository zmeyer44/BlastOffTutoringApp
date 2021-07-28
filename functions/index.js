const functions = require("firebase-functions");
const admin = require("firebase-admin");

admin.initializeApp();
const db = admin.firestore();

//Sendgrid Config
const sgMail = require("@sendgrid/mail");


const API_KEY = functions.config().sendgrid.key;
const TEMPLATE_ID = functions.config().sendgrid.template;

sgMail.setApiKey(API_KEY);
//Email when new invite is created
exports.welcomeEmail = functions.firestore.document('users/{userId}').onCreate( async (change, context) => {
    const user = change.data();
    const msg = {
        to: user.email,
        from: 'zmeyer@blastofftutoring.com',
        template_Id: TEMPLATE_ID,
        dynamic_template_data: {
            subject: 'Welcome to Blast Off Tutoring!',
            name: `${user.firstName} ${user.lastName}`,
            text: 'We are so excited to start learning with you! Lets get started now.'
        }

    };

    return sgMail.send(msg);
})

//Email when new invite is created
exports.newInvite = functions.firestore.document('sessions/{sessionId}').onCreate( async (change, context) => {
    const session = change.data();

    const msg = {
        to: session.student.email,
        from: 'zmeyer@blastofftutoring.com',
        template_Id: TEMPLATE_ID,
        dynamic_template_data: {
            subject: 'New session invite!',
            name: session.student.name,
            text: `${session.tutor.name} has sent you a session invite! The session is for ${session.title} in ${session.subject}. It is scheduled for ${session.date} at ${session.time}. Please login in to accept now if everything works for you!`,
        }
    }

    return sgMail.send(msg);
})

//New review
exports.newReview = functions.firestore.document('reviews/{reviewId}').onCreate( async (change, context) => {
    const review = change.data();

    const query = await db.collection('users').doc(`${review.tutor.id}`).get();
    const tutorData = query.data();
    if(tutorData.reviewCount > 0){


    let totalScore = tutorData.reviewCount * tutorData.rating;
   
    totalScore += review.rating;
   
    const newCount = tutorData.reviewCount + 1;

    let newRating = (totalScore / newCount);
    newRating = parseFloat(newRating).toFixed(2)

    return await db.collection('users').doc(`${review.tutor.id}`).update({rating: newRating, reviewCount: newCount})
    } else {

    return await db.collection('users').doc(`${review.tutor.id}`).update({rating: review.rating, reviewCount: 1})

    }


})



// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
