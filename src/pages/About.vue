<script setup>
import { getCurrentInstance } from 'vue';

const inst = getCurrentInstance();
inst.render = () => <div>About</div>;

</script>

<style lang="scss" scoped>

</style>