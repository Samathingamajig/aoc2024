export const solution = (input: string) => {
    let enabled = true;
    return input.match(/do(?:n't)?\(\)|mul\(\d+,\d+\)/g)?.reduce((acc, match) => {
        console.log({ match });
        if (match === "do()") {
            enabled = true;
            return acc;
        }
        if (match === "don't()") {
            enabled = false;
            return acc;
        }
        if (enabled) {
            const [a, b] = match!.match(/\d+/g).map(Number);
            return acc + a * b;
        }
        return acc;
    }, 0);
};
