export const solution = (input: string) => {
    const fs = [];

    let id = 0;
    for (let i = 0; i < input.length; i++) {
        const num = Number(input[i]);
        if (i % 2 == 0) {
            const my_id = id++;
            for (let j = 0; j < num; j++) {
                fs.push(my_id);
            }
        } else {
            for (let j = 0; j < num; j++) {
                fs.push(undefined);
            }
        }
    }

    let left = 0;
    let right = fs.length - 1;

    while (left < right) {
        while (fs[left] !== undefined) {
            left++;
        }
        while (fs[right] === undefined) {
            right--;
        }

        if (left < right) {
            [fs[left], fs[right]] = [fs[right], fs[left]];
        }
    }

    return fs.filter((v) => v !== undefined).reduce((acc, v, i) => acc + v * i, 0);
};
