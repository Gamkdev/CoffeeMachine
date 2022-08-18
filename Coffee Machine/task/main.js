// Use "input()" to input a line from the user
// Use "input(str)" to print some text before requesting input
// You will need this in the following stages
const input = require('sync-input')

//supplies object - state of machine
const supp = {
    water: 400,
    milk: 540,
    beans: 120,
    cups: 9,
    money: 550,
};

//coffee types and properties
const coffee = {
    1: {
        name: 'espresso',
        water: 250,
        milk: 0,
        beans: 16,
        price: 4
    },
    2: {
        name: 'latte',
        water: 350,
        milk: 75,
        beans: 20,
        price: 7
    },
    3: {
        name: 'cappuccino',
        water: 200,
        milk: 100,
        beans: 12,
        price: 6
    }
}

let exit = false;
do {
    let action = input("Write action (buy, fill, take, remaining, exit):\n");
    switch (action) {
        case "buy":
            buy();
            break;
        case "fill":
            fill();
            break;
        case "take":
            take();
            break;
        case "remaining":
            remaining();
            break;
        case "exit":
            exit = true;
            break;
        default:
            console.log("Choose one of possible actions");
            break;
    }
} while (!exit);


function remaining() { console.log(`The coffee machine has:
${supp.water} ml of water
${supp.milk} ml of milk
${supp.beans} g of coffee beans
${supp.cups} disposable cups
$${supp.money} of money`);
}

function buy() {
    let coffeeType = input("What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino:\n");

    if (coffeeType === "back") {
        return;
    }
    let {water, milk, beans, price} = coffee[coffeeType];
    makeCoffee(water, milk, beans, price);
}

function fill() {
    supp.water += Number(input("Write how many ml of water you want to add:\n"));
    supp.milk += Number(input("Write how many ml of milk you want to add:\n"));
    supp.beans += Number(input("Write how many grams of coffee beans you want to add:\n"));
    supp.cups += Number(input("Write how many disposable coffee cups you want to add:\n"));
}

function take() {
    console.log("I gave you $" + supp.money + "\n");
    supp.money = 0;
}

function checkResources(water, milk, beans) {
    let checkWater = Math.min(Math.floor(supp.water / water));
    if (Boolean (checkWater) === false) {
        console.log("Sorry, not enough water!")
    }
    let checkMilk = Math.min(Math.floor(supp.milk / milk));
    if (Boolean (checkMilk) === false) {
        console.log("Sorry, not enough milk!")
    }
    let checkBeans = Math.min(Math.floor(supp.beans / beans));
    if (Boolean (checkBeans) === false) {
        console.log("Sorry, not enough Beans!")
    }
    let checkCups = supp.cups;
    if (Boolean (checkCups) === false) {
        console.log("Sorry, not enough cups!")
    }
    let possibleCups = Math.min(checkWater, checkMilk, checkBeans, checkCups);
    return Boolean (possibleCups);
}

function makeCoffee(water, milk, beans, price) {
    if (checkResources(water, milk, beans)) {
        console.log("I have enough resources, making you a coffee!\n");
        supp.water -= water;
        supp.milk -= milk;
        supp.beans -= beans;
        supp.cups -= 1;
        supp.money += price;
    }
}