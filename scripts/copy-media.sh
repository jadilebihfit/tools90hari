#!/usr/bin/env bash
# Menyalin media gerakan (still + clip) dari repo openGym ke LEBIHFIT.
# Jalankan HANYA kalau lisensi/izin dari Gym visual mencakup LEBIHFIT.
#
# Pakai:  bash scripts/copy-media.sh /path/ke/openGym
set -euo pipefail

SRC="${1:?Kasih path ke folder openGym, mis: bash scripts/copy-media.sh ../openGym}"
SRC_MEDIA="$SRC/catalogue/media"
DEST="$(cd "$(dirname "$0")/.." && pwd)/media"

if [ ! -d "$SRC_MEDIA/still" ] || [ ! -d "$SRC_MEDIA/clip" ]; then
  echo "Folder $SRC_MEDIA/still atau clip tidak ditemukan." >&2
  exit 1
fi

mkdir -p "$DEST"
cp -r "$SRC_MEDIA/still" "$SRC_MEDIA/clip" "$DEST/"
echo "Selesai: $(ls "$DEST/still" | wc -l) gambar dan $(ls "$DEST/clip" | wc -l) animasi disalin ke $DEST"
echo "Jangan lupa isi media/NOTICE.md, lalu: git add media && git commit -m 'Tambah media gerakan' && git push"
