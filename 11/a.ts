let AA = 0;
export const solution = (input: string) => {
    let stones = input.split(" ").map(Number);
    // console.log(stones);

    const NUM_ITERATIONS = AA++ ? 25 : 75;

    for (let ITERATION = 0; ITERATION < 75; ITERATION++) {
        let nextStones: typeof stones = [];

        for (const stone of stones) {
            const strStone = stone.toString();
            if (stone === 0) {
                nextStones.push(1);
            } else if (strStone.length % 2 === 0) {
                nextStones.push(Number(strStone.slice(0, strStone.length / 2)));
                // without leading zeros
                let next = strStone.slice(strStone.length / 2);
                while (next[0] === "0") {
                    next = next.slice(1);
                }
                nextStones.push(Number(next || "0"));
            } else {
                nextStones.push(stone * 2024);
            }
        }

        stones = nextStones;
        // console.log(stones);
    }

    return stones.length;
};
