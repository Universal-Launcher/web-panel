import "react-i18next"

import main from "../../public/locales/en/main.json"
import clientpanel from "../../public/locales/en/clientpanel.json"
declare module "react-i18next" {
  interface CustomTypeOptions {
    defaultNS: "main"
    main: typeof main
    clientpanel: typeof clientpanel
  }
}
