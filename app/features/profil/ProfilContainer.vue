<script setup lang="ts">
const philosophies = [
  {
    number: "01",
    title: "Lingkaran Setengah Terbuka",
    points: [
      "Perlindungan dan pelayanan kepada masyarakat.",
      "Keterbukaan komunikasi antara masyarakat dan Kementerian Agama.",
      "Siklus pelayanan yang berkesinambungan dari lapor → proses → solusi → evaluasi.",
      "Terbuka terhadap masukan dan kritik.",
    ],
  },
  {
    number: "02",
    title: "Tulisan GEMA yang Besar dan Tegas",
    points: [
      "Suara masyarakat memiliki posisi penting.",
      "Setiap pengaduan mendapatkan ruang untuk didengar.",
      "Transparansi dan keberanian dalam menyampaikan aspirasi.",
    ],
  },
  {
    number: "03",
    title: "Gradasi Warna Hijau",
    points: [
      "Kedamaian.",
      "Harapan.",
      "Kepercayaan.",
      "Pelayanan yang humanis dan berlandaskan nilai keagamaan.",
    ],
  },
  {
    number: "04",
    title: "Gelombang Emas di Bagian Bawah",
    points: [
      "Aliran aspirasi masyarakat yang terus bergerak.",
      "Proses perbaikan layanan yang berkelanjutan.",
      "Melambangkan kualitas pelayanan dan profesionalisme.",
    ],
  },
  {
    number: "05",
    title: "Bentuk Buku Terbuka di Sisi Kanan",
    points: [
      "Keterbukaan informasi.",
      "Dokumentasi dan akuntabilitas setiap laporan.",
      "Komitmen terhadap transparansi proses penanganan pengaduan.",
    ],
  },
];
</script>

<template>
  <section class="bg-white py-16 mt-16">
    <div class="max-w-6xl mx-auto px-6">
      <NuxtImg
        src="/images/logo-gema.webp"
        alt="Logo GEMA"
        class="w-64 mx-auto mb-8"
      />
      <div class="text-center mb-12">
        <h2 class="text-4xl font-bold text-green-700 mb-4">
          Filosofi Logo GEMA
        </h2>

        <p class="max-w-3xl mx-auto text-gray-600 leading-relaxed">
          GEMA (Gerbang Masukan dan Aspirasi) merupakan simbol hadirnya ruang
          komunikasi yang terbuka antara masyarakat dan Kementerian Agama.
          Setiap elemen visual dalam logo memiliki makna yang merepresentasikan
          nilai pelayanan, keterbukaan, dan komitmen terhadap aspirasi
          masyarakat.
        </p>
      </div>

      <div class="grid lg:grid-cols-2 gap-8">
        <div
          v-for="(item, index) in philosophies" :key="item.title"
          class="bg-gray-50 border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition" :class="[
            index === 4 ? 'lg:col-span-2 max-w-3xl mx-auto w-full' : '',
          ]"
        >
          <div class="flex items-center gap-4 mb-4">
            <div
              class="w-12 h-12 rounded-xl bg-green-100 flex items-center justify-center"
            >
              <span class="text-green-700 font-bold text-lg">
                {{ item.number }}
              </span>
            </div>

            <h3 class="text-xl font-semibold text-gray-800">
              {{ item.title }}
            </h3>
          </div>

          <ul class="space-y-3">
            <li
              v-for="point in item.points"
              :key="point"
              class="flex items-start gap-3 text-gray-600"
            >
              <svg
                class="w-5 h-5 text-green-600 mt-1 shrink-0"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fill-rule="evenodd"
                  d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                  clip-rule="evenodd"
                />
              </svg>

              <span>{{ point }}</span>
            </li>
          </ul>
        </div>
      </div>

      <div
        class="mt-12 bg-linear-to-r from-green-700 to-green-600 text-white rounded-3xl p-8"
      >
        <h3 class="text-2xl font-bold mb-4">
          Makna Keseluruhan Logo
        </h3>

        <p class="leading-relaxed text-green-50">
          GEMA (Gerbang Masukan dan Aspirasi) merupakan simbol hadirnya ruang
          komunikasi yang terbuka antara masyarakat dan Kementerian Agama.
          Lengkungan yang mengitari logo melambangkan perlindungan dan
          keterbukaan pelayanan, sementara gelombang emas menggambarkan
          aspirasi masyarakat yang terus bergerak menjadi energi perbaikan.
          Dominasi warna hijau mencerminkan nilai integritas, kedamaian, dan
          pelayanan yang humanis.
        </p>
      </div>
    </div>
  </section>
</template>
