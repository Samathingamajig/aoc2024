let AA = 0;
export const solution = (input: string) => {
    let stones = input
        .split(" ")
        .map(Number)
        .reduce((obj, cur) => {
            obj[cur] = (obj[cur] || 0) + 1;
            return obj;
        }, {} as Record<number, number>);

    const NUM_ITERATIONS = AA++ > 0 ? 75 : 25;
    console.log(NUM_ITERATIONS);

    for (let ITERATION = 0; ITERATION < NUM_ITERATIONS; ITERATION++) {
        let nextStones: typeof stones = {};

        for (const [strStone, count] of Object.entries(stones)) {
            // const strStone = stone.toString();
            const stone = Number(strStone);
            if (stone === 0) {
                // nextStones.push(1);
                nextStones[1] = (nextStones[1] || 0) + count;
            } else if (strStone.length % 2 === 0) {
                // nextStones.push();
                let next1 = Number(strStone.slice(0, strStone.length / 2));
                nextStones[next1] = (nextStones[next1] || 0) + count;
                // without leading zeros
                let next2 = strStone.slice(strStone.length / 2);
                while (next2[0] === "0") {
                    next2 = next2.slice(1);
                }
                // nextStones.push(Number(next2 || "0"));
                nextStones[Number(next2 || "0")] = (nextStones[Number(next2 || "0")] || 0) + count;
            } else {
                // nextStones.push(stone * 2024);
                nextStones[stone * 2024] = (nextStones[stone * 2024] || 0) + count;
            }
        }

        stones = nextStones;
        // console.log(stones);
    }

    return Object.values(stones).reduce((acc, cur) => acc + cur, 0);
};
