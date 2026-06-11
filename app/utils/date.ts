import { format } from "date-fns";
import { id } from "date-fns/locale";

export function formatDate(
  date: Date | string,
  formatString = "dd MMM yyyy, HH.mm",
) {
  return format(new Date(date), formatString, {
    locale: id,
  });
}
