// 导入 mysql 模块
import { createPool } from 'mysql'
    // 创建数据库连接对象
const db = createPool({
        host: 'localhost',
        port: '9999',
        user: 'root',
        password: 'Pkusz215==',
        database: 'timebank',
    })
    // 向外共享 db 数据库连接对象
export default db