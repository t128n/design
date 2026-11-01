// SPDX-FileCopyrightText: 2026 t128n
//
// SPDX-License-Identifier: MIT

import { svelte } from '@sveltejs/vite-plugin-svelte';
import Icons from 'unplugin-icons/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [svelte(), Icons({ compiler: 'svelte' })]
});
