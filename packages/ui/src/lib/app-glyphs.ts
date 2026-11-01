// SPDX-FileCopyrightText: 2026 t128n Torben Haack
//
// SPDX-License-Identifier: MPL-2.0
//
// This Source Code Form is subject to the terms of the Mozilla Public
// License, v. 2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at https://mozilla.org/MPL/2.0/.

import type { Component } from 'svelte';
import type { CarbonIconProps } from 'carbon-icons-svelte';
import Api from 'carbon-icons-svelte/lib/Api.svelte';
import Application from 'carbon-icons-svelte/lib/Application.svelte';
import Branch from 'carbon-icons-svelte/lib/Branch.svelte';
import Catalog from 'carbon-icons-svelte/lib/Catalog.svelte';
import ChartLine from 'carbon-icons-svelte/lib/ChartLine.svelte';
import ChartRelationship from 'carbon-icons-svelte/lib/ChartRelationship.svelte';
import Checkmark from 'carbon-icons-svelte/lib/Checkmark.svelte';
import Cloud from 'carbon-icons-svelte/lib/Cloud.svelte';
import Code from 'carbon-icons-svelte/lib/Code.svelte';
import Cube from 'carbon-icons-svelte/lib/Cube.svelte';
import Dashboard from 'carbon-icons-svelte/lib/Dashboard.svelte';
import DataBase from 'carbon-icons-svelte/lib/DataBase.svelte';
import Deploy from 'carbon-icons-svelte/lib/Deploy.svelte';
import Diagram from 'carbon-icons-svelte/lib/Diagram.svelte';
import Document from 'carbon-icons-svelte/lib/Document.svelte';
import Filter from 'carbon-icons-svelte/lib/Filter.svelte';
import Flow from 'carbon-icons-svelte/lib/Flow.svelte';
import Grid from 'carbon-icons-svelte/lib/Grid.svelte';
import Layers from 'carbon-icons-svelte/lib/Layers.svelte';
import List from 'carbon-icons-svelte/lib/List.svelte';
import Network_4 from 'carbon-icons-svelte/lib/Network_4.svelte';
import Package from 'carbon-icons-svelte/lib/Package.svelte';
import Search from 'carbon-icons-svelte/lib/Search.svelte';
import Security from 'carbon-icons-svelte/lib/Security.svelte';
import Settings from 'carbon-icons-svelte/lib/Settings.svelte';
import TaskComplete from 'carbon-icons-svelte/lib/TaskComplete.svelte';
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
  branch: Branch,
  catalog: Catalog,
  'chart-line': ChartLine,
  'chart-relationship': ChartRelationship,
  checkmark: Checkmark,
  cloud: Cloud,
  code: Code,
  cube: Cube,
  dashboard: Dashboard,
  'data-base': DataBase,
  deploy: Deploy,
  diagram: Diagram,
  document: Document,
  filter: Filter,
  flow: Flow,
  grid: Grid,
  layers: Layers,
  list: List,
  'network-4': Network_4,
  package: Package,
  search: Search,
  security: Security,
  settings: Settings,
  'task-complete': TaskComplete,
  terminal: Terminal
} satisfies Record<AppGlyphName, Component<CarbonIconProps>>;
