let initialRun = true;

const partA = (initialA: bigint, instructions: bigint[]) => {
    const registers = [initialA, 0n, 0n];
    const output: bigint[] = [];

    // console.log(registers, instructions);

    let ip = 0;
    while (ip < instructions.length) {
        // console.log(ip, registers);
        let advanceTwo = true;

        const opcode = instructions[ip];
        const literalArg = instructions[ip + 1];
        const comboArg = literalArg < 4 ? literalArg : registers[Number(literalArg) - 4];

        if (opcode === 0n) {
            const numerator = registers[0];
            const denominator = 2n ** comboArg;

            const result = numerator / denominator;

            registers[0] = result;
        } else if (opcode === 1n) {
            registers[1] = registers[1] ^ literalArg;
        } else if (opcode === 2n) {
            registers[1] = comboArg % 8n;
        } else if (opcode === 3n) {
            if (registers[0] !== 0n) {
                // console.log("jumping!");
                ip = Number(literalArg);
                advanceTwo = false;
            }
        } else if (opcode === 4n) {
            registers[1] = registers[1] ^ registers[2];
        } else if (opcode === 5n) {
            output.push(comboArg % 8n);
        } else if (opcode === 6n) {
            const numerator = registers[0];
            const denominator = 2n ** comboArg;

            const result = numerator / denominator;

            registers[1] = result;
        } else if (opcode === 7n) {
            const numerator = registers[0];
            const denominator = 2n ** comboArg;

            const result = numerator / denominator;

            registers[2] = result;
        } else {
            throw new Error(`Unknown opcode: ${opcode}`);
        }

        if (advanceTwo) {
            ip += 2;
        }
    }

    return output.length === instructions.length && output.every((v, i) => v === instructions[i]);
};

export const solution = (input: string) => {
    if (initialRun) {
        // initialRun = false;
        // return -1;
        // return 117440;
    } else {
        // return -1;
        // prompt("done");
    }
    const [registersPre, instructionsPre] = input.split("\n\n");
    const registers = registersPre.match(/\d+/g)!.map(BigInt);
    const instructions = instructionsPre.match(/\d+/g)!.map(BigInt);
    // const target = initialRun ? instructions : instructions.slice(-3);
    // const output: number[] = [];

    const toKey = (registers: bigint[], ip: number, outputIdx: number) =>
        `${registers[0]},${registers[1]},${registers[2]},${ip},${outputIdx}`;

    // console.log(registers, instructions);

    // let best = -1;
    let working: bigint[] = [];
    for (let i = 0n; i < 2n ** 3n; i++) {
        working.push(i);
    }

    for (let instructionsIdx = 0; instructionsIdx < instructions.length; instructionsIdx++) {
        const target = instructions.slice(-instructionsIdx - 1);
        // console.log("Trying", target);

        let found = false;
        let nextWorking: Set<(typeof working)[number]> = new Set();
        // console.log("working", working);

        for (const workingA of working) {
            // const seenBad = new Set<string>();
            for (let initialA = 0n; initialA < 2n ** 3n; initialA++) {
                // if (initialA % 10000 === 0) console.log("Trying", initialA, seenBad.size);
                const seenBad = new Set<string>();
                // console.log("Trying", initialA, seenBad.size);
                const realInitialA = initialA + (workingA << 3n);
                // if (realInitialA === 0) continue;
                // console.log(realInitialA);
                registers[0] = realInitialA;
                registers[1] = 0n;
                registers[2] = 0n;
                // console.log(registers);
                let ip = 0;
                let outputIdx = 0;

                let success = true;

                while (ip < instructions.length) {
                    const key = toKey(registers, ip, outputIdx);
                    if (seenBad.has(key)) {
                        // console.log("Seen bad", key);
                        success = false;
                        break;
                    }
                    // seenBad.add(key);

                    // console.log(ip, registers);
                    let advanceTwo = true;

                    const opcode = instructions[ip];
                    const literalArg = instructions[ip + 1];
                    const comboArg = literalArg < 4 ? literalArg : registers[Number(literalArg) - 4];

                    if (opcode === 0n) {
                        const numerator = registers[0];
                        const denominator = 2n ** comboArg;

                        const result = numerator / denominator;

                        registers[0] = result;
                    } else if (opcode === 1n) {
                        registers[1] = registers[1] ^ literalArg;
                    } else if (opcode === 2n) {
                        registers[1] = comboArg % 8n;
                    } else if (opcode === 3n) {
                        if (registers[0] !== 0n) {
                            // console.log("jumping!");
                            ip = Number(literalArg);
                            advanceTwo = false;

                            // if (
                            //     outputIdx == target.length - 1 ||
                            //     outputIdx == target.length - 2 ||
                            //     outputIdx == target.length - 3
                            // ) {
                            //     // count as valid for now?
                            //     break;
                            // }
                        }
                    } else if (opcode === 4n) {
                        registers[1] = registers[1] ^ registers[2];
                    } else if (opcode === 5n) {
                        if (outputIdx >= target.length) {
                            success = false;
                            break;
                        }

                        // output.push(comboArg % 8);
                        // console.log("idx = " + outputIdx, comboArg % 8, instructions[outputIdx]);
                        if (comboArg % 8n != target[outputIdx] && outputIdx >= 0) {
                            success = false;
                            break;
                        }
                        outputIdx++;
                        // break;
                    } else if (opcode === 6n) {
                        const numerator = registers[0];
                        const denominator = 2n ** comboArg;

                        const result = numerator / denominator;

                        registers[1] = result;
                    } else if (opcode === 7n) {
                        const numerator = registers[0];
                        const denominator = 2n ** comboArg;

                        const result = numerator / denominator;

                        registers[2] = result;
                    } else {
                        throw new Error(`Unknown opcode: ${opcode}`);
                    }

                    if (advanceTwo) {
                        ip += 2;
                    }
                }

                success &&= outputIdx === target.length;
                // success &&= target.length - outputIdx <= 2;
                // success &&= outputIdx === 1;

                if (success) {
                    // console.log("success", realInitialA);
                    // found = true;
                    // working = realInitialA;
                    // break;
                    nextWorking.add(realInitialA);
                }
            }
        }

        if (nextWorking.size === 0) {
            throw new Error("No solution found");
        }

        working = [...nextWorking];
        // .sort((a, b) => {
        //     if (a < b) return -1;
        //     if (a > b) return 1;
        //     return 0;
        // });
    }

    if (initialRun) {
        initialRun = false;
    }

    // console.log(working.length);
    // working = working.flatMap((n) => [n, n << 3n]);
    // console.log(working);
    // working = working.filter((v) => partA(v, instructions));
    // console.log(working);

    return Math.min(...working.map(Number));
};
