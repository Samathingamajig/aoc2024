export const solution = (input: string) => {
    const locks = [];
    const keys = [];

    const sections = input.split("\n\n");

    for (const part of sections) {
        const lines = part.split("\n");

        if (lines[0].includes(".")) {
            // is a key
            const key = [];
            for (let col = 0; col < lines[0].length; col++) {
                let added = false;
                for (let row = 0; row < lines.length && !added; row++) {
                    // for (let row = lines.length - 1; row >= 0 && !added; row--) {
                    if (lines[lines.length - 1 - row][col] === ".") {
                        key.push(row);
                        added = true;
                    }
                }
                if (!added) {
                    key.push(lines.length);
                }
            }
            keys.push(key);
        } else {
            // is a lock
            const lock = [];
            for (let col = 0; col < lines[0].length; col++) {
                let added = false;
                for (let row = 0; row < lines.length && !added; row++) {
                    if (lines[row][col] === ".") {
                        lock.push(row);
                        added = true;
                    }
                }
                if (!added) {
                    lock.push(lines.length);
                }
            }
            locks.push(lock);
        }
    }

    // console.log(locks[0]);
    // console.log(keys[0]);

    let count = 0;

    // console.log("locks", locks);
    // console.log("keys", keys);

    for (const lock of locks) {
        for (const key of keys) {
            let isMatch = true;
            for (let i = 0; i < lock.length; i++) {
                if (lock[i] + key[i] > 7) {
                    isMatch = false;
                    // console.log(lock, key, i);
                    break;
                }
            }
            if (isMatch) {
                count++;
                // break;
            }
        }
    }

    // return input;
    return count;
};
