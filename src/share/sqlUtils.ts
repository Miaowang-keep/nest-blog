/*
 * @Author:miaowang
 * @Description:sql工具函数
 * @Date: 2021-06-19 14:28:27
 * @LastEditTime: 2021-07-27 21:17:10
 * @LastEditors: miaowang
 */
/**
 *
 * @param tablename 表名称
 * @param obj 传过来的参数
 */
export function dynasticUpdate(tablename: string, obj: any): any {
  let sql = `update ${tablename}  set `;
  const replaceParams = {};
  for (const item in obj) {
    if (obj[item] !== null && obj[item] !== undefined && obj[item] !== '') {
      sql += `${item} = :${item},`;
      replaceParams[item] = obj[item];
    }
  }
  sql = sql.substring(0, sql.lastIndexOf(','));

  return {
    sql: sql,
    replaceParams: replaceParams,
  };
}

export function dynasticInsert(tablename: string, obj: any): any {
  let sql = `insert into ${tablename}  set `;
  const replaceParams = {};
  for (const item in obj) {
    if (obj[item] !== null && obj[item] !== undefined && obj[item] !== '') {
      sql += `${item} = :${item},`;
      replaceParams[item] = obj[item];
    }
  }
  sql = sql.substring(0, sql.lastIndexOf(','));

  return {
    sql: sql,
    replaceParams: replaceParams,
  };
}
