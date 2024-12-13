export const solution = (input: string) => {
    const machines = input.split("\n\n").map((group) => {
        const temp = group.split("\n");

        const [ax, ay] = temp[0]!.match(/\d+/g)!.map(BigInt);
        const [bx, by] = temp[1]!.match(/\d+/g)!.map(BigInt);
        const [px, py] = temp[2]!
            .match(/\d+/g)!
            .map(BigInt)
            .map((n) => n + 10000000000000n);

        return {
            ax,
            ay,
            bx,
            by,
            px,
            py,
        };
    });

    let totalTokens = 0n;

    for (const machine of machines) {
        let minTokens = -1n;
        for (let tokensA = 0n; tokensA < 100n; tokensA++) {
            if (tokensA * machine.ax > machine.px) {
                break;
            }

            const remainingX = machine.px - tokensA * machine.ax;
            const remainingY = machine.py - tokensA * machine.ay;

            const maybeTokensB = remainingX / machine.bx;

            if (maybeTokensB * machine.bx === remainingX && maybeTokensB * machine.by === remainingY) {
                // console.log("found", machine, tokensA, maybeTokensB);
                if (tokensA * 3n + maybeTokensB < minTokens || minTokens === -1n) {
                    minTokens = tokensA * 3n + maybeTokensB;
                }
            }
        }

        if (minTokens !== -1n) {
            totalTokens += minTokens;
        }
    }

    return totalTokens;
};
