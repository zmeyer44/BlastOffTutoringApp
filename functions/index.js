const functions = require('firebase-functions');
const admin = require('firebase-admin');

admin.initializeApp();
const db = admin.firestore();

//Sendgrid Config
const sgMail = require('@sendgrid/mail');

const API_KEY = functions.config().sendgrid.key;
const TEMPLATE_ID = functions.config().sendgrid.template;

sgMail.setApiKey(API_KEY);
//Email when new invite is created
exports.welcomeEmail = functions.firestore.document('users/{userId}').onCreate(async (change, context) => {
  const user = change.data();
  const msg = {
    to: user.email,
    from: 'zmeyer@blastofftutoring.com',
    template_Id: TEMPLATE_ID,
    dynamic_template_data: {
      subject: 'Welcome to Blast Off Tutoring!',
      name: `${user.firstName} ${user.lastName}`,
      text: 'We are so excited to start learning with you! Lets get started now.',
    },
  };

  return sgMail.send(msg);
});
//Email when new support ticket is created
exports.support = functions.firestore.document('support/{userId}').onCreate(async (change, context) => {
  const data = change.data();
  const emailData = {};
  if (data.type == 'newSchool') {
    emailData.subject = 'New School Request';
    emailData.name = `Unknown`;
    emailData.text = `School Name: ${data.schoolName}. School Website: ${data.schoolWebsite}. Contact Email: ${data.contactEmail}`;
  } else {
    emailData.subject = 'Service Ticket';
    emailData.name = `Email: ${data.userEmail}, Account: ${data.user}`;
    emailData.text = `Subject: ${data.subject}. Issue: ${data.issue}. Quality: ${data.quality}`;
  }
  const msg = {
    to: 'mitchellmeyer@blastofftutoring.com',
    from: 'zmeyer@blastofftutoring.com',
    template_Id: TEMPLATE_ID,
    dynamic_template_data: {
      ...emailData,
    },
  };

  return sgMail.send(msg);
});



//Email when new invite is created
exports.newMessage = functions.firestore.document('conversations/{convoId}').onUpdate(change => {
  const convo = change.after.data();
  if (convo.notification.from) {
    let senderName = '';
    let recipientName = '';
    let toEmail = '';
    const sender = convo.notification.from;
    if (convo.user1.id == sender) {
      senderName = convo.user1.name;
      recipientName = convo.user2.name;
      toEmail = convo.user2.email;
    } else {
      senderName = convo.user2.name;
      recipientName = convo.user1.name;
      toEmail = convo.user1.email;
    }

    const msg = {
      to: toEmail,
      from: 'zmeyer@blastofftutoring.com',
      template_Id: TEMPLATE_ID,
      dynamic_template_data: {
        subject: `New message from ${senderName}`,
        name: recipientName,
        text: `${senderName} has sent you a message! Please login in to view the message and respond.`,
      },
    };

    return sgMail.send(msg);
  }
  return;
});

//Email when new message is sent
exports.newInvite = functions.firestore.document('sessions/{sessionId}').onCreate(async (change, context) => {
  const session = change.data();

  const msg = {
    to: session.student.email,
    from: 'zmeyer@blastofftutoring.com',
    template_Id: TEMPLATE_ID,
    dynamic_template_data: {
      subject: 'New session invite!',
      name: session.student.name,
      text: `${session.tutor.name} has sent you a session invite! The session is for ${session.title} in ${session.subject}. It is scheduled for ${session.date} at ${session.time}. Please login in to accept now if everything works for you!`,
    },
  };

  return sgMail.send(msg);
});

//New review
exports.newReview = functions.firestore.document('reviews/{reviewId}').onCreate(async (change, context) => {
  const review = change.data();

  const query = await db
    .collection('users')
    .doc(`${review.tutor.id}`)
    .get();
  const tutorData = query.data();
  if (tutorData.reviewCount > 0) {
    let totalScore = tutorData.reviewCount * tutorData.rating;

    totalScore += review.rating;

    const newCount = tutorData.reviewCount + 1;

    let newRating = totalScore / newCount;
    newRating = parseFloat(newRating).toFixed(2);

    return await db
      .collection('users')
      .doc(`${review.tutor.id}`)
      .update({ rating: newRating, reviewCount: newCount });
  } else {
    return await db
      .collection('users')
      .doc(`${review.tutor.id}`)
      .update({ rating: review.rating, reviewCount: 1 });
  }
});

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


