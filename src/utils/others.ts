import { promisify } from "util";

export function randomElement(array: string[]): string {
    return array[Math.floor(Math.random() * array.length)];
}


export const sleep = promisify(setTimeout)