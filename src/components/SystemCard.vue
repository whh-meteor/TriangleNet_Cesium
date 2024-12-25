<template>
    <div class="system-card" @click="$emit('click')">
      <h2>{{ title }}</h2>
      <p>{{ description }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      title: {
        type: String,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
    },
  };
  </script>
  
  <style scoped>
  .system-card {
    width: 200px;
    padding: 20px;
    border: 1px solid #ccc;
    border-radius: 8px;
    cursor: pointer;
    text-align: center;
    background-color: #f9f9f9;
    transition: transform 0.2s;
  }
  .system-card:hover {
    transform: scale(1.05);
    background-color: #eef;
  }
  </style>
  