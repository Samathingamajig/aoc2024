import { PriorityQueue } from "@datastructures-js/priority-queue";
let initialRun = true;

export const solution = (input: string) => {
    if (initialRun) {
        initialRun = false;
        return -1;
    } else {
        // return -1;
    }
    const [registersPre, instructionsPre] = input.split("\n\n");
    const registers = registersPre.match(/\d+/g)!.map(Number);
    const instructions = instructionsPre.match(/\d+/g)!.map(Number);
    // const output: number[] = [];

    // const toKey = (registers: number[], ip: number, outputIdx: number) =>
    //     `${registers[0]},${registers[1]},${registers[2]},${ip},${outputIdx}`;

    // const seenBad = new Set<string>();

    // console.log(registers, instructions);

    // let best = -1;
    // for (let initialA = 0; ; initialA++) {
    //     if (initialA % 10000 === 0) console.log("Trying", initialA, seenBad.size);
    //     // console.log("Trying", initialA, seenBad.size);
    //     registers[0] = initialA;
    //     registers[1] = 0;
    //     registers[2] = 0;
    //     // console.log(registers);
    //     let ip = 0;
    //     let outputIdx = 0;

    //     let success = true;

    //     while (ip < instructions.length) {
    //         const key = toKey(registers, ip, outputIdx);
    //         if (seenBad.has(key)) {
    //             // console.log("Seen bad", key);
    //             success = false;
    //             break;
    //         }
    //         seenBad.add(key);

    //         // console.log(ip, registers);
    //         let advanceTwo = true;

    //         const opcode = instructions[ip];
    //         const literalArg = instructions[ip + 1];
    //         const comboArg = literalArg < 4 ? literalArg : registers[literalArg - 4];

    //         if (opcode === 0) {
    //             const numerator = registers[0];
    //             const denominator = 2 ** comboArg;

    //             const result = Math.trunc(numerator / denominator);

    //             registers[0] = result;
    //         } else if (opcode === 1) {
    //             registers[1] = registers[1] ^ literalArg;
    //         } else if (opcode === 2) {
    //             registers[1] = comboArg % 8;
    //         } else if (opcode === 3) {
    //             if (registers[0] !== 0) {
    //                 // console.log("jumping!");
    //                 ip = literalArg;
    //                 advanceTwo = false;
    //             }
    //         } else if (opcode === 4) {
    //             registers[1] = registers[1] ^ registers[2];
    //         } else if (opcode === 5) {
    //             if (outputIdx >= instructions.length) {
    //                 success = false;
    //                 break;
    //             }

    //             // output.push(comboArg % 8);
    //             // console.log("idx = " + outputIdx, comboArg % 8, instructions[outputIdx]);
    //             if (comboArg % 8 != instructions[outputIdx]) {
    //                 success = false;
    //                 break;
    //             }
    //             outputIdx++;
    //         } else if (opcode === 6) {
    //             const numerator = registers[0];
    //             const denominator = 2 ** comboArg;

    //             const result = Math.trunc(numerator / denominator);

    //             registers[1] = result;
    //         } else if (opcode === 7) {
    //             const numerator = registers[0];
    //             const denominator = 2 ** comboArg;

    //             const result = Math.trunc(numerator / denominator);

    //             registers[2] = result;
    //         } else {
    //             throw new Error(`Unknown opcode: ${opcode}`);
    //         }

    //         if (advanceTwo) {
    //             ip += 2;
    //         }
    //     }

    //     success &&= outputIdx === instructions.length;

    //     if (success) {
    //         best = initialA;
    //         break;
    //     }
    // }

    // const queue = new PriorityQueue<{ initialRegA: number; regA: number; length: number }>((a, b) => {
    //     // handle lowest initialRegA first
    //     return a.initialRegA - b.initialRegA;
    // });

    // for (let i = 0; i < 2 ** 10; i++) {
    //     /*B = A % 8
    //     B = B ^ 3
    //     C = A / 2**B
    //     B = B ^ 1
    //     A = A / 2**3
    //     B = B ^ C
    //     print(B % 8)
    //     if A != 0, goto start*/
    //     const initialRegA = i;
    //     let regA = initialRegA;
    //     let regB = regA % 8;
    //     regB = regB ^ 3;
    //     const tempRegB = regB;
    //     let regC = Math.trunc(regA / 2 ** regB);
    //     regB = regB ^ 1;
    //     regA = Math.trunc(regA / 2 ** 3);
    //     regB = regB ^ regC;
    //     if (regB !== instructions[0]) {
    //         continue;
    //     }

    //     if (regA === 0) {
    //         continue;
    //     }

    //     console.log(tempRegB);

    //     queue.enqueue({ initialRegA, regA, length: 1 });
    // }

    // console.log(queue.size());

    // 2,4,1,3,7,5,1,5,0,3,4,3,5,5,3,0

    /*
    B = A % 8
    B = B ^ 3
    C = A / 2**B
    B = B ^ 1
    A = A / 2**3
    B = B ^ C
    print(B % 8)
    if A != 0, goto start
    */

    let queue = Array.from({ length: 8 }, (_, i) => [i, 3]);

    // for (let i = instructions.length - 1; i >= 0; i--) {

    //     A <<= 3;

    //     // possibilities to fill A are 8 (0-7)

    //     // A = 0 by definition
    // }

    // while (queue.size() > 0) {
    //     const { initialRegA, length } = queue.dequeue()!;

    // }

    // return best;
};
