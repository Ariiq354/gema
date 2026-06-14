interface IStatusHistory {
  statusSebelumnya: "selesai" | "pending" | "proses" | null;
  statusBaru: "selesai" | "pending" | "proses";
  catatan: string | null;
  tanggal: Date | null | string;
}

export interface ITiketData {
  instansi: string | null;
  id: number;
  noTiket: string;
  jenis: "aspirasi" | "masukan";
  status: "selesai" | "pending" | "proses";
  judul: string;
  isi: string;
  tanggalDibuat: string;
  statusHistory: IStatusHistory[];
}
