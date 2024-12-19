import { PriorityQueue } from "@datastructures-js/priority-queue";

export const solution = (input: string) => {
    const [towelsPre, designsPre] = input.split("\n\n");

    const towels = towelsPre.split(", ");
    const designs = designsPre.split("\n");
    console.log({ towels, designs });

    return designs
        .map((design) => {
            // const queue = [design];
            const queue = new PriorityQueue<string>((a, b) => a.length - b.length);
            // const handled = new Set<string>();

            // const ways: Record<string, number> = {};
            let count = 0;

            let wave: Record<string, number> = { [design]: 1 };
            while (Object.keys(wave).length > 0) {
                const nextWave: Record<string, number> = {};
                for (const current in wave) {
                    if (current === "") {
                        count += wave[current];
                    } else {
                        for (const towel of towels) {
                            if (current.startsWith(towel)) {
                                const next = current.slice(towel.length);

                                if (next === "") {
                                    count += wave[current];
                                } else {
                                    nextWave[next] = (nextWave[next] || 0) + wave[current];
                                }
                            }
                        }
                    }
                }
                wave = nextWave;
            }

            // while (queue.size() > 0) {
            //     const current = queue.pop()!;
            //     if (ways[current] !== undefined) {
            //         ways[current]++;
            //         continue;
            //     }
            //     ways[current] = 1;
            //     // if (handled.has(current)) {
            //     //     continue;
            //     // }
            //     // handled.add(current);

            //     for (const towel of towels) {
            //         if (current.startsWith(towel)) {
            //             const next = current.slice(towel.length);

            //             if (next === "") {
            //                 count;
            //                 // return true;
            //             } else {
            //                 queue.push(next);
            //             }
            //         }
            //     }
            // }

            return count;
        })
        .reduce((acc, curr) => acc + curr, 0);
};
