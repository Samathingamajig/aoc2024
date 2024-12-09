let AOIJDOJ = 0;
export const solution = (input: string) => {
    // if (AOIJDOJ++ > 0) {
    //     throw new Error("Nope");
    // }
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

    // let left = 0;
    // let right = fs.length - 1;

    // while (left < right) {
    //     while (fs[left] !== undefined) {
    //         left++;
    //     }
    //     while (fs[right] === undefined) {
    //         right--;
    //     }

    //     if (left < right) {
    //         [fs[left], fs[right]] = [fs[right], fs[left]];
    //     }
    // }

    for (let toMoveId = id - 1; toMoveId >= 0; toMoveId--) {
        const originalIdx = fs.indexOf(toMoveId);
        const length = fs.filter((v) => v === toMoveId).length;

        for (let i = 0; i < originalIdx - length + 1; i++) {
            let valid = true;
            for (let j = 0; j < length; j++) {
                if (fs[i + j] !== undefined) {
                    valid = false;
                    break;
                }
            }

            if (valid) {
                for (let j = 0; j < length; j++) {
                    fs[i + j] = toMoveId;
                    fs[originalIdx + j] = undefined;
                }
                break;
            }
        }
        // console.log(fs.map((v, i) => (v === undefined ? "." : v)).join(""));
    }

    // console.log(fs.map((v, i) => (v === undefined ? "." : v)).join(""));

    return fs.reduce((acc, v, i) => (v === undefined ? acc : acc + v * i), 0);
};
