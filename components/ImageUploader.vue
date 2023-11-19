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

const zoom = ref(0)
const cropperEl = ref(null)


const defaultSize = ({imageSize}) => {
  return {
    width: Math.max(imageSize.height, imageSize.width),
    height: Math.max(imageSize.height, imageSize.width),
  };
}

const stencilSize = ({boundaries}) => {
  return {
    width: 324,
    height: 576,
  };
}

const onCropChange = (result) => {
  const cropper = cropperEl.value;
  if (cropper) {
    const {coordinates, imageSize} = cropper;
    if (
      imageSize.width / imageSize.height >
      coordinates.width / coordinates.height
    ) {
      // Determine the position of slider bullet
      // It's 0 if the stencil has the maximum size and it's 1 if the has the minimum size
      zoom.value =
        (cropper.imageSize.height - cropper.coordinates.height) /
        (cropper.imageSize.height - cropper.sizeRestrictions.minHeight);
    } else {
      zoom.value =
        (cropper.imageSize.width - cropper.coordinates.width) /
        (cropper.imageSize.width - cropper.sizeRestrictions.minWidth);
    }
  }
}
//https://codesandbox.io/s/vue-advanced-cropper-twitter-suoyc?file=/src/App.vue
//https://advanced-cropper.github.io/vue-advanced-cropper/guides/advanced-recipes.html#dynamic-cropper-size
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

        <div class="mb-10">
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
            :default-size="defaultSize"
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
  height: 576px;
  width: 324px;


  &__stencil {
    border: solid 5px rgb(99, 103, 43);
  }
}
</style>