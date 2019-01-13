
import * as readline from "readline";
import * as dictionary from "./dictionary";
import * as perm from "./permute";
const wordCountMap = dictionary.wordCountMap;
const permute = perm.permute;

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

function askQuestion() {
    rl.question("scrambled word: ", (answer) => processAnswer(answer));
}

function processAnswer(answer: string) {
    console.log(`unscambled word: ${unjumble(answer)}\n` );
    askQuestion();
}

askQuestion();

function unjumble(input: string): string {
    const wordCountPairs: Array<[string, number]> = [];

    for (const s of permute(input)) {
        // remove next line in production!
        console.log(s);
        const popularity: number|undefined = wordCountMap.get(s);
        if (popularity !== undefined) {
            wordCountPairs.push([s, popularity]);
        }
    }
    // remove next line in production!
    console.log(wordCountPairs);
    const pair: [string, number] = wordCountPairs.reduce(maxCount);
    return pair[0];
}

function maxCount(pair1: [string, number], pair2: [string, number]): [string, number] {
    // replace the body of this function
    // with one that actually picks the more popular pair!
    return pair1;
}
