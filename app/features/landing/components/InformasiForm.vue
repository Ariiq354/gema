<template>
  <form class="space-y-6">
    <div>
      <label class="font-semibold">
        Judul Permintaan Informasi
        <span class="text-red-500">*</span>
      </label>

      <input
        type="text"
        class="w-full border rounded-lg p-3 mt-2"
      >
    </div>

    <div>
      <label class="font-semibold">
        Informasi Yang Dibutuhkan
        <span class="text-red-500">*</span>
      </label>

      <textarea
        rows="5"
        class="w-full border rounded-lg p-3 mt-2"
      />
    </div>

    <div>
      <label class="font-semibold">
        Instansi Tujuan
        <span class="text-red-500">*</span>
      </label>

      <select class="w-full border rounded-lg p-3 mt-2">
        <option>Pilih Instansi Tujuan</option>
      </select>
    </div>

    <button
      type="button"
      class="border border-eucalyptus-700 text-eucalyptus-700 px-4 py-2 rounded-lg"
    >
      Upload Lampiran
    </button>

    <button
      class="w-full bg-eucalyptus-600 hover:bg-eucalyptus-700 text-white py-4 rounded-lg font-semibold cursor-pointer"
    >
      Kirim
    </button>
  </form>
</template>
