#!/usr/bin/env bash
usage() {
  echo "用法: $0 [--fast|--full]"
  echo "  --fast    仅执行 Pod 安装，跳过清理操作"
  echo "  --full    完整清理 DerivedData 和 Pods（默认）"
  exit 1
}

MODE="full"

if [[ "$1" == "--fast" ]]; then
  MODE="fast"
elif [[ "$1" == "--full" || -z "$1" ]]; then
  MODE="full"
else
  usage
fi

set -e

START_TIME=$(date +%s)
LOG_DIR="./log"
mkdir -p "$LOG_DIR"
LOG_FILE="$LOG_DIR/fix_xcode_build_$(date +%Y%m%d_%H%M%S).log"
exec > >(tee -a "$LOG_FILE") 2>&1
echo "🕒 开始构建修复脚本日志记录: $LOG_FILE"

echo "🧹 清理 Xcode 构建缓存与 Pod 环境..."

# 退出 Xcode
if [[ "$MODE" == "full" ]]; then
  # echo "⛔ 关闭 Xcode..."
  # pkill -9 Xcode || true

  # 清除 DerivedData
  # echo "🧼 清除 DerivedData..."
  # rm -rf ~/Library/Developer/Xcode/DerivedData/"Eason_20250526_ReactNative-"*
  echo "⛔ 关闭 Xcode..."
  pkill -9 Xcode || true

  echo "🧼 清除 DerivedData..."
  rm -rf ~/Library/Developer/Xcode/DerivedData/"Eason_20250526_ReactNative-"*
fi

cd ios || { echo "❌ ios 目录不存在"; exit 1; }

# 检查 pod
if ! command -v pod &> /dev/null; then
  echo "❌ 未安装 CocoaPods，请先执行 'sudo gem install cocoapods'"
  exit 1
fi

echo "📦 CocoaPods 版本：$(pod --version)"

# 清理 Pods，缓存 & 安装依赖
if [[ "$MODE" == "full" ]]; then
  # echo "🔧 pod deintegrate..."
  # pod deintegrate

  # echo "🗑️ pod cache clean..."
  # pod cache clean --all

  # echo "🧹 删除 Pods 和 Podfile.lock..."
  # rm -rf Pods Podfile.lock
  echo "🔧 pod deintegrate..."
  pod deintegrate

  echo "🗑️ pod cache clean..."
  pod cache clean --all

  echo "🧹 删除 Pods 和 Podfile.lock..."
  rm -rf Pods Podfile.lock
fi

echo "📥 安装 Pods..."
if [[ "$(uname -m)" == "arm64" ]]; then
  if [[ "$MODE" == "full" ]]; then
    arch -arm64 pod install --repo-update
  else
    arch -arm64 pod install
  fi
else
  if [[ "$MODE" == "full" ]]; then
    pod install --repo-update
  else
    pod install
  fi
fi

echo -e "✅ Pod 安装完成"

# 打开 Workspace
echo "🚀 打开 Xcode 工作区..."
open "../ios/Eason_20250526_ReactNative.xcworkspace"

END_TIME=$(date +%s)
DURATION=$((END_TIME - START_TIME))
echo "🕒 构建流程耗时：$DURATION 秒"