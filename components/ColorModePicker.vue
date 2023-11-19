<template>
  <div>
    <ul>
      <li
        v-if='!$colorMode.unknown && "dark" === $colorMode.value'
        :class='{
          preferred: !$colorMode.unknown && "dark" === $colorMode.preference,
          selected: !$colorMode.unknown && "dark" === $colorMode.value
        }'
      >
        <UButton
          icon='i-heroicons-moon'
          size='xl'
          variant='ghost'
          @click='$colorMode.preference = "light"'
        />
      </li>

      <li
        v-if='!$colorMode.unknown && "light" === $colorMode.value'
        :class='{
          preferred: !$colorMode.unknown && "light" === $colorMode.preference,
          selected: !$colorMode.unknown && "light" === $colorMode.value
        }'
      >
        <UButton
          icon='i-heroicons-sun-20-solid'
          size='xl'
          variant='ghost'
          @click='$colorMode.preference = "dark"'
        />
      </li>
    </ul>

  </div>

</template>

<style scoped>
ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>