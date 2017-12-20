// The Cloud Functions for Firebase SDK to create Cloud Functions and setup triggers.
const functions = require('firebase-functions');
// The Firebase Admin SDK to access the Firebase Realtime Database.
const firebase = require('firebase-admin');

firebase.initializeApp(functions.config().firebase);

exports.createPost = functions.https.onRequest((req, res) => {
  const { currentUser, storyGenericUid, link, title } = req.body;

  //Push the post to users, including this user, as he is contributor
  //First get the story contributos
  firebase.database().ref(`/stories/${storyGenericUid}/users/contributors`)
    .once('value')
    .then((contributorSnapshot) => {
      //First loop and check, is the current user one of contributors
      let isContributor = false;
      Object.keys(contributorSnapshot.val()).forEach((userId) => {
        if (userId === currentUser.uid) isContributor = true;
      });

      if (!isContributor) {
        res.status(200).send({ error_code: 1, error_message: 'Unsupported action' });
        return;
      }

      //then get story uid of contributors story
      Object.keys(contributorSnapshot.val()).forEach((userId) => {
        firebase.database().ref(`/users/${userId}/userStories/`)
          .orderByChild('storyGenericUid')
          .equalTo(storyGenericUid)
          .once('value')
          .then((storiesSnapshot) => {
            //finally insert contributors post
            const storyUid =  Object.keys(storiesSnapshot.val())[0];
            firebase.database().ref(`/users/${userId}/posts/`)
              .push({
                link,
                date: firebase.database.ServerValue.TIMESTAMP,
                ownerID: currentUser.uid,
                owner: currentUser.displayName,
                storyUid,
                storyName: storiesSnapshot.val()[storyUid]['name'],
                title
              });
            })
          .catch((error) => {
            console.log('Failed to insert a post for a contributor', userId, error);
          });
      });
    }).catch(() => {
      res.status(200).send({ error_code: 2, error_message: 'Internal error' });
      return;
    })
    ;

    res.status(200).send({ error_code: 0, error_message: '' });
    return;
});
