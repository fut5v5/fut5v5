/* FUT 5V5 : réglages de l'application.
   1. apiUrl : l'URL de l'application Web du script Google (elle se termine par /exec).
   2. firebase et vapidKey : pour les notifications (voir le guide « Notifications »).
      Laisser vide tant que Firebase n'est pas configuré : l'application marche sans notifications. */
window.FUT5V5_CONFIG = {
  apiUrl: "https://script.google.com/macros/s/AKfycbwTgGsvy94iJuZejy8WHVWpA32IFZSKicAktu2t2atLNOSophiRrP-ZMdfBq1XVUZbcQw/exec",
  firebase: {
  apiKey: "AIzaSyBwg52lb5lFvWPBXzpxuBF0qYUu_7DkKWg",
  authDomain: "fut5v5-87481.firebaseapp.com",
  projectId: "fut5v5-87481",
  storageBucket: "fut5v5-87481.firebasestorage.app",
  messagingSenderId: "923194103505",
  appId: "1:923194103505:web:58c39231698d415adc17f0"
  },
  vapidKey: "BGgw4QNjde-gLO_ood12vNWdQvlg0p06gaCy3XZ-V53B6XGXgYD0ZbAk9o8kL4vSlzdJzODKyI-97B-SaAgaCPM"
};
