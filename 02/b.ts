export const solution = (input: string) => {
    return new Set(
        input
            .split("\n")
            .map((line) => {
                const nums = line.split(" ").map(Number);
                return nums;
            })
            .flatMap((arr) => {
                return arr.map((_, i) => ({ id: arr.join("|"), vals: arr.toSpliced(i, 1) }));
            })
            // .map((arr) => console.log(1, arr) || arr)
            .filter(({ vals: arr }) => {
                const s = arr.toSorted((a, b) => a - b);
                const s2 = s.toReversed();
                // console.log({ s, s2 });

                return arr.every((n, i) => n === s[i]) || arr.every((n, i) => n === s2[i]);
            })
            // .map((arr) => console.log(2, arr) || arr)
            .filter(({ vals: arr }) => {
                for (let i = 1; i < arr.length; i++) {
                    if (
                        Math.abs(arr[i] - arr[i - 1]) !== 1 &&
                        Math.abs(arr[i] - arr[i - 1]) !== 2 &&
                        Math.abs(arr[i] - arr[i - 1]) !== 3
                    ) {
                        return false;
                    }
                }
                return true;
            })
            .map(({ id }) => id),
    ).size;
};
