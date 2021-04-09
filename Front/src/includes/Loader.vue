<template>
    <div class="ld-holder">
        <b-spinner style="width: 6rem; height: 6rem;" label="Large Spinner" variant="light"></b-spinner>
    </div>
</template>

<script>
export default {
    
}
</script>

<style scoped>
  .ld-holder {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      background: rgba(0, 0, 0, .6);
      z-index: 1000;
  }
</style>