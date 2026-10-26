import { mount } from 'svelte';
import Page from './Page.svelte';
import { indexPage, layouts } from './layouts.js';
import '../app.css';
import './pages.css';

const id = document.body.dataset.page || 'index';
const page =
  id === 'index' ? indexPage : layouts.find((layout) => layout.id === id) || indexPage;

mount(Page, {
  target: document.getElementById('app'),
  props: { page },
});
