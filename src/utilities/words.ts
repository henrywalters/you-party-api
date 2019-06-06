import { Injectable } from "@nestjs/common";
import * as FS from "fs";
import { Random } from "./random";

const WORD_DIRECTORY = __dirname + "/../assets/words/";

export enum WordTypes {
    Verb,
    Noun,
    Adverb,
    Adjective,
};

@Injectable()
export class Words {

    private adjectives: string[];
    private adjCount: number;

    private nouns: string[];
    private nounCount: number;

    private verbs: string[];
    private verbCount: number;

    private adverbs: string[];
    private adverbCount: number;

    constructor() {
        this.nouns = Words.LoadWordBank(WordTypes.Noun);
        this.nounCount = this.nouns.length;

        this.adjectives = Words.LoadWordBank(WordTypes.Adjective);
        this.adjCount = this.adjectives.length;

        this.verbs = Words.LoadWordBank(WordTypes.Verb);
        this.verbCount = this.verbs.length;

        this.adverbs = Words.LoadWordBank(WordTypes.Adverb);
        this.adverbCount = this.adverbs.length;
    }

    private static LoadWordBank(wordType: WordTypes): string[] {
        let file = "";

        switch (wordType) {
            case WordTypes.Adjective:
                file = WORD_DIRECTORY + "adjectives";
                break;
            case WordTypes.Adverb:
                file = WORD_DIRECTORY + "adverbs";
                break;
            case WordTypes.Noun:
                file = WORD_DIRECTORY + "nouns";
                break;
            case WordTypes.Verb:
                file = WORD_DIRECTORY + "verbs";
                break;
            default:
                throw new Error("Invalid Word Type");
        }

        if (!FS.existsSync(file)) {
            throw new Error("File: " + file + " does not exist from path: " + __dirname);
        }

        return FS.readFileSync(file).toString("utf-8").split("\n");
    }

    public get randomNoun(): string {
        return this.nouns[Random.Integer(0, this.nounCount)];
    }

    public get randomAdjective(): string {
        return this.adjectives[Random.Integer(0, this.adjCount)];
    }

    public get randomAdverb(): string {
        return this.adverbs[Random.Integer(0, this.adverbCount)];
    }

    public get randomVerb(): string {
        return this.verbs[Random.Integer(0, this.verbCount)];
    }

    public get randomFunnyNoun(): string {
        return this.randomAdjective + " " + this.randomNoun;
    }

    public get randomFunnySentence(): string {
        return this.randomFunnyNoun + " " + this.randomAdverb + " " + this.randomVerb;
    }
}