import { useState } from 'react';

import styles from './App.module.css'; 
import Header from './components/Header';
import Toolbar from './components/Toolbar';
import Results from './components/Results';


function App() {
  const [editMode, setEditMode] = useState<boolean>(false);
  const [results, setResults] = useState<Object[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<number[]>([]);

  const toggleUser = (isChecked:boolean, id:number):void => {
    if (isChecked) {
      setSelectedUsers([...selectedUsers, id]);
    } else {
      setSelectedUsers((current) =>
        current.filter((userId) => userId !== id)
      );
    }
  };

  const toggleAllUsers = (isChecked:boolean):void => {
    if (isChecked) {
      const userIds = results.map((user:any) => user.id);
      setSelectedUsers(userIds);
    } else {
      setSelectedUsers([]);
    }
  };

  const duplicateUsers = ():void => {
    if (selectedUsers.length === 0) {
      return;
    }
    const duplicatedUsers = structuredClone(results)
      .filter((user:any) => selectedUsers.includes(user.id))
      .map((user:any) => {
        user.id = user.id + Date.now();
        return user;
      });
    const newUsers = [...results, ...duplicatedUsers];
    setResults(newUsers);
    setSelectedUsers([]);
  }

  const deleteUsers = ():void => {
    if (selectedUsers.length === 0) {
      return;
    }
    setResults((current) => 
      current.filter((user:any) => !selectedUsers.includes(user.id))
    );
    setSelectedUsers([]);
  }

  const getTotalNumberOfResults = ():number => {
    return results.length;
  };

  return (
    <div className={styles.app}>
      <Header editMode={editMode} setEditMode={setEditMode} />
      <Toolbar 
        editMode={editMode}
        setResults={setResults} 
        selectedUsers={selectedUsers} 
        setSelectedUsers={setSelectedUsers} 
        toggleAllUsers={toggleAllUsers}
        getTotalNumberOfResults={getTotalNumberOfResults}
        duplicateUsers={duplicateUsers}
        deleteUsers={deleteUsers}
      />
      <Results 
        editMode={editMode} 
        results={results} 
        toggleUser={toggleUser} 
        selectedUsers={selectedUsers}
      />
    </div>
  );
}

export default App;
