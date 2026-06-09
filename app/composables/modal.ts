import ModalConfirm from "~/components/Modal/ModalConfirm.vue";
import ModalProses from "~/components/Modal/ModalProses.vue";
import ModalTerima from "~/components/Modal/ModalTerima.vue";

const overlay = useOverlay();
export function openModal(
  component: any,
  props: object,
) {
  const modal = overlay.create(component, {
    props,
  });

  return modal.open();
}
export function openConfirmModal(
  path: string,
  body: object,
  refresh: () => void,
) {
  const modal = overlay.create(ModalConfirm, {
    props: {
      path,
      body,
      refresh,
    },
  });

  modal.open();
}

export function openConfirmModalTerimaLaporan(
  path: string,
  refresh: () => void,
) {
  const modal = overlay.create(ModalTerima, {
    props: {
      path,
      refresh,
    },
  });

  modal.open();
}

export function openConfirmModalProsesLaporan(
  path: string,
  refresh: () => void,
) {
  const modal = overlay.create(ModalProses, {
    props: {
      path,
      refresh,
    },
  });

  modal.open();
}
