export const solution = (input: string) => {
    const conLines = input.split("\n").map((line) => line.split("-"));

    // let count = 0;

    const edges: Record<string, Set<string>> = {};
    // const edges = new Map<string, Set<string>>();

    for (const [from, to] of conLines) {
        if (!edges[from]) {
            edges[from] = new Set();
        }
        if (!edges[to]) {
            edges[to] = new Set();
        }
        edges[from].add(to);
        edges[to].add(from);
        // if (!edges.has(from)) {
        //     edges.set(from, new Set());
        // }
        // if (!edges.has(to)) {
        //     edges.set(to, new Set());
        // }
        // edges.get(from)!.add(to);
        // edges.get(to)!.add(from);
    }

    // const uniqueEdgeCounts = new Set(Object.values(edges).map((x) => x.size));
    // console.log("uniqueEdgeCounts", uniqueEdgeCounts);

    let bestChain = new Set<string>();
    for (const from of Object.keys(edges)) {
        // for (const from of edges.keys()) {
        let chain = new Set(edges[from]);
        // let chain = new Set<string>(edges.get(from)!);
        chain.add(from);

        // const prevLengths = [chain.size];

        for (const to of edges[from]) {
            // for (const to of edges.get(from)!) {
            chain = chain.intersection(edges[to]);
            // chain = chain.intersection(edges.get(to)!);
            // if (chain.size == 0) {
            //     break;
            // }
            chain.add(to);
            // if (chain.size < bestChain.size) {
            //     break;
            // }
            // prevLengths.push(chain.size);
        }

        if (chain.size > bestChain.size) {
            // console.log(chain.size, prevLengths);
            bestChain = chain;
        }

        // if (chain.size === 13) {
        //     break;
        // }

        // edges[from] = edges[from].sort();
        // const target = [...edges[from], from].sort().join("-");
        // console.log("target = " + target);

        // let works = true;
        // for (const to of edges[from]) {
        //     // edges[to] = edges[to].sort();
        //     const target2 = [...edges[to], to].sort().join("-");
        //     console.log("    target2 = " + target2);

        //     // if (target < target2) {
        //     //     console.log(target, target2);
        //     // }
        //     if (target != target2) {
        //         works = false;
        //         break;
        //     }
        // }

        // if (works) {
        //     return target;
        // }
    }

    return [...bestChain].sort().join(",");

    // console.log(Object.values(edges).map((x) => x.length));
    // return "co,de,ka,ta";

    // // exactly 3 in chain
    // const lengthThreeChains = new Set<string>();

    // for (const from of Object.keys(edges)) {
    //     for (const to1 of edges[from]) {
    //         for (const to2 of edges[to1]) {
    //             if (edges[to2].includes(from)) {
    //                 const key = [from, to1, to2].sort().join("-");
    //                 lengthThreeChains.add(key);
    //             }
    //         }
    //     }
    //     // console.log("from", from, edges[from]);
    //     // if (edges[from].length !== 2) {
    //     //     continue;
    //     // }
    //     // const [to1, to2] = edges[from];

    //     // console.log("here 0");
    //     // if (edges[to1].length !== 2 || edges[to2].length !== 2) {
    //     //     continue;
    //     // }

    //     // console.log("here 1");
    //     // if (!edges[to1].includes(to2)) {
    //     //     continue;
    //     // }

    //     // const key = [from, to1, to2].sort().join("-");
    //     // lengthThreeChains.add(key);
    // }

    // // console.log(lengthThreeChains);

    // return [...lengthThreeChains].filter((key) => key.split("-").some((x) => x[0] === "t")).length;
};
