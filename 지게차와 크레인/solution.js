function solution(storage, requests) {
    const cols = storage[0].length;
    const rows = storage.length;
    let remaining = cols * rows;

    const remove = Array.from({length: rows}, () => new Array(cols).fill(false));
    const visited = Array.from({length: rows}, () => new Array(cols).fill(0));

    let timestamp = 0;

    const findRoute = (x, y, target) => {
        if (visited[y][x] === timestamp) return;
        visited[y][x] = timestamp;

        if (storage[y][x] === target && !remove[y][x]) {
            remove[y][x] = true;
            remaining--;
        } else if (remove[y][x]) {
            if (x + 1 < cols) findRoute(x + 1, y, target);
            if (x - 1 >= 0) findRoute(x - 1, y, target);
            if (y + 1 < rows) findRoute(x, y + 1, target);
            if (y - 1 >= 0) findRoute(x, y - 1, target);
        }
    };

    for (const target of requests) {
        const t = target[0];
        if (target.length > 1) {
            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
                    if (!remove[y][x] && storage[y][x] === t) {
                        remove[y][x] = true;
                        remaining--;
                    }
                }
            }
        } else {
            timestamp++;

            const perimeter = cols * 2 + (rows - 2) * 2;
            let x = 0;
            let y = 0;

            for (let i = 0; i < perimeter; i++) {
                findRoute(x, y, target);

                if (y === 0 && x < cols - 1) x++;
                else if (x === cols - 1 && y < rows - 1) y++;
                else if (y === rows - 1 && x > 0) x--;
                else y--;
            }
        }
    }

    return remaining;
}
