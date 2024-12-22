export const solution = (input: string) => {
    const buyers = input.split("\n").map(Number);
    // const buyers = [123];
    console.log(buyers);

    const mix = (a: number, b: number) => a ^ b;
    const prune = (a: number) => ((a % 16777216) + 16777216) % 16777216;

    return buyers
        .map((initialSecret) => {
            let secret = initialSecret;

            for (let i = 0; i < 2000; i++) {
                // for (let i = 0; i < 10; i++) {
                secret = prune(mix(secret, secret << 6));
                secret = prune(mix(secret, secret >> 5));
                secret = prune(mix(secret, secret << 11));
                // console.log(secret);
            }

            return secret;
        })
        .reduce((acc, secret) => acc + secret, 0);
};
