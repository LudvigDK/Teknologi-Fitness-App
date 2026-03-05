importScripts("https://www.gstatic.com/firebasejs/12.10.0/firebase-app-compat.js");
importScripts("https://www.gstatic.com/firebasejs/12.10.0/firebase-messaging-compat.js");

firebase.initializeApp({
    apiKey: "AIzaSyC05n81RatYa69u-Ya0NHTcCXXiHU5T_y4",
    authDomain: "teknologi-fitness-app.firebaseapp.com",
    projectId: "teknologi-fitness-app",
    messagingSenderId: "234958831774",
    appId: "1:234958831774:web:ec6555a8c7e81ed74a3b8f"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {

    self.registration.showNotification(payload.notification.title, {
        body: payload.notification.body,
        icon: "/icon-192.png"
    });

});