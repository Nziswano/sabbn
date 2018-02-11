import * as functions from 'firebase-functions';

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//

const Store = "earlyAdopters/{adopter}";

exports.createUser = functions.firestore
  .document(Store)
  .onCreate(event => {
    const newValue = event.data.data();

    const name = newValue.name;
    const email = newValue.email;

    console.log(name, email);
});
