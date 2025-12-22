function solution(storage, requests) {
    const cols = storage[0].length;
    const rows = storage.length;
    const total = cols * rows;

    const remove = new Set();

    const findRoute = (x, y, req, route) => {
        const key = `${x},${y}`;
        if (route.has(key)) return;
        route.add(key);

        const current = storage[y][x];

        if (current === req && !remove.has(key)) {
            remove.add(key);
        } else if (remove.has(key)) {
            if (x + 1 < cols) findRoute(x + 1, y, req, route);
            if (x - 1 >= 0) findRoute(x - 1, y, req, route);
            if (y + 1 < rows) findRoute(x, y + 1, req, route);
            if (y - 1 >= 0) findRoute(x, y - 1, req, route);
        }
    };

    for (const req of requests) {
        const t = req[0];
        if (req.length > 1) {
            for (let y = 0; y < rows; y++) {
                for (let x = 0; x < cols; x++) {
                    const key = `${x},${y}`;
                    if (!remove.has(key) && storage[y][x] === t) {
                        remove.add(key);
                    }
                }
            }
        } else {
            const total = cols * 2 + (rows - 2) * 2;
            let count = 0;
            let x = 0;
            let y = 0;

            const route = new Set();

            while (count !== total) {
                findRoute(x, y, req, route);
                count++;

                if (x < cols - 1 && y === 0) {
                    x++;
                } else if (y < rows - 1 && x === cols - 1) {
                    y++;
                } else if (x > 0) {
                    x--;
                } else {
                    y--;
                }
            }
        }
    }

    return total - remove.size;
}
