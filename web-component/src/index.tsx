import r2wc from '@r2wc/react-to-web-component';
import StoreLocator from './components/store-locator';

const wcStoreLocator = r2wc(StoreLocator);

customElements.define("myli-store-locator", wcStoreLocator);