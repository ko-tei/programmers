function solution(storage, requests) {
    let newStorage = storage.map(row => row.split(""));
    const cols = newStorage[0].length;
    const rows = newStorage.length;

    const findRoute = (x, y, req, route) => {
        const key = `${x},${y}`;
        if (route.has(key)) return;
        route.add(key);

        const current = newStorage[y][x];

        if (current === req) {
            newStorage[y][x] = "1";
        } else if (current === "0") {
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
                    if (newStorage[y][x] === t) {
                        newStorage[y][x] = "0";
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

        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                if (newStorage[y][x] === "1") {
                    newStorage[y][x] = "0";
                }
            }
        }
    }

    return newStorage.reduce((acc, cur) => acc + cur.filter(ch => ch !== "0").length, 0);
}
