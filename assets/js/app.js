
const firstname = "Melvin";
const lastname = "Oonincx";
const age = "20";

console.log('Hallo, ik ben ' + firstname + ' ' + lastname + ' en ik ben ' + age + ' jaar oud');
console.log(`Mijn voornaam is ${firstname}`);

const howmanydays = 32 + 40;

console.log(howmanydays);

const priceOfAnApple = 0.59,
    numberOfApples = 200;
const totalPrice = priceOfAnApple * numberOfApples;

console.log(totalPrice)
console.log(`Totaalprijs is : ${totalPrice}`);

const str = 'Please visit the HZ University of applied science'
console.log(str.replace('applied', 'mad'));

const checkIfNumberIsEven = 20;

if (checkIfNumberIsEven % 2 == 0) {
    console.log('Het nummer is even');
}
else {
    console.log('Het nummer is oneven');
}

const HZtekst = 'Programming is not so cool';
console.log(HZtekst.replace('not ', ''));

//Volgens de code heb ik in de HZtekst het woord not vervangen met een spatie.

const Value = '1400';
const Naboo = 'Ik woon in Naboo';
const Comparison = Value == Naboo;
console.log(Comparison);

/*De vergelijking tussen Value en Naboo is false, dit komt omdat het niet hetzelfde is.
Het is niet handig om waardes met letters te vergelijken. */

const currentAction = 'strings';
if (currentAction == 'calculating') {
    console.log('in Calculating');
    const a = 10
    const b = 11
    console.log('optellen', a + b);

} else if (currentAction == 'strings') {
    console.log('in strings');
    const myString = 'My beatiful string';
    console.log(myString.toUpperCase());
    console.log('character at', myString.charAt(7));
    console.log('lengte van de string', myString.length)
    console.log('substring', myString.substring(3, 8))
} else if (currentAction == 'booleans') {
    console.log('in booleans');
    const punt = 7
    if (punt > 8) {
        console.log('true')
    } else {
        console.log('false')
    }
} else {
    console.error('help!')
};

const gewicht = 75
const lengte = 1.88
const BMI = Math.round(gewicht / (lengte * lengte)*10)/10;
console.log(BMI)

if (BMI < 18.5) {
    console.log ('ondergewicht');
} else {
    if (BMI >= 18.5 && 24.9 >= BMI) {
    console.log ('normaal gewicht');
    } else {
        if (BMI >= 25 && 29.9 >= BMI) {
            console.log('overgewicht');
        } else {
            console.log('obesitas');
        }
    }
}

const grade = 10
console.log (grade)

if (grade <6) {
    console.log ("onvoldoende");
} else {
    } if (grade >=6 && 7 >= grade) {
        console.log ("voldoende");
        } else {
            if (grade > 7 && 9 >= grade) {
            console.log ("goed");
            } else {
                if (grade > 9) {
                console.log ("uitmuntend");
            }
        }
    }

    switch (grade) {
        case 1:
        case 2:
        case 3:
        case 4:
        case 5: 
          console.log('onvoldoende');
          break;
        case 6:
        case 7:
          console.log('voldoende');
          break;
        case 8:
        case 9:
          console.log('goed');
          break;
        case 10:
          console.log('uitmuntend');
          break;
        default:
          console.log('Sorry');
      }
const purchasedBook = true;
const job = 'teacher';
const inTrain = false;

if (purchasedBook && inTrain == true) {
    if (job == 'teacher') {
        console.log ('finally i can enjoy my book!')
    }
    else {
        console.log ('I cant enjoy my book!')
    }
} else {
    console.log('I cant enjoy my book!')
}
