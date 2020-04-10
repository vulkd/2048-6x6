<template functional>
	<button
		class='cursor-pointer hover:opacity-50 border px-3 py-2 rounded-lg'
		v-on='listeners.click ? { click: listeners.click } : {}'
		:type='props.type'
	><slot></slot></button>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Button extends Vue {
  @Prop({ default: null }) private type: string|null;
}
</script>
