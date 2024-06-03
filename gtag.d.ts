interface Window {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  gtag: any
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
namespace Gtag {
  export type EventNames =
    | 'login'
    | 'search'
    | 'select_content'
    | 'share'
    | 'sign_up'
    | 'view_item'
  export type EventParams = {
    event_category?: string
    event_label?: string
    value?: number
  }
}
