export const solution = (input: string) => {
    const grid = input.split("\n").map((line) => line.split("").map((char) => ({ char, id: -1 })));
    grid.unshift(new Array(grid[0].length).fill(".").map((char) => ({ char, id: -1 })));
    grid.push(new Array(grid[0].length).fill(".").map((char) => ({ char, id: -1 })));

    for (let i = 0; i < grid.length; i++) {
        grid[i].unshift({ char: ".", id: -1 });
        grid[i].push({ char: ".", id: -1 });
    }

    const perims: Record<string, number> = {};
    const area: Record<string, number> = {};

    const dirs = [
        [-1, 0],
        [1, 0],
        [0, -1],
        [0, 1],
    ];

    let nextId = 0;

    const traverse = (i: number, j: number, char: string, id: number) => {
        if (grid[i][j].char === char && grid[i][j].id === -1) {
            grid[i][j].id = id;
            for (const [dx, dy] of dirs) {
                traverse(i + dx, j + dy, char, id);
            }
        }
    };

    for (let i = 1; i < grid.length - 1; i++) {
        for (let j = 1; j < grid[i].length - 1; j++) {
            const section = grid[i][j];
            if (section.char !== ".") {
                let neighbors = 0;

                if (section.id === -1) {
                    traverse(i, j, section.char, nextId++);
                }

                for (const [dx, dy] of dirs) {
                    if (grid[i + dx][j + dy].char === section.char) {
                        neighbors++;
                    }
                }

                const key = `${section.char},${section.id}`;

                // console.log(`i: ${i}, j: ${j}, char: ${section.char}, id: ${section.id}, neighbors: ${neighbors}`);
                perims[key] = (perims[key] || 0) + 4 - neighbors;
                area[key] = (area[key] || 0) + 1;
            }
        }
    }

    // console.log(nextId);
    // console.log(perims, area);

    return Object.entries(perims).reduce((acc, [section, perim]) => {
        acc += perim * area[section];
        return acc;
    }, 0);
};
