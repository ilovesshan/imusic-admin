import { Dialog } from "quasar";

export function showConfirmDialog(title: string, message: string, timeout: number = 1000) {
  Dialog.create({
    position: "top",
    title,
    message,
  })
}
