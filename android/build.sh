#!/usr/bin/env bash
# Build APK LEBIHFIT tanpa Android Studio (Ubuntu 24.04).
# Butuh: sudo apt-get install -y aapt apksigner dalvik-exchange android-sdk-platform-23 zipalign openjdk-21-jdk
# Pakai:  KEYSTORE=/path/lebihfit.keystore KS_PASS=xxxx bash android/build.sh
set -euo pipefail
cd "$(dirname "$0")"
ANDROID_JAR=/usr/lib/android-sdk/platforms/android-23/android.jar
OUT=build
rm -rf "$OUT" && mkdir -p "$OUT/gen" "$OUT/classes" "$OUT/dex"

aapt package -f -m -J "$OUT/gen" -M AndroidManifest.xml -S res -I "$ANDROID_JAR"
javac --release 8 -nowarn -classpath "$ANDROID_JAR" -d "$OUT/classes" \
  $(find src "$OUT/gen" -name '*.java') 2>&1 | grep -v "^warning" || true
dalvik-exchange --dex --min-sdk-version=21 --output="$OUT/dex/classes.dex" "$OUT/classes"
aapt package -f -M AndroidManifest.xml -S res -I "$ANDROID_JAR" -F "$OUT/unsigned.apk"
(cd "$OUT/dex" && aapt add ../unsigned.apk classes.dex >/dev/null)
zipalign -f -p 4 "$OUT/unsigned.apk" "$OUT/aligned.apk"
apksigner sign --ks "${KEYSTORE:?set KEYSTORE}" --ks-pass "pass:${KS_PASS:?set KS_PASS}" \
  --out ../download/LEBIHFIT.apk "$OUT/aligned.apk"
apksigner verify --print-certs ../download/LEBIHFIT.apk | head -3
echo "OK: download/LEBIHFIT.apk"
