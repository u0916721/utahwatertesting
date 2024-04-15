import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getDatabase, ref, push } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js';
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-analytics.js';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDLoh_5uSURrD0Os6rF6-2Q5uWYnY1iDWU",
    authDomain: "water-quality-6b814.firebaseapp.com",
    databaseURL: "https://water-quality-6b814-default-rtdb.firebaseio.com",
    projectId: "water-quality-6b814",
    storageBucket: "water-quality-6b814.appspot.com",
    messagingSenderId: "615836169680",
    appId: "1:615836169680:web:c7c54d68036140b7c9b5d5",
    measurementId: "G-FT0BE0PR74"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const submitButton = document.getElementById("submit");

const submitFollowUpButton = document.getElementById("submitFollowUp");
document.addEventListener('DOMContentLoaded', (event) => {
    submitFollowUpButton.addEventListener('click', submitFollowUpData);

});
function submitFollowUpData() {
    console.log(`Inside submitFollowUpData`);
    const easeOfSubmission = document.getElementById("easeOfSubmission").value;
    const likesDislikes = document.getElementById("likesDislikes").value;
    const preferredMethod = document.getElementById("preferredMethod").value;
    const reasonForPreference = document.getElementById("reasonForPreference").value;
    console.log(`the values are ${easeOfSubmission},${likesDislikes}, ${preferredMethod}, ${reasonForPreference}`);
    writeUserFollowUpData(easeOfSubmission, likesDislikes, preferredMethod, reasonForPreference)

    //     writeUserFollowUpData(easeOfSubmission, likesDislikes, preferredMethod, reasonForPreference);
    //     // I dont think this is needed,let them submit the amount of feedack that they nedd
    //     // if(likesDislikes === ''  || preferredMethod === '')
    //     // {
    //     //   alert("");
    //     //   return;
    //     // }
    //     //TODO: Add API post call here
    //     setTimeout(() => {
    //         console.log('2 seconds have passed.');
    //     }, 2000);
    //     window.location.href = "/thank-you.html";
    // }


}
async function writeUserFollowUpData(easeOfSubmission, likesDislikes, preferredMethod, reasonForPreference) {
    const db = getDatabase();
    const reference = ref(db, 'feedback/');
    push(reference, {
        easeOfSubmission: easeOfSubmission,
        likesDislikes: likesDislikes,
        preferredMethod: preferredMethod,
        reasonForPreference: reasonForPreference
    }).then(() => {
        window.location.href = "/thank-you.html";
    })
}