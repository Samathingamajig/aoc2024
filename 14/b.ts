let AAA = 0;

export const solution = (input: string) => {
    const fullRun = AAA++ > 0;
    if (!fullRun) {
        return 0;
    }
    const robots = input.split("\n").map((line) => {
        const [px, py, vx, vy] = line.match(/-?\d+/g)!.map(Number);
        return { px, py, vx, vy };
    });

    const width = fullRun ? 101 : 11;
    const height = fullRun ? 103 : 7;
    const totalSeconds = 100;

    let topLeftCount = 0;
    let topRightCount = 0;
    let bottomLeftCount = 0;
    let bottomRightCount = 0;

    let iter = 1;

    while (true) {
        for (const robot of robots) {
            robot.px = robot.px + robot.vx;
            robot.px = ((robot.px % width) + width) % width;

            robot.py = robot.py + robot.vy;
            robot.py = ((robot.py % height) + height) % height;

            // // ignore middle lines
            // if (robot.px === (width - 1) / 2 || robot.py === (height - 1) / 2) {
            //     continue;
            // }

            // if (robot.px < width / 2 && robot.py < height / 2) {
            //     topLeftCount++;
            // } else if (robot.px > width / 2 && robot.py < height / 2) {
            //     topRightCount++;
            // } else if (robot.px < width / 2 && robot.py > height / 2) {
            //     bottomLeftCount++;
            // } else if (robot.px > width / 2 && robot.py > height / 2) {
            //     bottomRightCount++;
            // }
        }

        console.log(iter);
        const grid = Array.from({ length: height }, () => Array.from({ length: width }, () => " "));

        for (const robot of robots) {
            grid[robot.py][robot.px] = "#";
        }

        let foundSpan = false;
        outest: for (let i = 0; i < width; i++) {
            for (let j = 0; j < height - 9; j++) {
                let span = 0;
                for (let k = 0; k < 10; k++) {
                    if (grid[j + k][i] === "#") {
                        span++;
                    }
                }

                if (span === 10) {
                    foundSpan = true;
                    break;
                }
            }
        }

        if (foundSpan) {
            console.log(grid.map((row) => row.join("")).join("\n"));
            console.log(iter);
            console.log();
            prompt();
        }

        iter++;
    }

    // return topLeftCount * topRightCount * bottomLeftCount * bottomRightCount;
};
