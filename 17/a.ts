export const solution = (input: string) => {
    const [registersPre, instructionsPre] = input.split("\n\n");
    const registers = registersPre.match(/\d+/g)!.map(Number);
    const instructions = instructionsPre.match(/\d+/g)!.map(Number);
    const output: number[] = [];

    // console.log(registers, instructions);

    let ip = 0;
    while (ip < instructions.length) {
        console.log(ip, registers);
        let advanceTwo = true;

        const opcode = instructions[ip];
        const literalArg = instructions[ip + 1];
        const comboArg = literalArg < 4 ? literalArg : registers[literalArg - 4];

        if (opcode === 0) {
            const numerator = registers[0];
            const denominator = 2 ** comboArg;

            const result = Math.trunc(numerator / denominator);

            registers[0] = result;
        } else if (opcode === 1) {
            registers[1] = registers[1] ^ literalArg;
        } else if (opcode === 2) {
            registers[1] = comboArg % 8;
        } else if (opcode === 3) {
            if (registers[0] !== 0) {
                console.log("jumping!");
                ip = literalArg;
                advanceTwo = false;
            }
        } else if (opcode === 4) {
            registers[1] = registers[1] ^ registers[2];
        } else if (opcode === 5) {
            output.push(comboArg % 8);
        } else if (opcode === 6) {
            const numerator = registers[0];
            const denominator = 2 ** comboArg;

            const result = Math.trunc(numerator / denominator);

            registers[1] = result;
        } else if (opcode === 7) {
            const numerator = registers[0];
            const denominator = 2 ** comboArg;

            const result = Math.trunc(numerator / denominator);

            registers[2] = result;
        } else {
            throw new Error(`Unknown opcode: ${opcode}`);
        }

        if (advanceTwo) {
            ip += 2;
        }
    }

    return output.join(",");
};
