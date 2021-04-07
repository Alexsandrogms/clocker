import firebaseAdmin from 'firebase-admin';

firebaseAdmin.apps.length
  ? firebaseAdmin.app()
  : firebaseAdmin.initializeApp({
      credential: firebaseAdmin.credential.cert({
        projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY
          ? JSON.parse(process.env.FIREBASE_PRIVATE_KEY)
          : undefined,
      }),
    });

export { firebaseAdmin };
