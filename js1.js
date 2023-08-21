// Firebase hissem
const firebaseConfig = {
    apiKey: "AIzaSyB-aR2i69w1WEPnj9kkwAOnpR4VytnBJwM",
    authDomain: "aadadad-a24c5.firebaseapp.com",
    databaseURL: "https://aadadad-a24c5-default-rtdb.firebaseio.com",
    projectId: "aadadad-a24c5",
    storageBucket: "aadadad-a24c5.appspot.com",
    messagingSenderId: "154583004326",
    appId: "1:154583004326:web:853a198d8a65a42c3ef067"
};

firebase.initializeApp(firebaseConfig);
var dataBase = firebase.database();

// Hesablarim ad parol
var users = [
    {
        ad: 'Ali',
        parol: '2003'
    },
    {
        ad: 'Zeynal',
        parol: 'zeynal'
    },
    {
        ad: 'Aytac',
        parol: '2005'
    },
    {
        ad: 'Vahid',
        parol: 'vahid'
    },
    {
        ad: 'Kenan',
        parol: 'kenan'
    }
];


var container = document.querySelector('.container');
var messageBox = document.querySelector('.messageBox');

var btn = document.querySelector('button');
btn.onclick = function () {
    var ad = $('.inp1').val();
    var parol = $('.inp2').val();
    //!-- bu hisseni chatgpt eliyib oyren 
    var foundUser = users.find(user => user.ad === ad && user.parol === parol);
    //!-- bu hisseni chatgpt eliyib oyren
    if (foundUser) {
        sessionStorage.setItem('key', '111');
        sessionStorage.setItem('currentUser', ad);
        container.style.display = 'none';
        messageBox.style.display = 'block';
        alert("Fake Whatsapp'a Xoş Geldiniz");
    } else {
        alert("Sizin İstifadəçi Adınız və ya Şifrəniz Yanlışdır!");
    }
};

// Profil Şeklin Tutub dataBase e atmaq

var yazzi = document.querySelector('.yazzi');
var circle = document.querySelector('.circle');
var fotoInp = document.querySelector('.inp0');
fotoInp.onchange = function (e) {
    const reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = function () {
        dataBase.ref('/messages/sekil').set(reader.result);
        circle.style.backgroundImage = `url(${reader.result})`;
        circle.style.display = 'block';
        yazzi.style.display = 'none';
    };
};

// Mesaj Gönderme Olan Yer

$('#sendBtn').on('click', () => {
    var rightText = $('#rightText').val();
    var userSekil = circle.style.backgroundImage;

    var circle1 = dataBase.ref('messages').push().key;
    var dusenAd = sessionStorage.getItem('currentUser');

    dataBase.ref('messages/' + circle1).set({
        rightText,
        ad: dusenAd,
        sekil: userSekil
    });
});


// Mesajları Görmek

dataBase.ref('messages').on('child_added', (snapshot) => {
    var result = snapshot.val();

    var circle1 = $(`<div class="circle1"></div>`).css({
        boxShadow: '1px 1px 10px black',
        borderRadius: '50%',
        width: '30px',
        height: '30px',
        backgroundSize: 'cover',
        backgroundImage: result.sekil
    });

    var tagP = $(`<p><b>${result.ad}</b>: ${result.rightText}</p>`);

    var messageDiv = $('<div class="messageItem"></div>').append(circle1, tagP);
    $('.message').append(messageDiv);
});
