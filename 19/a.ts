export const solution = (input: string) => {
    const [towelsPre, designsPre] = input.split("\n\n");

    const towels = towelsPre.split(", ");
    const designs = designsPre.split("\n");
    // console.log({ towels, designs });

    return designs.filter((design) => {
        const queue = [design];
        const handled = new Set<string>();

        while (queue.length) {
            const current = queue.pop()!;
            if (handled.has(current)) {
                continue;
            }
            handled.add(current);

            for (const towel of towels) {
                if (current.startsWith(towel)) {
                    const next = current.slice(towel.length);

                    if (next === "") {
                        return true;
                    }

                    queue.push(next);
                }
            }
        }

        return false;
    }).length;
};
