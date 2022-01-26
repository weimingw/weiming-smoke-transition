<script setup>
import { getCurrentInstance } from 'vue';

const inst = getCurrentInstance();
inst.render = () => <div>Home</div>;

</script>

<style lang="scss" scoped>

</style>