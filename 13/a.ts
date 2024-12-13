export const solution = (input: string) => {
    const machines = input.split("\n\n").map((group) => {
        const temp = group.split("\n");

        const [ax, ay] = temp[0]!.match(/\d+/g)!.map(Number);
        const [bx, by] = temp[1]!.match(/\d+/g)!.map(Number);
        const [px, py] = temp[2]!.match(/\d+/g)!.map(Number);

        return {
            ax,
            ay,
            bx,
            by,
            px,
            py,
        };
    });

    let totalTokens = 0;

    for (const machine of machines) {
        let minTokens = Infinity;
        for (let tokensA = 0; tokensA < 100; tokensA++) {
            if (tokensA * machine.ax > machine.px) {
                break;
            }

            const remainingX = machine.px - tokensA * machine.ax;
            const remainingY = machine.py - tokensA * machine.ay;

            const maybeTokensB = Math.floor(remainingX / machine.bx);

            if (maybeTokensB * machine.bx === remainingX && maybeTokensB * machine.by === remainingY) {
                // console.log("found", machine, tokensA, maybeTokensB);
                minTokens = Math.min(minTokens, tokensA * 3 + maybeTokensB);
            }
        }

        if (minTokens !== Infinity) {
            totalTokens += minTokens;
        }
    }

    return totalTokens;
};
