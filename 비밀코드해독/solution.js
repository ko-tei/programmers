const abled = (array, length, secretCode) => {
    const result = [];
    const loop = (index, selected) => {
        if (selected.length === length) {
            result.push([...selected]);
            return;
        } else if (index === array.length) {
            return;
        }

        for (let i = index; i < array.length; i++) {
            if (secretCode && secretCode[array[i] - 1].block) continue;

            selected.push(array[i]);
            loop(i + 1, selected);
            selected.pop();
        }
    };

    loop(0, []);

    return result;
};

const hasAny = (a, b) => a.some(v => b.includes(v));

function solution(n, input, ans) {
    const answer = new Set();
    const secretCode = Array.from({length: n}, (_, i) => ({value: i + 1, used: false, block: false}));

    const loop = (index, secretCode) => {
        if (index === input.length) {
            const nonBlockCode = secretCode.filter(c => !c.block);
            const requiredCode = nonBlockCode.filter(c => c.used).map(c => c.value);
            const otherCode = nonBlockCode.filter(c => !c.used).map(c => c.value);

            if (requiredCode.length === 5) {
                answer.add(requiredCode.sort((a, b) => a - b).join(" "));
            } else {
                const temp = abled(otherCode, 5 - requiredCode.length);

                for (const t of temp) {
                    answer.add([...requiredCode, ...t].sort((a, b) => a - b).join(" "));
                }
            }

            return;
        }

        const currentinput = input[index];
        const currentAns = ans[index];

        if (currentAns === 0) {
            const updateSecretCode = secretCode.map(c => ({...c, block: currentinput.includes(c.value) || c.block}));
            if (updateSecretCode.some(c => c.block && c.used)) return;
            loop(index + 1, updateSecretCode);
            return;
        }

        const abledCases = abled(currentinput, currentAns, secretCode);

        for (const abledCase of abledCases) {
            const otherCases = currentinput.filter(v => !abledCase.includes(v));
            const updateSecretCode = secretCode.map(c => ({...c, used: abledCase.includes(c.value) || c.used, block: c.block || otherCases.includes(c.value)}));

            if (updateSecretCode.some(c => c.block && c.used)) continue;

            loop(index + 1, updateSecretCode);
        }
    };

    loop(0, secretCode);

    return answer.size;
}
