// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');

// The Firebase Admin SDK to access the Firebase Realtime Database.
const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);


// Take the text parameter passed to this HTTP endpoint and insert it into the
// Realtime Database under the path /messages/:pushId/original
exports.addMessage = functions.https.onRequest((req, res) => {
  // Grab the text parameter.
  const original = req.query.text;

  console.log(req.body);

  res.status(200).send({ answer: 'here i am' });
});

//firebase deploy --only functions
//firebase serve --only functions


//Push the post to users, including this user, as he is contributor
//First get the story contributos
// firebase.database().ref(`/stories/${storyGenericUid}/users/contributors`)
//   .once('value')
//   .then((contributorSnapshot) => {
//     //then get story uid of contributors story
//     Object.keys(contributorSnapshot.val()).forEach((userId) => {
//       console.log('userId', userId);
//       firebase.database().ref(`/users/${userId}/userStories/`)
//         .orderByChild('storyGenericUid')
//         .equalTo(storyGenericUid)
//         .once('value')
//         .then((storiesSnapshot) => {
//           //finally insert contributors post
//           console.log('storyUid', Object.keys(storiesSnapshot.val())[0]);
//           firebase.database().ref(`/users/${userId}/posts/`)
//             .push({
//               link,
//               date: timestamp,
//               ownerID: currentUser.uid,
//               owner: 'Rick James',
//               storyUid: Object.keys(storiesSnapshot.val())[0],
//               storyName,
//               title
//             });
//           })
//         .catch((error) => {
//           console.log('Failed to insert a post for a contributor', userId, error);
//         });
//     });
//   });


//            storyUid: Object.keys(storiesSnapshot.val())[0],
//currentUser.uid
