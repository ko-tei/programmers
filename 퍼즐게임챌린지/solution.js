const retry = (level, diff, prev, time) => {
    return time + Math.max(0, diff - level) * (prev + time);
};

function solution(diffs, times, limit) {
    const calculate = level => {
        let totalTime = 0;
        for (let i = 0; i < diffs.length; i++) {
            const diff = diffs[i];
            const time = times[i];
            const prev = times[i - 1] || 0;

            totalTime += retry(level, diff, prev, time);
            if (totalTime > limit) break;
        }

        return totalTime;
    };

    var answer = Math.floor(diffs.reduce((a, b) => a + b, 0) / diffs.length);
    const tempSolution = calculate(answer);

    if (tempSolution === limit) return answer;
    else if (tempSolution > limit) {
        do {
            answer--;
        } while (calculate(answer - 1) < limit);
    } else {
        do {
            answer++;
        } while (calculate(answer + 1) > limit);
    }

    return answer;
}
