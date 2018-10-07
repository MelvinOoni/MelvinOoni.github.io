let me = {
    name : 'Melvin Oonincx',
    age : 20,
    previousDiploma : 'MBO Bedrijfsadministrateur',
    birthPlace: 'Wouw'
}
console.log(me);

me.currentStudy = 'HBO-ICT';
me.hobby = 'voetbal';

console.log(me);

me.favouriteVehicle = {
    vehicle : 'car',
    brand : 'jaguar',
    model : 'F-pace',
    wheels : 4
}

// console.log(`Mijn favoriete vervoersmiddel is ${me.favouriteVehicle.vehicle} en deze heeft ${me.favouriteVehicle.wheels} wielen.`)

me.family = [
        'Jan', 
        'Kees', 
        'Piet',
        'Peter'
]

for (let i = 0; i < me.family.length; i++) {
    console.log(me.family[i]);
}



let logFavouriteVehicle = function(){
    console.log(`Mijn favoriete vervoersmiddel is ${me.favouriteVehicle.vehicle} en deze heeft ${me.favouriteVehicle.wheels} wielen.`)
}
let logDropDown = function(){
    console.log(me.family[i]);
}

console.log(logFavouriteVehicle());

const lapRounds = {
    roundTimes: [55.99,  63.00, 63.01, 54.01, 62.79, 52.88, 53.10, 54.12]
};
console.log(lapRounds)

lapRounds.roundTimes = ["55.99",  "63.00", "63.01", "54.01", "62.79", "52.88", "53.10", "54.12"]; 
console.log(lapRounds)

//Arrays zijn objects.

const teachers = [
    {
        name: "Loek",
        profession: "Teacher",
        brand: "Linux"
    },
    {
        name: "Daan",
        profession: "Teacher",
        brand: "Arduino"
    },
    {
        name: "Rimmert",
        profession: "Teacher",
        brand: "Apple"
    }
]

for (let index = 0; index < teachers.length; index++) {
    const element = teachers[index];
    console.log(teachers[index]);
    if (teachers.profession === "Teacher") {
        if (teachers.name === "Loek") {
            if (teachers.brand === "linux") {
                console.log(`I have a ${teachers.profession} named ${teachers.name} and he likes to work on a ${teachers.brand} computer.`)
            }
        } else if (teachers.name === "Daan") {
            if (teachers.brand === "Arduino") {
                console.log(`I have a ${teachers.profession} named ${teachers.name} and he likes to work on a ${teachers.brand} computer.`)
            }
        } else if (teachers.name === "Rimmert") {
            if (teachders.brand === "Apple") {
                console.log(`I have a ${teachers.profession} named ${teachers.name} and he likes to work on a ${teachers.brand} computer.`)
            }
        }
    } else {
        console.log(`Probeer opnieuw`)
    }
};

