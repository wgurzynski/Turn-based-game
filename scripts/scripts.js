

// ===========================================
// ======= Klasy postaci i Przedmiotów =======
// ===========================================

function Creature(name, sex, level, hp, mp, race, guild, profession){
    this.name = name;
    this.sex =sex;
    this.level = level;
    this.hp = hp;
    this.mp = mp;
    this.race = race;
    this.guild = guild;
    this.profession = profession;

    this.burp = function(){
        console.log('Buuurrp!! Excuse me...');
    }
}

function Weapon(name, attack, defence, price, level, img){
    this.name = name;
    this.attack = attack;
    this.defence = defence;
    this.price = price;
    this.level = level;
    this.img = img;
}

// **** Utworzone postacie i przedmioty******

var player = {
    name: "Avalan",
    level: 24,
    profession: "Palladin",
    sex: "male",
    magicLevel: 7,
    healthPoints: 150,
    magickPoints: 50,
    stamina: 75,
    redScull: false,
    hpPotions: 5,
    mpPotions: 2,
    attack: function () {
        if (this.stamina < 25) {
            console.log('You are exhausted..');
        } else {
            console.log('*Player Attacks*');
            console.log('aaaaa!');
            if (ogre.healthPoints <= 35) {
                monsterDead();
                console.log('zabity')
            } else {
                this.stamina = this.stamina - 25;
                ogre.healthPoints = ogre.healthPoints - 35;
                updatePlayer();
                updateMonster()
            }
        }
    },
    drinkHpPotion: function () {
        if (this.hpPotions == 0) {
            console.log('You dont have any potions left..')
        } else {
            this.hpPotions = this.hpPotions - 1;
            console.log('Gulp..');
            updatePlayer();
        }
    },
    drinkMpPotion: function () {
        if (this.mpPotions == 0) {
            console.log('You dont have any potions left..');
        } else {
            this.mpPotions = this.mpPotions - 1;
            console.log('Aaaah..');
            updatePlayer();
        }
    },
    sleep: function (hours) {
        if (this.healthPoints >= 150 && this.stamina >= 75) {
            console.log('You dont need to sleep now..')
        } else {
            var rest = hours * 25;

            this.healthPoints = this.healthPoints + (hours * 25);
            this.stamina = this.stamina + (hours * 25);
            console.log('zzZZzzz...');
            console.log('You\'ve slept for ' + hours + 'hours');
            console.log(this.healthPoints);
            updatePlayer();
        }
    }
}

var ogre = {
    name: "Ogre",
    level: 7,
    race: "Ogre",
    sex: "male",
    magicLevel: 1,
    healthPoints: 350,
    magickPoints: 15,
    stamina: 35,
    hpPotions: 1,
    mpPotions: 2,
    attack: function () {
        if (this.stamina < 25) {
            console.log('Monster is exhausted..');
        } else {
            this.stamina = this.stamina - 25;
            player.healthPoints = player.healthPoints - 25;
            console.log('*Monster Attacks*');
            console.log('Argh!');
            updateMonster();
        }
    }
}



var troll = new Creature('lack', 'male', 3, 50, 12, 'troll', 'none', 'thief');

var fireSword = new Weapon('fireSword', 15, 10, 5000, 25, 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRAv3ApxIxaKgqzjMj9pGC5Rd78x4D_pckdW7gZgBdlVEE1EZFu');


// **** Funkcje postaci ****

function updatePlayer() {
    document.getElementById('player').innerHTML =
        `<img src="./img/game-avatars/dwarf.png" alt="">
    <p>Name: ${player.name}</p>
    <p>Level: ${player.profession}</p>
    <p>Magic Level: ${player.magicLevel}</p>
    <p>Sex: ${player.sex}</p>
    <p>HP: ${player.healthPoints}</p>
    <p>MP: ${player.magickPoints}</p>
    <p>Stamina: ${player.stamina}</p>
    <p>redScull: ${player.redScull}</p>
    <br>
    <h3>EQ:</h3>
    <p>HP Potions: ${player.hpPotions}</p>
    <p>Mana Potions: ${player.mpPotions}</p>`
}
function updateMonster() {
    document.getElementById('monster').innerHTML =
        `<img src="./img/enemies/orc.png" alt="">
    <p>Name: ${ogre.name}</p>
    <p>Level: ${ogre.level}</p>
    <p>Magic Level: ${ogre.magicLevel}</p>
    <p>Sex: ${ogre.sex}</p>
    <p>HP: ${ogre.healthPoints}</p>
    <p>MP: ${ogre.magickPoints}</p>
    <p>Stamina: ${ogre.stamina}</p>
    <br>
    <h3>EQ:</h3>
    <p>HP Potions: ${ogre.hpPotions}</p>
    <p>Mana Potions: ${ogre.mpPotions}</p>`
}

function monsterDead(){
    document.getElementById('monster').innerHTML =
        `<img src="./img/enemies/orc.png" alt="" style="filter: grayscale(100%)">
    <p>Name: ${ogre.name}</p>
    <p>Level: ${ogre.level}</p>
    <h1 id="dead">Dead</h1>`
    document.getElementById('player').innerHTML =
        `<img src="./img/game-avatars/dwarf.png"" alt="">
    <p>Name: ${player.name}</p>
    <p>Level: ${player.level}</p>
    <h1 id="winner">Winner</h1>`
}





// ===========================================
// =========== Obsługa Zdarzeń ===============
// ===========================================


//Zdarzenie przypisujące kazdemu elementowi o klasie 'character' włączanie i wyłączanie podświetlenia
var characters = document.getElementsByClassName('character');
for(var i = 0; i < characters.length; i++){
    characters[i].addEventListener('mouseover', highlitOn, false);
    characters[i].addEventListener('mouseleave', highlitOff, false);
}

//Włączenie podświetlenia
function highlitOn(e){
 var object = e.target;
 var characterDisplay = document.getElementById('characterDisplay');
// funkcja która  Odczytuje wartości css elemntów z pliku css a nie te zapisane w inline style
 console.log(getComputedStyle(object, null).backgroundImage)
 // podświetla wybraną postać
 object.style.backgroundColor = 'red';
 //ta dziwna funkcja pobiera wartość style elementu z jego pliku CSS!! a nie z "inline style" jak w przypadku metody .style która operuje tylko po drzewie DOM i ustawia wartość backgorundImage na taką samą jaką ma wartość CSS backgroundImage z obiektu object 
 characterDisplay.style.backgroundImage = getComputedStyle(object, null).backgroundImage
 characterDisplay.style.backgroundSize = 'cover'

}
//Wyłączenie podświetlenia
function highlitOff(e){
 var object = e.target
 object.style.backgroundColor = '';
}

