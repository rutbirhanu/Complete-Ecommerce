// import { initializeApp } from "firebase/app"
// import { getAuth, GoogleAuthProvider } from "firebase/auth"
// import {getMessaging, getToken, onBackgroundMessage} from "firebase/messaging/sw"

importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "AIzaSyBaDvJDenMtqkqzkBFWGW67NEzuv06AKVI",
    authDomain: "farm-advisor-dd8c6.firebaseapp.com",
    projectId: "farm-advisor-dd8c6",
    storageBucket: "farm-advisor-dd8c6.appspot.com",
    messagingSenderId: "604426101864",
    appId: "1:604426101864:web:4792c1e4d19d4e684bc7dd",
    measurementId: "G-NEQ5MPG72Y"
};

firebase.initializeApp(firebaseConfig);

// Retrieve Firebase Messaging instance to handle background messages
const messaging = firebase.messaging();

// Handle background notification messages

// messaging.onBackgroundMessage(function(payload) {
//     console.log('[firebase-messaging-sw.js] Received background message ', payload);
    
//     const notificationTitle = payload.notification.title;
//     const notificationOptions = {
//         body: payload.notification.body,
//  // Optional, specify a path to your notification icon
//     };

//     // Display the notification to the user
//     self.registration.showNotification(notificationTitle, notificationOptions);
// });



// In your firebase-messaging-sw.js

self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'foreground') {
        const { title, body } = event.data;

        // Show notification
        self.registration.showNotification(title, {
            body: body,
// Ensure this path is correct
            // Other options if necessary
        });
    }
});
