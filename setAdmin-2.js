const admin = require('firebase-admin');
require('dotenv').config();

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
});

const uid = process.env.ADMIN_UID;

if (!uid) {
  console.error('Missing ADMIN_UID in .env');
  process.exit(1);
}

admin.auth().setCustomUserClaims(uid, { admin: true })
  .then(() => {
    console.log(`Admin claim set successfully for UID: ${uid}`);
    process.exit(0);
  })
  .catch((err) => {
    console.error('Error setting admin claim:', err);
    process.exit(1);
  });
