export const solution = (input: string) => {
    const [rulesStr, updatesStr] = input.split("\n\n");

    const rules = rulesStr
        .split("\n")
        .map((rule) => rule.split("|"))
        .reduce((acc, rule) => {
            acc[rule[0]] = acc[rule[0]] || [];
            acc[rule[0]].push(rule[1]);
            return acc;
        }, {} as Record<string, string[]>);

    const updates = updatesStr.split("\n").map((update) => update.split(","));

    const isValidUpdate = (update: string[]): boolean => {
        for (let i = 1; i < update.length; i++) {
            for (let j = 0; j < i; j++) {
                if (rules[update[i]]?.includes(update[j])) {
                    return false;
                }
            }
        }

        return true;
    };

    const result = updates
        .filter((update) => !isValidUpdate(update))
        // .map((update) => console.log(update) || update)
        .map((update) => {
            let newUpdate: string[] = [];

            for (const old of update) {
                for (let i = 0; i < newUpdate.length + 1; i++) {
                    const newUpdateTemp = newUpdate.toSpliced(i, 0, old);
                    if (isValidUpdate(newUpdateTemp)) {
                        // newUpdate.push(old);
                        newUpdate = newUpdateTemp;
                        break;
                    }
                }
            }

            return newUpdate;
        })
        // .map((update) => console.log(update) || update)
        .map((update) => update[Math.floor(update.length / 2)])
        // .map((num) => console.log(num) || num)
        .reduce((acc, num) => acc + +num, 0);

    // console.log(result);

    return result;
};
