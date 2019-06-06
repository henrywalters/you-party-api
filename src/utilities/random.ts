import { Injectable } from "@nestjs/common";

const letters = ['a','b','c','d','e','f','g','h','j','k','m','n','p','q','r','s','t','u','v','w','x','y','z'];
const letterCount = letters.length;

@Injectable()
export class Random {
    public static Real(min: number, max: number): number {
        return Math.random() * (max - min) + min;
    }

    public static Integer(min: number, max: number): number {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min;
    }

    public static Letter(): string {
        return letters[Random.Integer(0, letterCount)];
    }

    public static AlphaNumeric(length: number): string {
        let key = "";

        for (let i = 0; i < length; i++) {
            const r1 = Random.Integer(0,2);
            if (r1 === 0) {
                const r2 = Random.Integer(0, 2);

                if (r2 === 0) {
                    key += Random.Letter().toUpperCase();
                } else {
                    key += Random.Letter().toLowerCase();
                }
            } else {
                key += Random.Integer(2, 10);
            }
        }

        return key;
    }
}