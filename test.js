// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getDatabase, ref, push,onValue } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js';
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

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const submitButton = document.getElementById("submit");

document.addEventListener('DOMContentLoaded', (event) => {
    console.log(`Submit Button ${submitButton}`);
    submitButton.addEventListener('click', submitData);
    //const submitFollowUpButton = document.getElementById("submitFollowUp");
    // submitFollowUpButton.addEventListener('click', submitFollowUpData);

});
document.addEventListener('DOMContentLoaded', (event) => {
    event.preventDefault();
    // const form = document.getElementById("followUpForm");
    //window.location.href = "/followup.html";
    // const form = document.getElementById('followUpForm');

    // form.addEventListener('submit', function (e) {
    //     e.preventDefault(); // Prevent the default form submission

    //     // Simple validation example
    //     const easeOfSubmission = document.getElementById('easeOfSubmission').value;
    //     if (easeOfSubmission < 1 || easeOfSubmission > 10) {
    //         alert('Please enter a value between 1 and 10.');
    //         return;
    //     }
    // });
    //const submitFollowUpButton = document.getElementById("submitFollowUp");
    //submitFollowUpButton.addEventListener('click', submitFollowUpData);

    //console.log(`Submit FollowUp Button ${submitFollowUpButton}`);
});
function submitData() {
    const phValue = document.getElementById("PH").value;
    const ammoniaValue = document.getElementById("ammonia").value;
    const nitriteValue = document.getElementById("nitrite").value;
    const nitrateValue = document.getElementById("nitrate").value;
    const locationValue = document.getElementById("location").value;
    const date = new Date();
    if (locationValue === '') {
        alert("Need to add a location, City, County works");
        return;
    }
    //TODO: Add API post call here
    console.log(`the values are ${phValue},${ammoniaValue}, ${nitriteValue}, ${nitrateValue}, ${locationValue}`);
    writeUserData(phValue, ammoniaValue, nitriteValue, nitrateValue, locationValue, date.toString());
    // window.location.href = "/followup.html";
    //location.reload();
    //window.location.href = "/followup.html";
}

async function writeUserData(PH, ammonia, nitrite, nitrate, location, date) {
    const db = getDatabase();

    const reference = ref(db, 'data/');
    push(reference, {
        PH: PH,
        ammonia: ammonia,
        nitrite: nitrite,
        nitrate: nitrate,
        location: location,
        date: date
    }).then(() => {
        window.location.href = "/data.html";
    });
}
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
    });
}

const db = getDatabase();
onValue( ref(db,'data'), (snapshot) =>
{
    console.log(snapshot.val());
})



//});
