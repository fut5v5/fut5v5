/* FUT 5V5 : réglages de l'application.
   1. apiUrl : l'URL de l'application Web du script Google (elle se termine par /exec).
   2. firebase et vapidKey : pour les notifications (voir le guide « Notifications »).
      Laisser vide tant que Firebase n'est pas configuré : l'application marche sans notifications. */
window.FUT5V5_CONFIG = {
  apiUrl: "https://script.google.com/macros/s/AKfycbxCISnwKmq6TCxWMgahOiH7EbxT7KoR9yvMjfNIswbZyvGeSunlb_ltTlm9_TVYlB3Eyw/exec",
  firebase: {
    apiKey: "AIzaSyAWPctpuNQDLOgryZ5Zrdsqf0YdJRfw91o",
    authDomain: "fut5v5-fd45a.firebaseapp.com",
    projectId: "fut5v5-fd45a",
    storageBucket: "fut5v5-fd45a.firebasestorage.app",
    messagingSenderId: "206760353100",
    appId: "1:206760353100:web:0c17d6abe5428624c083e9"
  },
  vapidKey: "BNXfT2SI6p0nVUQ2wPFMfOX6jgdOgdFQ6peqBfRps0bMQ1eCdjTJFwpmjheQ8iNBpz9vd9AX5iU74zo7_2dTCtU"
};
