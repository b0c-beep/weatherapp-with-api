const initSqlJs = window.initSqlJs;

export async function storeWeatherData(city, data) {
    const SQL = await initSqlJs({ locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.5.0/${file}` });
    const db = new SQL.Database();

    db.run(`CREATE TABLE IF NOT EXISTS weather (id INTEGER PRIMARY KEY AUTOINCREMENT, city TEXT, data TEXT)`);
    db.run(`INSERT INTO weather (city, data) VALUES (?, ?)`, [city, JSON.stringify(data)]);

    //const res = db.exec("SELECT * FROM weather");
    //console.log(JSON.stringify(res, null, 2));

    db.close();
}