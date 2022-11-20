import { Dialog } from "quasar";

export function showConfirmDialog(
  title: string, message: string, okLabel: string = "确定", cancelLabel: string = "取消", timeout: number = 1000, persistent: boolean = false
): Promise<any> {
  return new Promise((resolve, reject) => {
    Dialog.create({
      position: "top",
      title,
      message,
      persistent,
      ok: {
        color: "positive",
        push: true,
        label: okLabel
      },
      cancel: {
        push: true,
        color: 'positive',
        label: cancelLabel
      },
    }).onOk(() => resolve(1)).onCancel(() => reject(-1)).onDismiss(() => reject(-1))
  })
}
