export const solution = (input: string) => {
    return input
        .split("\n")
        .map((lineStr) => {
            const [pre, post] = lineStr.split(": ");
            const target = Number(pre);
            const nums = post.split(" ").map(Number);

            return { target, nums };
        })
        .filter(({ target, nums }) => {
            for (let ops = 0; ops < 2 ** nums.length; ops++) {
                let sum = 0;
                for (let i = 0; i < nums.length; i++) {
                    if (ops & (1 << i)) {
                        sum *= nums[i];
                    } else {
                        sum += nums[i];
                    }
                }
                if (sum === target) {
                    return true;
                }
            }
            return false;
        })
        .reduce((acc, { target }) => acc + target, 0);
};
