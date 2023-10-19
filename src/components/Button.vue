<script setup lang="ts">
defineProps<{
  name: string;
}>();
</script>

<template>
  <div>
    <button class="custom-button" @click="">{{ name }}</button>
  </div>
</template>

<style>
.custom-button {
  font-family: Roboto, sans-serif;
  font-weight: 0;
  font-size: 17px;
  color: #fff;
  background-color: #195188;
  padding: 10px 20px;
  border: 2px solid #26517d;
  box-shadow: rgb(0, 0, 0) 0px 0px 0px 0px;
  border-radius: 50px;
  transition: 1000ms;
  cursor: pointer;
  margin-top: 20px;
  margin-bottom: 20px;
  margin-left: 40px;
}

.custom-button:hover {
  transition: 1000ms;
  padding: 10px 40px;
  transform: translateY(-0px);
  background-color: #fff;
  color: #26517d;
  border: solid 2px #26517d;
}

@media (max-width: 768px) {
  .custom-button {
    margin-left: 0;
  }

}

@media only screen and (min-width: 768px) and (max-width: 1280px) {
  .custom-button {
    font-size: 25px;
    margin-left: 0;
    padding: 15px 25px;
  }


}
</style>
