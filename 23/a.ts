export const solution = (input: string) => {
    const conLines = input.split("\n").map((line) => line.split("-"));

    let count = 0;

    const edges: Record<string, string[]> = {};

    for (const [from, to] of conLines) {
        if (!edges[from]) {
            edges[from] = [];
        }
        if (!edges[to]) {
            edges[to] = [];
        }
        edges[from].push(to);
        edges[to].push(from);
    }

    // exactly 3 in chain
    const lengthThreeChains = new Set<string>();

    for (const from of Object.keys(edges)) {
        for (const to1 of edges[from]) {
            for (const to2 of edges[to1]) {
                if (edges[to2].includes(from)) {
                    const key = [from, to1, to2].sort().join("-");
                    lengthThreeChains.add(key);
                }
            }
        }
        // console.log("from", from, edges[from]);
        // if (edges[from].length !== 2) {
        //     continue;
        // }
        // const [to1, to2] = edges[from];

        // console.log("here 0");
        // if (edges[to1].length !== 2 || edges[to2].length !== 2) {
        //     continue;
        // }

        // console.log("here 1");
        // if (!edges[to1].includes(to2)) {
        //     continue;
        // }

        // const key = [from, to1, to2].sort().join("-");
        // lengthThreeChains.add(key);
    }

    // console.log(lengthThreeChains);

    return [...lengthThreeChains].filter((key) => key.split("-").some((x) => x[0] === "t")).length;
};
