export const solution = (input: string) => {
    const [initialPre, instructionsPre] = input.split("\n\n");

    const state: Record<string, number> = {};

    initialPre.split("\n").forEach((line) => {
        const [key, value] = line.split(": ");
        state[key] = parseInt(value);
    });

    const instructions = instructionsPre.split("\n").map((line) => {
        const [a, operand, b, _, store] = line.split(" ");
        return { a, operand, b, store, done: false };
    });

    // console.log(state);
    // console.log(instructions);

    let atLeastOneDone = true;
    while (instructions.some((i) => !i.done) && atLeastOneDone) {
        atLeastOneDone = false;

        for (const inst of instructions) {
            const { a, operand, b, store, done } = inst;
            if (done) {
                continue;
            }

            if (!(a in state) || !(b in state)) {
                continue;
            }

            const aValue = state[a];
            const bValue = state[b];

            if (operand === "AND") {
                state[store] = aValue & bValue;
            } else if (operand === "OR") {
                state[store] = aValue | bValue;
            } else if (operand === "XOR") {
                state[store] = aValue ^ bValue;
            } else {
                throw new Error("Unknown operand");
            }

            atLeastOneDone = true;
            inst.done = true;
        }
    }

    // console.log(state);

    // bitwise of entries with z (z00, z01, z02, ..., z12)
    return [...Object.entries(state)].reduce((acc, [key, value]) => {
        if (key.startsWith("z") && value != 0) {
            const num = BigInt(key.slice(1).replace(/^0+/, "") || "0");
            console.log(key, value, num);

            return acc + (1n << num);
        }
        return acc;
    }, 0n);

    // return input;
};
