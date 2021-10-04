import {
  openDatabase,
  enablePromise,
  SQLiteDatabase,
} from 'react-native-sqlite-storage';
import {ItemModel} from '../src/model/ItemModel';

const tableName = 'todoData';

enablePromise(true);

export const getDBConnection = async () => {
  return openDatabase({name: 'todo.db', location: 'default'});
};

export const createTable = async (db: SQLiteDatabase) => {
  const query = `CREATE TABLE IF NOT EXISTS ${tableName}(id INTEGER PRIMARY KEY AUTOINCREMENT, value VARCHAR(200))`;
  await db.executeSql(
    query,
    [],
    (sqlTran, res) => {
      console.log('create table successful');
    },
    error => {
      console.log('error when create table ' + error);
    },
  );
};

export const saveItems = async (db: SQLiteDatabase, items: ItemModel) => {
  const insertQuery = `INSERT OR REPLACE INTO ${tableName} VALUES (?)`;
  await db.executeSql(
    insertQuery,
    [items],
    (sqlTran, res) => {
      console.log('add items successful');
    },
    error => {
      console.log('error when create table ' + error);
    },
  );
};

export const getItems = async (db: SQLiteDatabase): Promise<ItemModel[]> => {
  try {
    console.log('dfsdf');
    
    const listItems: ItemModel[] = [];
    const query = `SELECT * FROM ${tableName}`;
    const results = await db.executeSql(
      query,
      [],
      (sqlTran, res) => {
        console.log({res});
      },
      error => {
        console.log('error when create table ' + error);
      },
    );
    console.log({results});
    return listItems;
  } catch (error) {
    console.log('error', error);
    throw new Error('Faild to get Items');
  }
};
