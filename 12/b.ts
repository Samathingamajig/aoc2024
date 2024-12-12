export const solution = (input: string) => {
    const grid = input.split("\n").map((line) => line.split("").map((char) => ({ char, id: -1 })));
    grid.unshift(new Array(grid[0].length).fill(".").map((char) => ({ char, id: -1 })));
    grid.push(new Array(grid[0].length).fill(".").map((char) => ({ char, id: -1 })));

    for (let i = 0; i < grid.length; i++) {
        grid[i].unshift({ char: ".", id: -1 });
        grid[i].push({ char: ".", id: -1 });
    }

    // const sides: Record<string, number> = {};
    // const area: Record<string, number> = {};
    const data: Record<number, { id: number; char: string; sides: number; area: number }> = {};

    const dirs = [
        [0, 1],
        [-1, 0],
        [0, -1],
        [1, 0],
    ];

    let nextId = 0;

    const traverseId = (i: number, j: number, char: string, id: number) => {
        if (grid[i][j].char === char && grid[i][j].id === -1) {
            grid[i][j].id = id;
            data[id].area++;
            for (const [dx, dy] of dirs) {
                traverseId(i + dx, j + dy, char, id);
            }
        }
    };

    for (let i = 1; i < grid.length - 1; i++) {
        for (let j = 1; j < grid[i].length - 1; j++) {
            const section = grid[i][j];
            if (section.char !== ".") {
                if (section.id === -1) {
                    data[nextId] = {
                        id: nextId,
                        char: section.char,
                        sides: 0,
                        area: 0,
                        // initialI: i,
                        // initialJ: j,
                    };

                    traverseId(i, j, section.char, nextId);
                    nextId++;
                }
            }
        }
    }

    // console.log(nextId);
    // console.log(data);

    // for (let i = 1; i < grid.length - 1; i++) {
    //     for (let j = 1; j < grid[i].length - 1; j++) {
    //         const section = grid[i][j];
    //         if (section.char !== ".") {
    //             let neighbors = 0;

    //             for (const [dx, dy] of dirs) {
    //                 if (grid[i + dx][j + dy].char === section.char) {
    //                     neighbors++;
    //                 }
    //             }

    //             const key = `${section.char},${section.id}`;

    //             // console.log(`i: ${i}, j: ${j}, char: ${section.char}, id: ${section.id}, neighbors: ${neighbors}`);
    //             // perims[key] = (perims[key] || 0) + 4 - neighbors;
    //             // area[key] = (area[key] || 0) + 1;
    //             data[section.id].sides += 4 - neighbors;
    //         }
    //     }
    // }

    for (let i = 1; i < grid.length - 1; i++) {
        for (let j = 1; j < grid[i].length - 1; j++) {
            const cur = grid[i][j];
            if (cur.char !== ".") {
                const careId = cur.id;
                const tl = grid[i - 1][j - 1];
                // const tr = grid[i - 1][j + 1];
                const top = grid[i - 1][j];
                const right = grid[i][j + 1];
                const left = grid[i][j - 1];
                const bottom = grid[i + 1][j];
                // const bl = grid[i + 1][j - 1];
                const br = grid[i + 1][j + 1];

                // tops of surfaces
                if (top.id !== careId && (left.id !== careId || tl.id === careId)) {
                    data[careId].sides++;
                }

                // lefts of surfaces
                if (left.id !== careId && (top.id !== careId || tl.id === careId)) {
                    data[careId].sides++;
                }

                // bottoms of surfaces
                if (bottom.id !== careId && (right.id !== careId || br.id === careId)) {
                    data[careId].sides++;
                }

                // rights of surfaces
                if (right.id !== careId && (bottom.id !== careId || br.id === careId)) {
                    data[careId].sides++;
                }
            }
        }
    }
    // console.log(JSON.stringify(data, null, 4));

    // console.log(nextId);
    // console.log(perims, area);

    // return Object.entries(perims).reduce((acc, [section, perim]) => {
    //     acc += perim * area[section];
    //     return acc;
    // }, 0);

    return Object.values(data).reduce((acc, { sides, area }) => acc + sides * area, 0);
};
