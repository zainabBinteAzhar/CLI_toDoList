#! /usr/bin/env node
import chalk from "chalk";
import inquirer from "inquirer";
import gradient from 'gradient-string';
import chalkanimation from 'chalk-animation';
import figlet from 'figlet';
const sleep = (ms = 2000) => new Promise((r) => setTimeout(r, ms));
async function Title() {
    const rainbowTitle = chalkanimation.rainbow("\nTO DO LIST\n");
    await sleep();
    rainbowTitle.stop();
}
function Exit() {
    console.clear();
    const msg = "\nPerform Your\n Tasks Timely!\n";
    figlet(msg, (_err, data) => {
        console.log(gradient.pastel.multiline(data));
    });
}
let choice;
let taskArr = ["Learn typescript basics", "Assignment", "Do projects", "Attend classes"];
let newtaskArr = [];
function showArr() {
    let count = taskArr.length;
    for (let i = 0; i < count; i++) {
        console.log("Task " + (i + 1) + " : " + taskArr[i] + "\n ");
    }
    if (count == 0) {
        console.log(chalk.yellowBright("Congratulations! No Pending Tasks"));
    }
}
await Title();
do {
    console.log(chalk.magenta("\n**********MENU**********\n"));
    let options = await inquirer.prompt([
        {
            name: "data",
            type: "list",
            message: chalk.bgMagenta("\nSelect the Option: "),
            choices: ["View To Do List", "Complete Task", "New Task", "New List of Tasks", "Exit"]
        }
    ]);
    choice = options.data;
    if (choice === "View To Do List") {
        console.log(chalk.greenBright("\n*****Your To Do List*****"));
        console.log(chalk.blueBright("\nYour Pending Tasks are: " + "\n"));
        showArr();
    }
    else if (choice === "Complete Task") {
        console.log(chalk.greenBright("\n*****Completed Task*****"));
        const choices = taskArr.map((options1) => ({
            name: options1,
            value: options1,
        }));
        const userChoice = await inquirer.prompt([
            {
                type: 'list',
                name: 'selectedTasks',
                message: 'Select the completed task:',
                choices: choices,
            },
        ]);
        const selectedTaskIndex = taskArr.indexOf(userChoice.selectedTasks);
        taskArr.splice(selectedTaskIndex, 1);
        console.log(chalk.yellowBright("\nCONGRATULATIOMNS! Now Your Pending Tasks are: " + "\n"));
        showArr();
    }
    else if (choice === "New Task") {
        console.log(chalk.greenBright("\n*****New Task*****"));
        const userInput2 = await inquirer.prompt([
            {
                name: "data",
                type: "string",
                message: chalk.yellow("\nEnter New Task: "),
            }
        ]);
        taskArr.push(userInput2.data);
        console.log(chalk.blueBright("\nYour New List is: " + "\n"));
        showArr();
    }
    else if (choice === "New List of Tasks") {
        console.log(chalk.greenBright("\n*****New List of Tasks*****"));
        const userInput3 = await inquirer.prompt([
            {
                name: "data",
                type: "number",
                message: chalk.yellow("\nNumber of new Tasks: "),
            }
        ]);
        let count1 = userInput3.data;
        for (let j = 0; j < count1; j++) {
            const userInput3 = await inquirer.prompt([
                {
                    name: "data",
                    type: "string",
                    message: chalk.yellow("\nEnter New Task: "),
                }
            ]);
            newtaskArr.push(userInput3.data);
        }
        taskArr = taskArr.concat(newtaskArr);
        console.log(chalk.blueBright("\nYour New List is: " + "\n"));
        showArr();
    }
    else if (choice === "Exit") {
        Exit();
    }
} while (choice != "Exit");
