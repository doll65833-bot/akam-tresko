import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getFirestore,
collection,
addDoc,
query,
orderBy,
onSnapshot,
serverTimestamp
}
from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";

const firebaseConfig = {
apiKey: "AIzaSyCZQX19pYIZ4d01tzJ-MgCx4H2IiHmTlsg",
authDomain: "akam-tresko.firebaseapp.com",
projectId: "akam-tresko",
storageBucket: "akam-tresko.firebasestorage.app",
messagingSenderId: "287466904207",
appId: "1:287466904207:web:7bb1d45d3d05975465aefa"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

let currentUser = "";

window.joinChat = function () {

const username =
document.getElementById("username").value.trim();

if(username === ""){
alert("تکایە ناوی خۆت بنووسە");
return;
}

currentUser = username;

document.querySelector(".welcome-screen").style.display = "none";

document.getElementById("chatScreen").style.display = "block";

loadMessages();

};

window.sendMessage = async function(){

const input =
document.getElementById("messageInput");

const text = input.value.trim();

if(text === "") return;

await addDoc(
collection(db,"messages"),
{
user: currentUser,
text: text,
createdAt: serverTimestamp()
}
);

input.value = "";

};

function loadMessages(){

const q = query(
collection(db,"messages"),
orderBy("createdAt","asc")
);

onSnapshot(q,(snapshot)=>{

const messages =
document.getElementById("messages");

messages.innerHTML = "";

snapshot.forEach((doc)=>{

const data = doc.data();

messages.innerHTML += `
<div class="message">
<b>${data.user}</b><br>
${data.text}
</div>
`;

});

messages.scrollTop =
messages.scrollHeight;

});

}
