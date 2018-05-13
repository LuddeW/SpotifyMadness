<template>
  <router-view />
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss">
@import 'variables';

*,
*::after,
*::before {
  box-sizing: border-box;
}

body {
  background-color: $gray-light;
  color: $black;
  font-family: 'Open Sans', sans-serif;
  margin: 8px 0 0;

  &::before {
    background-color: $green;
    content: '';
    height: 8px;
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 1;
  }
}

button {
  appearance: none;
  background: none;
  border: 0;
  border-radius: 0;
  cursor: pointer;
  font: inherit;
  outline: none;
}

::-webkit-scrollbar {
  height: 3px;
  width: 3px;
}

::-webkit-scrollbar-track {
  background-color: $gray-light;
}

::-webkit-scrollbar-thumb {
  background-color: $yellow;
  // background-color: #e3e6ed;
}
</style>


