import mysql from "mysql2/promise";

export default async function connect(){
    if (global.poolConnection){
        return await global.poolConnection.getConnection();
    } else {
        global.poolConnection = mysql.createPool({
            host: 'localhost',
            user: 'root',
            database: 'bdpacoteviagem',
            port : 3306,
            password: '1004FefeSqL)6',
            waitForConnections: true,
            connectionLimit: 15,
            maxIdle: 10, // max idle connections, the default value is the same as `connectionLimit`
            idleTimeout: 60000, // idle connections timeout, in milliseconds, the default value 60000
            queueLimit: 0,
            enableKeepAlive: true,
            keepAliveInitialDelay: 0,
        });
        return await global.poolConnection.getConnection();
    }
}