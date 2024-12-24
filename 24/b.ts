let initialRun = true;
export const solution = (input: string) => {
    if (initialRun) {
        initialRun = false;
        return -1;
    }
    const [initialPre, instructionsPre] = input.split("\n\n");

    // const state: Record<string, number> = {};
    // type CLASSIFICATION = "input" | "AND" | "XOR" | "OR";

    const classifications: Record<string, { type: string; left: string; right: string }> = {};

    // initialPre.split("\n").forEach((line) => {
    //     const [key, value] = line.split(": ");
    //     state[key] = parseInt(value);
    //     if (key.startsWith("x") || key.startsWith("y")) {
    //         classifications[key] = { type: "input", left: "", right: "" };
    //     }
    // });

    const initialInstructions = instructionsPre.split("\n").map((line) => {
        const [a, operand, b, _, store] = line.split(" ");
        if (store === "tnw") {
            console.log(a, operand, b, store);
        }
        return { a, operand, b, store, done: false };
    });

    // for
    const idMap = {
        input: 0,
        AND1: 1,
        AND2: 2,
        XOR1: 3,
        XOR2: 4,
        OR: 5,
    };

    const doRun = (baseInstructions: typeof initialInstructions, initialX: bigint, initialY: bigint) => {
        const state: Record<string, number> = {};
        const instructions = structuredClone(baseInstructions);

        for (let i = 0; i < 45; i++) {
            state[`x${i.toString().padStart(2, "0")}`] = Number((initialX >> BigInt(i)) & 1n);
            state[`y${i.toString().padStart(2, "0")}`] = Number((initialY >> BigInt(i)) & 1n);
        }

        // console.log(state);

        let atLeastOneDone = true;
        let layers = 0;
        while (instructions.some((i) => !i.done) && atLeastOneDone) {
            layers++;
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

        const z = [...Object.entries(state)].reduce((acc, [key, value]) => {
            if (key.startsWith("z") && value != 0) {
                const num = BigInt(key.slice(1).replace(/^0+/, "") || "0");
                return acc + (1n << num);
            }
            return acc;
        }, 0n);

        const realSum = initialX + initialY;
        // console.log(z === realSum);

        const wrongBits = [...Object.entries(state)].filter(([key, value]) => {
            if (key.startsWith("z")) {
                const num = BigInt(key.slice(1).replace(/^0+/, "") || "0");
                const expected = (realSum >> num) & 1n;
                // console.log(expected, value);
                if (expected !== BigInt(value)) {
                    return true;
                }
            }
            return false;
        });

        // console.log("wrongBits", wrongBits);
        if (wrongBits.length > 0) {
            // console.log("initialX", initialX);
            // console.log("initialY", initialY);
            // console.log("realSum", realSum);
            // console.log("z", z);
            // console.log("wrongBits", wrongBits);
            // console.log("wrong bits", wrongBits, initialX, initialY, realSum, z);
        }
        return wrongBits.sort(
            ([a], [b]) => Number(a.slice(1).replace(/^0+/, "")) - Number(b.slice(1).replace(/^0+/, "")),
        );
    };

    // doRun(initialInstructions, 0n, 0n);
    // doRun(initialInstructions, 13n, 31n);
    // doRun(initialInstructions, 134n, 13234n);
    // doRun(initialInstructions, 234n, 58294n);
    // doRun(initialInstructions, 2134n, 5934n);
    // doRun(initialInstructions, 0n, 4132n);

    // const badBits = new Set<string>();
    // for (let i = 0; i < 10000; i++) {
    //     const x = BigInt(Math.floor(Math.random() * 17592186044416));
    //     const y = BigInt(Math.floor(Math.random() * 17592186044416));
    //     const wrongBits = doRun(initialInstructions, x, y);
    //     wrongBits.forEach(([key, value]) => {
    //         badBits.add(key);
    //     });
    // }
    // console.log(badBits);

    console.log(JSON.stringify(doRun(initialInstructions, 0n, 2n ** 45n - 1n), null, 4));

    return -1;

    let atLeastOneDone = true;
    let layers = 0;
    while (initialInstructions.some((i) => !i.done) && atLeastOneDone) {
        layers++;
        atLeastOneDone = false;

        for (const inst of initialInstructions) {
            const { a, operand, b, store, done } = inst;
            if (done) {
                continue;
            }

            if (!(a in classifications) || !(b in classifications)) {
                continue;
            }

            // const aValue = state[a];
            // const bValue = state[b];

            const aValue = classifications[a].type;
            const bValue = classifications[b].type;

            const [c, d] = [aValue, bValue].sort(
                (a, b) => idMap[a as keyof typeof idMap] - idMap[b as keyof typeof idMap],
            );

            // classifications[store] = { type: `${operand}(${aValue},${bValue})`, left: aValue, right: bValue };
            let type = "";
            if (operand === "XOR") {
                if (aValue === "input" && bValue === "input") {
                    type = "XOR1";
                } else if (c === "input" && d === "XOR1") {
                    type = "XOR2";
                } else {
                    console.error(a, `(${aValue})`, operand, b, `(${bValue})`, store);
                    // console.error(a, operand, b, store);
                    throw new Error("Unknown type");
                }
            } else if (operand === "AND") {
                if (aValue === "input" && bValue === "input") {
                    type = "AND1";
                } else if (c === "XOR1" && d === "OR") {
                    type = "AND2";
                } else {
                    // console.error(a, operand, b, store);
                    console.error(a, `(${aValue})`, operand, b, `(${bValue})`, store);
                    throw new Error("Unknown type");
                }
            } else if (operand === "OR") {
                if (c === "AND1" && d === "AND2") {
                    type = "OR";
                } else {
                    console.error(a, `(${aValue})`, operand, b, `(${bValue})`, store);
                    throw new Error("Unknown type");
                }
            }

            classifications[store] = { type, left: a, right: b };

            // if (operand === "AND") {
            //     state[store] = aValue & bValue;
            // } else if (operand === "OR") {
            //     state[store] = aValue | bValue;
            // } else if (operand === "XOR") {
            //     state[store] = aValue ^ bValue;
            // } else {
            //     throw new Error("Unknown operand");
            // }

            atLeastOneDone = true;
            inst.done = true;
        }
    }

    // console.log(classifications);

    console.log(
        Object.entries(classifications)
            .map(([key, value]) => `${key}: ${value.left} ${value.type} ${value.right}`)
            .join("\n"),
    );

    // console.log(Object.entries(classifications).)

    const typesCount = Object.entries(classifications).reduce((acc, [key, value]) => {
        if (value.type === "input") {
            return acc;
        }

        if (value.type in acc) {
            acc[value.type]++;
        } else {
            acc[value.type] = 1;
        }

        return acc;
    }, {} as Record<CLASSIFICATION, number>);

    console.log(typesCount);

    return -1;

    // console.log(state);
    // console.log(instructions);

    // let atLeastOneDone = true;
    // let layers = 0;
    while (initialInstructions.some((i) => !i.done) && atLeastOneDone) {
        layers++;
        atLeastOneDone = false;

        for (const inst of initialInstructions) {
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
    // console.log("layers", layers);

    // console.log(state);

    // // get x
    // const x = [...Object.entries(state)].reduce((acc, [key, value]) => {
    //     if (key.startsWith("x") && value != 0) {
    //         const num = BigInt(key.slice(1).replace(/^0+/, "") || "0");
    //         // console.log(key, value, num);

    //         return acc + (1n << num);
    //     }
    //     return acc;
    // }, 0n);

    // const y = [...Object.entries(state)].reduce((acc, [key, value]) => {
    //     if (key.startsWith("y") && value != 0) {
    //         const num = BigInt(key.slice(1).replace(/^0+/, "") || "0");
    //         // console.log(key, value, num);

    //         return acc + (1n << num);
    //     }
    //     return acc;
    // }, 0n);

    const z = [...Object.entries(state)].reduce((acc, [key, value]) => {
        if (key.startsWith("z") && value != 0) {
            const num = BigInt(key.slice(1).replace(/^0+/, "") || "0");
            // console.log(key, value, num);

            return acc + (1n << num);
        }
        return acc;
    }, 0n);

    // console.log(x, y, z);

    // const numZThatAreBit1 = [...Object.entries(state)].reduce((acc, [key, value]) => {
    //     if (key.startsWith("z") && value != 0) {
    //         return acc + 1;
    //     }
    //     return acc;
    // }, 0);

    // console.log("numZThatAreBit1", numZThatAreBit1);

    // bitwise of entries with z (z00, z01, z02, ..., z12)
    // return [...Object.entries(state)].reduce((acc, [key, value]) => {
    //     if (key.startsWith("z") && value != 0) {
    //         const num = BigInt(key.slice(1).replace(/^0+/, "") || "0");
    //         // console.log(key, value, num);

    //         return acc + (1n << num);
    //     }
    //     return acc;
    // }, 0n);
    return z;

    // return input;
};
