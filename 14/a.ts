let AAA = 0;

export const solution = (input: string) => {
    const fullRun = AAA++ > 0;
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

    for (const robot of robots) {
        robot.px = robot.px + robot.vx * totalSeconds;
        robot.px = ((robot.px % width) + width) % width;

        robot.py = robot.py + robot.vy * totalSeconds;
        robot.py = ((robot.py % height) + height) % height;

        // ignore middle lines
        if (robot.px === (width - 1) / 2 || robot.py === (height - 1) / 2) {
            continue;
        }

        if (robot.px < width / 2 && robot.py < height / 2) {
            topLeftCount++;
        } else if (robot.px > width / 2 && robot.py < height / 2) {
            topRightCount++;
        } else if (robot.px < width / 2 && robot.py > height / 2) {
            bottomLeftCount++;
        } else if (robot.px > width / 2 && robot.py > height / 2) {
            bottomRightCount++;
        }
    }

    return topLeftCount * topRightCount * bottomLeftCount * bottomRightCount;
};
