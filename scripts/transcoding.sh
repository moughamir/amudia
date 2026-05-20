#!/bin/sh
INPUT=$1
MEDIA_ID=$2
OUTPUT_DIR=${3:-/media}

transcode_hls() {
  ffmpeg -i "$INPUT" \
    -filter_complex "[0:v]split=3[v480][v720][v1080]" \
    -map "[v480]" -map "0:a" \
    -c:v libx264 -b:v:0 800k -s:v:0 854x480 \
    -c:a aac -b:a 128k \
    -map "[v720]" -map "0:a" \
    -c:v:1 libx264 -b:v:1 2800k -s:v:1 1280x720 \
    -c:a:1 aac -b:a 128k \
    -map "[v1080]" -map "0:a" \
    -c:v:2 libx264 -b:v:2 5000k -s:v:2 1920x1080 \
    -c:a:2 aac -b:a 192k \
    -var_stream_map "v:0,a:0 v:1,a:1 v:2,a:2" \
    -f hls \
    -hls_time 6 \
    -hls_playlist_type vod \
    -master_pl_name "master.m3u8" \
    -hls_segment_filename "${OUTPUT_DIR}/${MEDIA_ID}/%v/segment_%03d.ts" \
    "${OUTPUT_DIR}/${MEDIA_ID}/master.m3u8"
}

transcode_thumbnail() {
  ffmpeg -ss 00:00:30 -i "$INPUT" \
    -vframes 1 -s 640x360 \
    "${OUTPUT_DIR}/${MEDIA_ID}/poster.jpg"
}

if [ -z "$INPUT" ] || [ -z "$MEDIA_ID" ]; then
  echo "Usage: $0 <input_file> <media_id> [output_dir]"
  exit 1
fi

mkdir -p "${OUTPUT_DIR}/${MEDIA_ID}"

transcode_hls && transcode_thumbnail
echo "Done: ${MEDIA_ID}"
