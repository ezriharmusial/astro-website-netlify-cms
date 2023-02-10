<script lang="ts">
    import { menu } from '@skeletonlabs/skeleton';
    import Fuse from 'fuse.js'
    import { onDestroy } from 'svelte';

    let query = "";

    // Fuse.js options
    let options = { keys: ["title", "author", "subtitle", "image", "description"] };

    // Fuse.js data
    export let data = [];

    let result = []
    const fuse = new Fuse(data, options);

    function onSearch() {
        result = fuse.search(query)
    }

</script>

<label class="input-label w-96">
    <div class="input-group input-group-divider grid-cols-[auto_1fr_auto]">
        <div class="input-group-shim">
            <svg class="w-4 h-4 svg-inline--fa fa-magnifying-glass" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="magnifying-glass" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg="">
                <path fill="currentColor" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352c79.5 0 144-64.5 144-144s-64.5-144-144-144S64 128.5 64 208s64.5 144 144 144z">
                </path>
            </svg>
            <!-- <i class="fa-solid fa-search">
            </i> Font Awesome fontawesome.com -->
        </div>
        <input class="px-2" type="search" placeholder="Search website..." bind:value={query} on:input={() => onSearch()} >
        <button use:menu={{menu: 'example', interactive: true}} on:click={() => onSearch()}>Search</button>
    </div>
</label>

<div class="relative">
    <nav class="list-nav card p-4 space-y-4 shadow-xl w-full" data-menu="example">
        <p class="font-bold">Results</p>
        <dl class="list-dl">
            {#each result as line, index}
            <a class="flex flex-auto" href={"/" + line.item.slug}>
                <dt class="font-bold">{line.item.title}</dt>
                <dd>{line.item.subtitle}</dd>
                <em class="opacity-50">{line.item.description}</em>
            </a>
            {:else}
            <div class="flex flex-auto" use:menu={{menu: 'example'}}>

                <dt class="font-bold">No results found</dt>
                <dd>Please try something else...</dd>
                <span></span>
            </div>
            {/each}
        </dl>
    </nav>
</div>