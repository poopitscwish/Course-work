import { config } from "dotenv"
import { join } from "path";
config()
const CONNECTION = {
    type: 'mssql',
    host: 'EUGENE\\SQLEXPRESS',
    port: 1433,
    username: 'eugene',
    password: 'root',
    database: 'course',
    entities: [join(__dirname, '**', '*.entity.{ts,js}')],
    extra: {
        trustServerCertificate: true,
    }
}
export default CONNECTION;