/**
 * @author: mattcroat, sturmanj
 *
 * @example
 * <script lang="ts">
 *   import { localStore } from '$lib/localStore.svelte';
 *   let count = localStore('count', 0);
 * </script>
 *
 * <button onclick={() => count.value++}>{count.value}</button>
 * <button onclick={() => count.reset()}></button>
 */

import { browser } from "$app/environment"

export class LocalStore<T> {
    value = $state<T>() as T
    #key = ""
    #default = ""

    constructor(key: string, value: T) {
        if (browser) {
            const item = localStorage.getItem(key)
            if (item) this.value = this.#deserialize(item)
        }

        this.#key = key
        this.value ??= value
        this.#default = this.#serialize(value)

        $effect(() => {
            localStorage.setItem(this.#key, this.#serialize(this.value))
        })
    }

    #serialize(value: T): string {
        return JSON.stringify(value)
    }

    #deserialize(item: string): T {
        return JSON.parse(item)
    }

    reset(): void {
        this.value = this.#deserialize(this.#default)
    }
}

export function localStore<T>(key: string, value: T) {
    return new LocalStore(key, value)
}
