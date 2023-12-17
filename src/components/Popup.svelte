<script lang="ts">
    import TabGroups from "./TabGroups.svelte";
    let tabGroups: any;
</script>

<div class="flex flex-col w-64 h-auto bg-white text-slate-900 dark:bg-dark dark:text-white" >
    <div class="flex flex-row justify-between px-2 py-2 border-b-2 border-black">
        <h1 class="text-xl">* trove</h1>
        <button on:click={() => { tabGroups.saveTabGroups() }} class="border-red-800 border">Save groups</button>
        <button on:click={() => { tabGroups.clearTabGroups() }} class="border-red-800 border">Clear groups</button>
    </div>
    <TabGroups bind:this={tabGroups}/>
</div>