#!/usr/bin/env bash
# Install NDK 28 on EAS Build for Android (16 KB page size support for Google Play).
# Only runs when Android SDK is present (Android builds); no-op on iOS builds.

set -e

ANDROID_ROOT="${ANDROID_HOME:-$ANDROID_SDK_ROOT}"
if [ -z "$ANDROID_ROOT" ]; then
  echo "No ANDROID_HOME/ANDROID_SDK_ROOT — skip NDK 28 install (not an Android build)."
  exit 0
fi

# Prefer cmdline-tools; fallback to tools
SDKMANAGER=""
for path in "cmdline-tools/latest/bin/sdkmanager" "cmdline-tools/bin/sdkmanager" "tools/bin/sdkmanager"; do
  if [ -x "$ANDROID_ROOT/$path" ]; then
    SDKMANAGER="$ANDROID_ROOT/$path"
    break
  fi
done

if [ -z "$SDKMANAGER" ]; then
  echo "sdkmanager not found under ANDROID_HOME — skip NDK 28 install."
  exit 0
fi

NDK_VERSION="28.0.12433566"
# Skip if this NDK is already installed
if [ -d "$ANDROID_ROOT/ndk/$NDK_VERSION" ]; then
  echo "NDK $NDK_VERSION already installed."
  exit 0
fi

echo "Installing NDK $NDK_VERSION for 16 KB page size support..."
yes | "$SDKMANAGER" --install "ndk;$NDK_VERSION" || true

if [ -d "$ANDROID_ROOT/ndk/$NDK_VERSION" ]; then
  echo "NDK $NDK_VERSION installed successfully."
else
  echo "NDK $NDK_VERSION install may have failed (path not found). Build will use default NDK."
fi
