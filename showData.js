// Import the functions you need from the SDKs you need
import { initializeApp } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js';
import { getDatabase, ref, push, onValue } from 'https://www.gstatic.com/firebasejs/9.0.0/firebase-database.js';
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

var globalData;
const input = document.getElementById('location');

input.addEventListener('change', function (event) {
    if(input.value == '')
    {
        addValues(globalData);
    }
    else
    {
    addValues(globalData.filter((element) => {
        return element.location === input.value;
    }))
    }
});
const db = getDatabase();
onValue(ref(db, 'data'), (snapshot) => {
    console.log(snapshot.val());
    globalData = Object.values(snapshot.val());
    //console.log(temp[0].location.localCompare(temp[1].location));
    // User can sort on here, with some filters
    globalData.sort((a, b) => { return a.location.localeCompare(b.location) });
    addValues(globalData);

})

function addValues(localData) {
    const selectElement = document.getElementById('dataDisplay');
    selectElement.innerHTML = '';
    localData.forEach((item, index) => {
        const entry = document.createElement('div');
        entry.id = "entry" + index;
        const space = document.createElement('div');
        if (index % 2 == 0) {
            entry.className = "px-2 bg-slate-500 grid grid-rows-1 grid-flow-col gap-4 py-4"
        }
        else {
            entry.className = "px-2 bg-stone-200 grid grid-rows-1 grid-flow-col gap-4 py-4"
        }
        selectElement.appendChild(entry);
        space.className = "py-1";
        selectElement.appendChild(space);
        const currentEntry = document.getElementById("entry" + index);
        const city = document.createElement('div');
        city.className = 'bg-blue-300 py-2 rounded-xl px-2'
        const date = document.createElement('div');
        date.className = 'bg-green-300 py-2 rounded-xl px-2'
        const ph = document.createElement('div');
        ph.className = getPHColor(item.PH) + ' ' + 'py-2 rounded-xl px-2'
        const ammonia = document.createElement('div');
        ammonia.className = getAmmoniaColor(item.ammonia) + ' ' + 'py-2 rounded-xl px-2'
        const nitrite = document.createElement('div');
        nitrite.className = getNitriteColor(item.nitrite) + ' ' + 'py-2 rounded-xl px-2'
        const nitrate = document.createElement('div');
        nitrate.className = getNitrateColor(item.nitrate) + ' ' + 'py-2 rounded-xl px-2'
        city.textContent = "City " + item.location;
        date.textContent = "Date " + (new Date(item.date)).toLocaleDateString("en-US");
        ph.textContent = "PH  " + item.PH;
        ammonia.textContent = "Ammonia " + item.ammonia;
        nitrite.textContent = "Nitrite " + item.nitrite;
        nitrate.textContent = "Nitrate " + item.nitrate;
        currentEntry.appendChild(city);
        currentEntry.appendChild(date);
        currentEntry.appendChild(ph);
        currentEntry.appendChild(ammonia);
        currentEntry.appendChild(nitrite);
        currentEntry.appendChild(nitrate);
    })
}
function getPHColor(ph) {
    if (ph < 6.0) {
        return "bg-yellow-100";
    }
    else if (ph <= 6.4) {
        return "bg-yellow-50";
    }
    else if (ph <= 7.0) {
        return "bg-emerald-100";
    }
    else if (ph <= 7.2) {
        return "bg-teal-100";
    }
    else if (ph <= 7.4) {
        return "bg-yellow-600";
    }
    else if (ph <= 7.8) {
        return "bg-orange-400";
    }
    else if (ph <= 8.0) {
        return "bg-orange-600";
    }
    else if (ph <= 8.2) {
        return "bg-purple-400";
    }
    else if (ph <= 8.4) {
        return "bg-purple-600";
    }
    else if (ph >= 8.6) {
        return "bg-purple-800";
    }

}

function getAmmoniaColor(ammonia) {
    if (ammonia == 0) {
        return "bg-yellow-400";
    }
    else if (ammonia == 0.25) {
        return "bg-lime-100";
    }
    else if (ammonia == 0.50) {
        return "bg-lime-300";
    }
    else if (ammonia == 1.0) {
        return "bg-lime-500";
    }
    else if (ammonia == 2.0) {
        return "bg-green-500";
    }
    else if (ammonia == 4.0) {
        return "bg-green-800";
    }
    else if (ammonia == 8.0) {
        return "bg-green-900";
    }

}

function getNitriteColor(nitrite) {
    if (nitrite == 0) {
        return "bg-sky-400";
    }
    else if (nitrite == 0.25) {
        return "bg-purple-300";
    }
    else if (nitrite == 0.50) {
        return "bg-fuchsia-300";
    }
    else if (nitrite == 1.0) {
        return "bg-fuchsia-500";
    }
    else if (nitrite == 2.0) {
        return "bg-fuchsia-700";
    }
    else if (nitrite == 5.0) {
        return "bg-fuchsia-900";
    }
    else if (nitrite == 8.0) {
        return "bg-green-900";
    }

}

function getNitrateColor(nitrate) {
    if (nitrate == 0) {
        return "bg-yellow-400";
    }
    else if (nitrate == 5) {
        return "bg-orange-300";
    }
    else if (nitrate == 10) {
        return "bg-orange-600";
    }
    else if (nitrate == 20) {
        return "bg-red-500";
    }
    else if (nitrate == 40) {
        return "bg-red-700";
    }
    else if (nitrate == 80) {
        return "bg-red-800";
    }
    else if (nitrate == 160) {
        return "bg-red-900";
    }

}


//});
