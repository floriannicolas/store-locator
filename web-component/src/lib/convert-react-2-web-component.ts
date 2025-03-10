import r2wc from '@r2wc/react-to-web-component'

export const convertReact2WebComponent = (
  Component: Parameters<typeof r2wc>[0],
  options?: Parameters<typeof r2wc>[1],
) => {
  const WebComponent = r2wc(Component, options)

  class WebComponentWithStyle extends WebComponent {
    connectedCallback() {
      // 2. Use connectedCallback instead of constructor (this can be changed by your usecase.)
      // @ts-expect-error a WebComponent has the connectedCallback method
      super.connectedCallback()
      const styleTags = document.getElementsByTagName('style')
      Array.from(styleTags).forEach((styleTag) => {
        this.shadowRoot?.append(styleTag.cloneNode(true))
      })
    }
  }

  return WebComponentWithStyle
}
