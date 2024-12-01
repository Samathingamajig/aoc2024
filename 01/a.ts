export const solution = (input: string) => {
    let aa = [] as number[],
        bb = [] as number[];
    input.split("\n").map((line) => {
        const [a, b] = line.split(/\s+/);
        aa.push(Number(a));
        bb.push(Number(b));
    });

    aa.sort((a, b) => a - b);
    bb.sort((a, b) => a - b);

    console.log(aa, bb);

    return aa.reduce((acc, a, i) => {
        return acc + Math.abs(a - bb[i]);
    }, 0);
};
