export const solution = (input: string) => {
    return input.match(/mul\(\d+,\d+\)/g)?.reduce((acc, match) => {
        const [a, b] = match!.match(/\d+/g).map(Number);
        return acc + a * b;
    }, 0);
};
