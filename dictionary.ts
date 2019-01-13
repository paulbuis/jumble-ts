import * as fs from "fs";

function trim(line: string) {
    return line.trim();
}

function nonEmpty(line: string) {
    return line.length > 0;
}

function addWordToSet(set: Set<string>, word: string) {
    return set.add(word);
}

function readLexicon(): Set<string> {
    const lines = fs.readFileSync("words.txt", "utf-8").split("\n");

    const lexi = lines.map(trim).
        filter(nonEmpty).
        reduce(addWordToSet, new Set<string>());
    return lexi;
}

const lexicon: Set<string> = readLexicon();

function successfulSplit(wordCountPair: string[]): boolean {
    return wordCountPair.length > 1;
}

function wordInLexicon(word: string): boolean {
    return lexicon.has(word);
}

function trimSplit(line: string) {
    return line.trim().split("\t");
}

function addWordCountPairToMap(map: Map<string, number>, wordCountPair: string[]): Map<string, number> {

    return map.set(wordCountPair[0], parseFloat(wordCountPair[1]));
}

function readDictionary(): Map<string, number> {
    const lines = fs.readFileSync("count_1w.txt", "utf-8").split("\n");

    const dict = lines.map(trimSplit).
        filter((wordCountPair: string[]) => successfulSplit(wordCountPair) && wordInLexicon(wordCountPair[0])).
        reduce(addWordCountPairToMap, new Map<string, number>());
    return dict;
}

const wordCountMap: Map<string, number> = readDictionary();

export {
    lexicon,
    wordCountMap,
};
