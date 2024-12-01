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

    const bs = bb.reduce((acc, b) => {
        acc[b] = (acc[b] || 0) + 1;
        return acc;
    }, {} as Record<number, number>);

    console.log(aa, bb);

    return aa.reduce((acc, a, i) => {
        console.log(a, bb[i], bs[a]);
        return acc + a * (bs[a] ?? 0);
    }, 0);
};
