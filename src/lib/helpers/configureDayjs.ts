import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";

//Date format used in app
export const DEFAULT_DATE_FORMAT = "MM/DD/YYYY";

//Call this function at root to configure neccessary plugins and custiomizations for dayjs
export default function configureDayjs() {
  dayjs.extend(customParseFormat);
}
