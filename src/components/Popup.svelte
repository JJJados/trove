<script lang="ts">
    import TabGroups from "./TabGroups.svelte";
    let tabGroups: any;
</script>

<div class="flex flex-col w-64 h-auto" >
    <div class="flex flex-row justify-between px-2 py-2 border-b-2 border-black">
        <h1 class="text-xl">* trove</h1>
        <button on:click={() => { tabGroups.saveGroups() }} class="border-red-800 border">Save groups</button>
        <button on:click={() => { tabGroups.clearGroups() }} class="border-red-800 border">Clear groups</button>
    </div>
    <TabGroups bind:this={tabGroups}/>
</div>