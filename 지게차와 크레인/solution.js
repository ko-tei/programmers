function solution(storage, requests) {
    const cols = storage[0].length;
    const rows = storage.length;

    const findRoute = (x, y, req, route) => {
        if (route.includes(`${x},${y}`)) return;
        route.push(`${x},${y}`);

        const current = storage[y][x];

        if (current === req) {
            storage[y] = storage[y].substring(0, x) + "1" + storage[y].substring(x + 1);
        } else if (current === "0") {
            if (x + 1 < cols) findRoute(x + 1, y, req, route);
            if (x - 1 >= 0) findRoute(x - 1, y, req, route);
            if (y + 1 < rows) findRoute(x, y + 1, req, route);
            if (y - 1 >= 0) findRoute(x, y - 1, req, route);
        }
    };

    for (const req of requests) {
        if (req.length > 1) {
            storage = storage.map(row => row.replaceAll(req[0], "0"));
        } else {
            const total = cols * 2 + (rows - 2) * 2;
            let count = 0;
            let x = 0;
            let y = 0;

            const route = [];

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

        storage = storage.map(row => row.replaceAll("1", "0"));
    }

    return storage.reduce((acc, cur) => acc + cur.replaceAll("0", "").length, 0);
}
