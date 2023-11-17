<script setup lang="ts">
import {Cropper} from 'vue-advanced-cropper';
import 'vue-advanced-cropper/dist/style.css';

const file = shallowRef()
const url = useObjectUrl(file)

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