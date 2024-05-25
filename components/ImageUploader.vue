<script setup lang="ts">
import {Cropper} from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

const file = shallowRef()
const url = useObjectUrl(file)
const model = defineModel()

const {files, open, reset, onChange} = useFileDialog({
  accept: 'image/*'
})

onChange((files) => {
  file.value = files[0]
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
    const a = imageSize.width / imageSize.height;
    const b = coordinates.width / coordinates.height;

    if (a > b) {
      // Determine the position of slider bullet
      // It's 0 if the stencil has the maximum size and it's 1 if the has the minimum size
      const imhHeight = cropper.imageSize.height;
      const coordsHeight = cropper.coordinates.height;
      const minHeight = cropper.sizeRestrictions.minHeight;
      zoom.value = (imhHeight - coordsHeight) / (imhHeight - minHeight);

    } else {
      const imgWidth = cropper.imageSize.width;
      const coordsWidth = cropper.coordinates.width;
      const minWidth = cropper.sizeRestrictions.minWidth;

      zoom.value = (imgWidth - coordsWidth) / (imgWidth - minWidth);
    }

    // @todo try to delay the value until user finishes dragging or zooming.
    model.value = file.value
  }
}
//https://codesandbox.io/s/vue-advanced-cropper-twitter-suoyc?file=/src/App.vue
//https://advanced-cropper.github.io/vue-advanced-cropper/guides/advanced-recipes.html#dynamic-cropper-size
</script>

<template>

  <UFormGroup label="location" name="location">
    <UButton @click="open" label="Select main picture"/>

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