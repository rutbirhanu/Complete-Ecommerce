
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js');

const firebaseConfig = {
    apiKey: "",
    authDomain: "f",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};

firebase.initializeApp(firebaseConfig);

// Retrieve Firebase Messaging instance to handle background messages
const messaging = firebase.messaging();

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
