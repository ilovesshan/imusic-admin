import { Notify } from "quasar";

export function showSuccess(message: string, timeout: number = 1000) {
  Notify.create({
    type: "positive",
    position: "top",
    message,
    timeout,
  })
}

export function showError(message: string, timeout: number = 1000) {
  Notify.create({
    type: "negative",
    position: "top",
    message,
    timeout,
  })
}

export function showWarning(message: string, timeout: number = 1000) {
  Notify.create({
    type: "warning",
    position: "top",
    message,
    timeout,
  })
}

export function showInfo(message: string, timeout: number = 1000) {
  Notify.create({
    type: "info",
    position: "top",
    message,
    timeout,
  })
}
