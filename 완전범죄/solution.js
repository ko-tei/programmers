function solution(info, n, m) {
    let answer = n;

    const best = Array.from({length: info.length + 1}, () => Array.from(m).fill(Infinity));

    const loop = (index, x, y) => {
        if (answer <= x || x >= n || y >= m) return;

        if (best[index][y] <= x) return;
        best[index][y] = x;

        if (info.length === index) {
            answer = Math.min(answer, x);
            return;
        }

        const value = info[index];
        const valueX = value[0] + x;
        const valueY = value[1] + y;

        if (valueY < m) loop(index + 1, x, valueY);
        if (valueX < n) loop(index + 1, valueX, y);
    };

    loop(0, 0, 0);
    if (answer >= n) {
        answer = -1;
    }

    return answer;
}
