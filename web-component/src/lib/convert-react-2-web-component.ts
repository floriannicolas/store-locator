import r2wc from '@r2wc/react-to-web-component';

export const convertReact2WebComponent = (
  Component: Parameters<typeof r2wc>[0],
  options?: Parameters<typeof r2wc>[1]
) => {
  const WebComponent = r2wc(Component, options);

  class WebComponentWithStyle extends WebComponent {
    connectedCallback() {
      // 2. Use connectedCallback instead of constructor (this can be changed by your usecase.)
      // @ts-ignore
      super.connectedCallback();
      const styleTag = document.getElementById("myli-store-locator");
      if (styleTag) {
        this.shadowRoot?.append(styleTag.cloneNode(true));
      }
    }
  }

  return WebComponentWithStyle;
};
