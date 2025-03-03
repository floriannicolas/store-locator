/** 
 * Testing component in live
 */
// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.tsx'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

/**
 * Building component.
 */
import StoreLocator from './components/store-locator';
import { convertReact2WebComponent } from './lib/convert-react-2-web-component';

const wcStoreLocator = convertReact2WebComponent(StoreLocator, {
  shadow: "open",
});

customElements.define("myli-store-locator", wcStoreLocator);