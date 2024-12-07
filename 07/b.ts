export const solution = (input: string) => {
    let nextId = 0;
    const seenIds = new Set<number>();
    return (
        input
            .split("\n")
            .map((lineStr) => {
                const [pre, post] = lineStr.split(": ");
                const target = Number(pre);
                const nums = post.split(" ").map(Number);

                return { target, nums, id: nextId++ };
            })
            // .flatMap(({ target, nums, id }) => {
            //     const newNums = [nums];

            //     for (let i = 0; i < nums.length - 1; i++) {
            //         const tempNums = nums.toSpliced(i, 2, Number(nums[i].toString() + nums[i + 1].toString()));
            //         newNums.push(tempNums);
            //     }

            //     return newNums.map((nums) => ({ target, nums, id }));
            // })
            // .map(({ target, nums, id }) => {
            //     console.log({ target, nums, id });
            //     return { target, nums, id };
            // })
            .filter(({ target, nums, id }) => {
                if (seenIds.has(id)) {
                    return false;
                }
                // console.log(target, nums, id);
                for (let ops = 0; ops < 3 ** nums.length; ops++) {
                    let sum = 0;
                    let opCopy = ops;
                    let seenConcat = false;
                    for (let i = 0; i < nums.length; i++) {
                        if (opCopy % 3 === 0) {
                            sum *= nums[i];
                        } else if (opCopy % 3 === 1) {
                            sum += nums[i];
                        } else {
                            // if (seenConcat) {
                            //     sum = -1;
                            //     break;
                            // }
                            seenConcat = true;
                            // sum = Number(sum.toString() + nums[i].toString());
                            sum = sum * 10 ** Math.floor(Math.log10(nums[i]) + 1) + nums[i];
                        }

                        opCopy = Math.floor(opCopy / 3);
                    }
                    if (sum === target) {
                        seenIds.add(id);
                        return true;
                    }
                }
                return false;
            })
            // .map((thing) => console.log(thing.target) || thing)
            .reduce((acc, { target }) => acc + target, 0)
    );
};
