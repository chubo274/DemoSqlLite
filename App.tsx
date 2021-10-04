/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useCallback, useEffect} from 'react';
import {Button, Text, View} from 'react-native';
import {createTable, getDBConnection, getItems, saveItems} from './SqlLite/dbService';
import { ItemModel } from './src/model/ItemModel';

const App = () => {
  const getDB = useCallback(async () => {
    try {
      const db = await getDBConnection();
      await createTable(db);
      const getData = await getItems(db);
      console.log({getData});
    } catch (error) {
      console.log('error', error);
    }
  }, []);

  const onAdd = useCallback(async () => {
    try {
      const db = await getDBConnection();
    } catch (error) {
      console.log('error', error);
    }
  }, []);

  useEffect(() => {
    getDB();
  }, []);

  return (
    <View>
      <Text>Demo SQL Lite</Text>
      <Button title="add item" onPress={onAdd}/>
    </View>
  );
};

export default App;
