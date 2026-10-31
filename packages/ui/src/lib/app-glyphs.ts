import type { Component } from 'svelte';
import type { CarbonIconProps } from 'carbon-icons-svelte';
import Api from 'carbon-icons-svelte/lib/Api.svelte';
import Application from 'carbon-icons-svelte/lib/Application.svelte';
import Catalog from 'carbon-icons-svelte/lib/Catalog.svelte';
import ChartLine from 'carbon-icons-svelte/lib/ChartLine.svelte';
import Checkmark from 'carbon-icons-svelte/lib/Checkmark.svelte';
import Cloud from 'carbon-icons-svelte/lib/Cloud.svelte';
import Code from 'carbon-icons-svelte/lib/Code.svelte';
import Cube from 'carbon-icons-svelte/lib/Cube.svelte';
import Dashboard from 'carbon-icons-svelte/lib/Dashboard.svelte';
import DataBase from 'carbon-icons-svelte/lib/DataBase.svelte';
import Deploy from 'carbon-icons-svelte/lib/Deploy.svelte';
import Document from 'carbon-icons-svelte/lib/Document.svelte';
import Flow from 'carbon-icons-svelte/lib/Flow.svelte';
import List from 'carbon-icons-svelte/lib/List.svelte';
import Network_4 from 'carbon-icons-svelte/lib/Network_4.svelte';
import Search from 'carbon-icons-svelte/lib/Search.svelte';
import Security from 'carbon-icons-svelte/lib/Security.svelte';
import Settings from 'carbon-icons-svelte/lib/Settings.svelte';
import Terminal from 'carbon-icons-svelte/lib/Terminal.svelte';
import type { AppGlyphName } from './app-icons';

/**
 * The in-product glyph set for application marks. The keys are Iconify Carbon
 * names so the favicon exporter can resolve the same artwork from
 * `@iconify-json/carbon`.
 *
 * Adding a glyph is one import and one entry here, plus the name in
 * `APP_GLYPHS`. The `satisfies` clause fails the build if the lists drift.
 */
export const appGlyphs = {
  api: Api,
  application: Application,
  catalog: Catalog,
  'chart-line': ChartLine,
  checkmark: Checkmark,
  cloud: Cloud,
  code: Code,
  cube: Cube,
  dashboard: Dashboard,
  'data-base': DataBase,
  deploy: Deploy,
  document: Document,
  flow: Flow,
  list: List,
  'network-4': Network_4,
  search: Search,
  security: Security,
  settings: Settings,
  terminal: Terminal
} satisfies Record<AppGlyphName, Component<CarbonIconProps>>;
