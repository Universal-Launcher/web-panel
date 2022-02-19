import "react-i18next"

import main from "../locales/en/main.json"

declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: "main"
    main: typeof main
  }
}
