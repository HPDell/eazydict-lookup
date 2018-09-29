#!/usr/bin/env node
const readline = require("readline");
const child_process = require("child_process");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const config = {
    save: true
}

async function main() {
    while (true) {
        let answer = await new Promise((resolve) => {
            rl.question("eazydict ", (answer) => {
                resolve(answer)
            });
        })
        switch (answer) {
            case ":s":
                config.save = true;
                break;
            case ":-s":
                config.save = false;
                break;
            case ":q":
                process.exit(0);
                break;
            default:
                lookup(answer)
                break;
        }
    }
}

function lookup(word) {
    let command = [
        "eazydict",
        config.save ? "-s" : "",
        word
    ].join(" ");
    child_process.execSync(command, {
        stdio: [process.stdin, process.stdout]
    });
}

main();