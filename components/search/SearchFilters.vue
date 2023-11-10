<script setup lang='ts'>
const age = ref(18)
const priceMax = ref(1)
const paymentMethod = ref({
  cash: true,
  creditCard: true,
  bizum: true
})
const spokenLangs = ref({
  spanish: true,
  english: true,
  germany: true,
  italian: true,
  catalan: true
})
</script>

<template>

  <div class='filter mb-6'>
    <label for='age' class='block mb-2'> {{ $t("MinAge") }}: <strong>{{ age }}</strong> {{ $t("years") }}</label>
    <URange id='age' v-model='age' name='age' size='2xl' :min='18' :max='60'/>
  </div>

  <div class='filter mb-6'>
    <label for='price-max' class='block mb-2'>Price: <strong>{{ priceMax }}€</strong> (max)</label>
    <URange id='price-max' v-model='priceMax' name='price_max' size='2xl' :min='1' :max='200'/>
  </div>

  <div class='filter mb-6'>
    <label for='payment-method' class='block mb-2'>Payment method</label>
    <div class='group'>
      <UCheckbox v-model='paymentMethod.cash' name='cash' label='Cash' class='mb-1'/>
      <UCheckbox v-model='paymentMethod.creditCard' name='creditCard' label='Credit card' class='mb-1'/>
      <UCheckbox v-model='paymentMethod.bizum' name='bizum' label='Bizum'/>
    </div>
  </div>

  <div class='filter mb-6'>
    <label for='payment-method' class='block mb-2'>Languages</label>
    <div class='group'>
      <UCheckbox v-model='spokenLangs.spanish' name='spanish' label='Spanish' class='mb-1'/>
      <UCheckbox v-model='spokenLangs.english' name='english' label='English' class='mb-1'/>
      <UCheckbox v-model='spokenLangs.germany' name='germany' label='Germany' class='mb-1'/>
      <UCheckbox v-model='spokenLangs.italian' name='italian' label='Italian' class='mb-1'/>
      <UCheckbox v-model='spokenLangs.catalan' name='catalan' label='Catalán'/>
    </div>
  </div>

</template>
