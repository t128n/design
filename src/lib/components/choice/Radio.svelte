<script lang="ts">
  let {
    value,
    name,
    checked = $bindable(false),
    label = "",
  }: {
    value: string;
    name: string;
    checked?: boolean;
    label?: string;
  } = $props();
</script>

<label class="t128n-radio">
  <input
    class="t128n-radio__input"
    type="radio"
    {value}
    {name}
    {checked}
    tabindex={checked ? 0 : -1}
    onchange={(event) => {
      checked = event.currentTarget.checked;
    }}
  />
  <span class="t128n-radio__box" aria-hidden="true"></span>
  <span class="t128n-radio__label">{label}</span>
</label>

<style>
  .t128n-radio {
    position: relative;
    display: inline-flex;
    align-items: center;
    gap: var(--space-2);
    color: var(--text-1);
    font: var(--type-body);
    cursor: pointer;
  }

  .t128n-radio__input {
    position: absolute;
    top: 0;
    left: 0;
    width: var(--icon);
    height: var(--icon);
    margin: 0;
    opacity: 0;
    cursor: pointer;
  }

  .t128n-radio__box {
    display: inline-flex;
    flex: none;
    align-items: center;
    justify-content: center;
    box-sizing: border-box;
    width: var(--icon);
    height: var(--icon);
    border: var(--ring-offset) solid var(--border-control);
    border-radius: var(--radius-full);
    background: var(--surface-panel);
  }

  .t128n-radio__box::after {
    content: "";
    width: var(--space-1);
    height: var(--space-1);
    border-radius: var(--radius-full);
    background: var(--accent);
    opacity: 0;
  }

  .t128n-radio:hover .t128n-radio__box {
    background-image: linear-gradient(var(--state-hover), var(--state-hover));
  }

  .t128n-radio:active .t128n-radio__box {
    background-image: linear-gradient(var(--state-pressed), var(--state-pressed));
  }

  .t128n-radio__input:focus-visible + .t128n-radio__box {
    outline: var(--ring-width) solid var(--ring-color);
    outline-offset: var(--ring-offset);
  }

  .t128n-radio__input:checked + .t128n-radio__box {
    border-color: var(--accent);
    background: var(--surface-panel);
  }

  .t128n-radio__input:checked + .t128n-radio__box::after {
    opacity: 1;
  }

  .t128n-radio__input:disabled + .t128n-radio__box {
    border-color: transparent;
    background: var(--surface-sunken);
    background-image: none;
  }

  .t128n-radio__input:disabled ~ .t128n-radio__label {
    color: var(--text-2);
  }

  .t128n-radio__input:disabled {
    cursor: not-allowed;
  }
</style>
