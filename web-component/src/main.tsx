/** 
 * Testing component in live
 */
// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import './globals/styles.css'
// import App from './App.tsx'

// createRoot(document.getElementById('root')!).render(
//   <StrictMode>
//     <App />
//   </StrictMode>,
// )

/**
 * Building component.
 */
import r2wc from '@r2wc/react-to-web-component';
import StoreLocator from './components/store-locator';

const wcStoreLocator = r2wc(StoreLocator);

customElements.define("myli-store-locator", wcStoreLocator);