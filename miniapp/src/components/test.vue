<template>
    <div>
      <h1>Данные из Firebase:</h1>
      <pre>{{ data }}</pre>
      <button @click="exportData">Экспортировать данные</button>
    </div>
  </template>
  
  <script>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  import { ref as dbRef, onValue } from 'firebase/database';
  import { database } from '../firebase'; // путь к вашему файлу firebase.js
  
  export default {
    setup() {
      const data = ref(null);
      const dbPath = 'https://miniapp-dc095-default-rtdb.firebaseio.com/Messages'; // укажите путь к вашим данным
  
      let unsubscribe;
  
      onMounted(() => {
        const reference = dbRef(database, dbPath);
        unsubscribe = onValue(reference, (snapshot) => {
          data.value = snapshot.val();
        });
      });
  
      onBeforeUnmount(() => {
        if (unsubscribe) {
          unsubscribe(); // отписка от слушателя
        }
      });
  
      const exportData = () => {
        const blob = new Blob([JSON.stringify(data.value, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'data.json';
        a.click();
        URL.revokeObjectURL(url);
      };
  
      return { data, exportData };
    },
  };
  </script>
  
  <style scoped>
  /* ваши стили */
  </style>
  