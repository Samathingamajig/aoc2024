import { aocTest, getDayAndPart } from "../aocTester";
import { solution } from "./a";
import exampleInput from "./example.input.txt";
import exampleOutput from "./a.example.output.txt";
import realInput from "./input.txt";
import { it } from "bun:test";

const { day, part } = getDayAndPart(import.meta.url);

if (!isNaN(day)) {
    it(`should work for day ${day} part ${part}'s example`, () => {
        aocTest(solution, exampleInput, exampleOutput, realInput, day, part);
    });
}
