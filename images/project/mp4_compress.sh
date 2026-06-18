mkdir -p backup
find . -path "./backup" -prune -o -type f -iname "*.mp4" -print0 | while IFS= read -r -d '' video_path; do
    echo "========================================"
    echo "正在处理: $video_path"
    
    # 清理路径，去掉开头的 ./ 方便后续处理
    clean_path="${video_path#./}"
    rel_dir=$(dirname "$clean_path")
    filename=$(basename "$clean_path")
    
    # 在 backup 文件夹内创建相同的子目录结构，防止同名覆盖
    mkdir -p "backup/$rel_dir"
    
    # 定义临时输出文件，确保 FFmpeg 成功后才替换原文件
    temp_output="${video_path}.tmp.mp4"
    
    # 执行 FFmpeg 转换
    # 优化点：使用 min(1920,iw) 可以确保大于 1080p 的视频被压减，而原本就小于 1080p 的视频不会被错误放大
    ffmpeg -nostdin -i "$video_path" -vf "scale='min(1920,iw)':-2" -c:v libx264 -profile:v high -level 4.1 -pix_fmt yuv420p -c:a copy "$temp_output" -y
    
    # 检查上一步 FFmpeg 是否成功执行
    if [ $? -eq 0 ]; then
        # 1. 将原视频移动到备份目录
        mv "$video_path" "backup/$clean_path"
        # 2. 将优化后的新视频重命名为原视频名字（路径索引完全不变）
        mv "$temp_output" "$video_path"
        echo "【成功】已替换原文件，原视频已备份至: backup/$clean_path"
    else
        echo "【失败】转换 $video_path 期间出错，已保持原状。"
        rm -f "$temp_output"
    fi
done