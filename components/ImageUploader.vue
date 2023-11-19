<script setup lang="ts">
import {Cropper} from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

const isOpen = ref(false)
const file = shallowRef()
const url = useObjectUrl(file)

const {files, open, reset, onChange} = useFileDialog({
  accept: 'image/*'
})

onChange((files) => {
  file.value = files[0]
  isOpen.value = true
})

const cropperEl = ref(null)



const stencilSize = ({boundaries}) => {
  return {
    width: boundaries.width,
    height: boundaries.height,
  };
}

const onCropChange = (result) => {
  console.log(result);
}

const processCroppedImage = () => {
  isOpen.value = false
}

const resetCroppedImage = () => {
  isOpen.value = false
}
</script>

<template>
  <UFormGroup label="location" name="location">

    <UButton
      @click="open"
      label="Select main picture"
      v-if="!files"
    />

    <USlideover v-model='isOpen'>
      <UCard class='flex flex-col flex-1' :ui="{ body: { base: 'flex-1' }, ring: '', divide: 'divide-y divide-gray-100 dark:divide-gray-800' }">

        <div class="flex justify-center h-full">
          <cropper
            ref="cropperEl"
            class="twitter-cropper"
            background-class="twitter-cropper__background"
            foreground-class="twitter-cropper__foreground"
            image-restriction="stencil"
            :stencil-size="stencilSize"
            :stencil-props="{
        lines: {},
        handlers: {},
        movable: false,
        scalable: false,
        aspectRatio: 9/16,
        previewClass: 'twitter-cropper__stencil',
      }"
            :transitions="false"
            :canvas="false"
            :debounce="false"
            :src="url"
            @change="onCropChange"
          />
        </div>

        <template #footer>
          <div class="flex justify-end">
            <UButton
              @click='resetCroppedImage'
              label='Cancelar'
              size='xl'
              class="mr-4"
              color="black"
            />

            <UButton
              @click='processCroppedImage'
              label='Confirmar'
              size='xl'
            />
          </div>

        </template>


      </UCard>
    </USlideover>


  </UFormGroup>


</template>

<style lang="scss">
.twitter-cropper {


  &__stencil {
    border: solid 5px rgb(99, 103, 43);
  }
}
</style>