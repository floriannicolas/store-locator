/* eslint-disable @typescript-eslint/no-explicit-any */
import { createRoot } from 'react-dom/client';
import StoreLocator from '@/components/store-locator';
import React from 'react';

class StoreLocatorElement extends HTMLElement {
  private root: any;

  constructor() {
    super();
    const shadowRoot = this.attachShadow({ mode: 'open' });
    const container = document.createElement('div');
    shadowRoot.appendChild(container);
    this.root = createRoot(container);
  }

  connectedCallback() {
    this.root.render(React.createElement(StoreLocator));
  }

  disconnectedCallback() {
    this.root.unmount();
  }
}

if (!customElements.get('store-locator')) {
  customElements.define('store-locator', StoreLocatorElement);
}