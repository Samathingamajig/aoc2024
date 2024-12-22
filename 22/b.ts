export const solution = (input: string) => {
    const buyers = input.split("\n").map(Number);
    // const buyers = [123];
    // console.log(buyers);

    const mix = (a: number, b: number) => a ^ b;
    // const prune = (a: number) => ((a % 16777216) + 16777216) % 16777216;
    const prune = (a: number) => a & 16777215;

    const newEntry = () => new Array(buyers.length).fill(-Infinity);
    // const toKey = (window: number[]) => window.join(",");
    // const toKey = (window: number[]) => window[3] * 1000000 + window[2] * 10000 + window[1] * 100 + window[0];
    const toKey = (window: number[], start: number = 0) =>
        window[start + 3] * 1000000 + window[start + 2] * 10000 + window[start + 1] * 100 + window[start + 0];
    // const scoreMap = new Map<string, number[]>();
    const scoreMap = new Map<number, number[]>();
    // const scoreMap = new Map<number, Record<number, number>>();

    buyers.forEach((initialSecret, buyerId) => {
        let secret = initialSecret;

        const windowChanges = [];
        let prev = -Infinity;

        for (let i = 0; i < 2000; i++) {
            // for (let i = 0; i < 10; i++) {
            secret = prune(mix(secret, secret << 6));
            secret = prune(mix(secret, secret >> 5));
            secret = prune(mix(secret, secret << 11));
            // secret = secret ^ ((secret & 262143) << 6);
            // secret = secret ^ (secret >> 5);
            // secret = secret ^ ((secret & 8191) << 11);
            // console.log(secret);

            let price = secret % 10;

            if (prev !== -Infinity) {
                windowChanges.push(price - prev);
            }

            // window.push(secret);

            // if (windowChanges.length === 4) {
            if (i >= 4) {
                // do something
                const key = toKey(windowChanges, i - 4);
                // console.log(windowChanges.slice(i - 4));

                const slot = scoreMap.get(key) || newEntry();
                // const slot = scoreMap.get(key) || {};

                // if (key === toKey([-2, 1, -1, 3])) {
                //     console.log(buyerId, slot, price);
                // }

                // slot[buyerId] = Math.max(slot[buyerId], price);
                // if (slot[buyerId] === undefined) {
                if (slot[buyerId] === -Infinity) {
                    slot[buyerId] = price;
                }

                scoreMap.set(key, slot);

                // windowChanges.shift();
            }
            prev = price;

            // if (i >= 8) {
            //     throw new Error("Too many iterations");
            // }
        }

        return secret;
    });

    // console.log(scoreMap);

    // console.log(scoreMap.get(toKey([-2, 1, -1, 3])));

    const bestScore = Math.max(
        ...Array.from(scoreMap.values())
            // .map((scores) => scores.filter((score) => score !== -Infinity))
            // .map((scores) => scores.reduce((acc, score) => acc + score, 0)),
            .map((scores) => scores.reduce((acc, score) => (score === -Infinity ? acc : acc + score), 0)),
        // .map((scores) => Object.values(scores).reduce((acc, score) => acc + score, 0)),
        // .map((scores) => {
        //     let sum = 0;
        //     for (const buyerId in scores) {
        //         sum += scores[buyerId];
        //     }
        //     return sum;
        // }),
    );

    // const entriesWithBestScore = Array.from(scoreMap.entries())
    //     .map(([key, scores]) => {
    //         const score = scores.filter((score) => score !== -Infinity).reduce((acc, score) => acc + score, 0);
    //         return { key, score };
    //     })
    //     .filter(({ score }) => score === bestScore);

    // console.log(entriesWithBestScore);

    return bestScore;

    // .reduce((acc, secret) => acc + secret, 0);
};
