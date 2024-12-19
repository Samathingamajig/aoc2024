import { PriorityQueue } from "@datastructures-js/priority-queue";
const MAX_TOWEL_LENGTH = 8;

export const solution = (input: string) => {
    const [towelsPre, designsPre] = input.split("\n\n");

    const towels = towelsPre.split(", ");
    const towelsSet = new Set(towels);
    const MAX_TOWEL_LENGTH = Math.max.apply(
        null,
        towels.map((towel) => towel.length),
    );
    const designs = designsPre.split("\n");
    // console.log({ towels, designs });
    // console.log({ MAX_TOWEL_LENGTH });

    return designs
        .map((design) => {
            // const queue = [design];
            const queue = new PriorityQueue<string>((a, b) => b.length - a.length);
            queue.push(design);
            // const handled = new Set<string>();

            const ways: Record<string, number> = { [design]: 1 };
            // let count = 0;

            // let wave: Record<string, number> = { [design]: 1 };
            // while (Object.keys(wave).length > 0) {
            //     const nextWave: Record<string, number> = {};
            //     for (const current in wave) {
            //         if (current === "") {
            //             count += wave[current];
            //         } else {
            //             for (const towel of towels) {
            //                 if (current.startsWith(towel)) {
            //                     const next = current.slice(towel.length);

            //                     if (next === "") {
            //                         count += wave[current];
            //                     } else {
            //                         nextWave[next] = (nextWave[next] || 0) + wave[current];
            //                     }
            //                 }
            //             }
            //         }
            //     }
            //     wave = nextWave;
            // }

            while (queue.size() > 0) {
                const current = queue.pop()!;
                // console.log(current);
                // console.log(current.length);
                // if (ways[current] !== undefined) {
                //     ways[current]++;
                //     continue;
                // }
                // ways[current] = 1;
                // if (handled.has(current)) {
                //     continue;
                // }
                // handled.add(current);

                // for (const towel of towels) {
                for (let i = 1; i <= MAX_TOWEL_LENGTH && i <= current.length; i++) {
                    // if (current.startsWith(towel)) {
                    // const next = current.slice(towel.length);
                    const maybeTowel = current.slice(0, i);
                    if (!towelsSet.has(maybeTowel)) {
                        continue;
                    }
                    const next = current.slice(i);

                    if (ways[next]) {
                        ways[next] += ways[current];
                    } else {
                        ways[next] = ways[current];
                        // console.log("pushing", next);
                        queue.push(next);
                    }

                    // ways[next] = (ways[next] || 0) + ways[current];
                    // if (ways[next] === ways[current]) {
                    //     queue.push(next);
                    // }
                }
                // }
            }

            // console.log("done, returning", ways[""] || 0);

            return ways[""] || 0;
        })
        .reduce((acc, curr) => acc + curr, 0);
};
