NAME="four-hands"
FOLDER="four hands move"
HEIGHT=400
echo $NAME
ffmpeg -y -i ./sources/_moves/"$FOLDER"/%5d.png -itsoffset 00:00:05 -i ./sources/audio/4hands2.mp3 -filter_complex "[0]split=2[bg][fg];[bg]drawbox=c=white@1:replace=1:t=fill[bg];[bg][fg]overlay=format=auto,scale=-1:${HEIGHT}" ./app/videos/_moves/webm/"$NAME"-move.webm
ffmpeg -y -i ./sources/_moves/"$FOLDER"/%5d.png -itsoffset 00:00:05 -i ./sources/audio/4hands2.mp3 -pix_fmt yuv420p -filter_complex "[0]split=2[bg][fg];[bg]drawbox=c=white@1:replace=1:t=fill[bg];[bg][fg]overlay=format=auto,scale=-1:${HEIGHT}" ./app/videos/_moves/hevc/"$NAME"-move.mp4
NAME="gorgulia"
FOLDER="gorgulia move + 2 loops"
HEIGHT=400
echo $NAME
ffmpeg -y -i ./sources/_moves/"$FOLDER"/%5d.png -filter_complex "[0]split=2[bg][fg];[bg]drawbox=c=white@1:replace=1:t=fill[bg];[bg][fg]overlay=format=auto,scale=390:${HEIGHT}" ./app/videos/_moves/webm/"$NAME"-move.webm
ffmpeg -y -i ./sources/_moves/"$FOLDER"/%5d.png -pix_fmt yuv420p -filter_complex "[0]split=2[bg][fg];[bg]drawbox=c=white@1:replace=1:t=fill[bg];[bg][fg]overlay=format=auto,scale=390:${HEIGHT}" ./app/videos/_moves/hevc/"$NAME"-move.mp4
NAME="goroh"
FOLDER="goroh raduga move"
HEIGHT=402
echo $NAME
ffmpeg -y -i ./sources/_moves/"$FOLDER"/%5d.png -filter_complex "[0]split=2[bg][fg];[bg]drawbox=c=white@1:replace=1:t=fill[bg];[bg][fg]overlay=format=auto,scale=-1:${HEIGHT}" ./app/videos/_moves/webm/"$NAME"-move.webm
ffmpeg -y -i ./sources/_moves/"$FOLDER"/%5d.png -pix_fmt yuv420p -filter_complex "[0]split=2[bg][fg];[bg]drawbox=c=white@1:replace=1:t=fill[bg];[bg][fg]overlay=format=auto,scale=-1:${HEIGHT}" ./app/videos/_moves/hevc/"$NAME"-move.mp4
NAME="heruvim"
FOLDER="heruvim"
HEIGHT=300
echo $NAME
ffmpeg -y -i ./sources/_loops/"$FOLDER"/%5d.png -filter_complex "[0]split=2[bg][fg];[bg]drawbox=c=white@1:replace=1:t=fill[bg];[bg][fg]overlay=format=auto,scale=-1:${HEIGHT}" ./app/videos/_moves/webm/"$NAME"-move.webm
ffmpeg -y -i ./sources/_loops/"$FOLDER"/%5d.png -pix_fmt yuv420p -filter_complex "[0]split=2[bg][fg];[bg]drawbox=c=white@1:replace=1:t=fill[bg];[bg][fg]overlay=format=auto,scale=-1:${HEIGHT}" ./app/videos/_moves/hevc/"$NAME"-move.mp4
NAME="leg"
FOLDER="leg leg"
HEIGHT=210
echo $NAME
ffmpeg -y -i ./sources/_loops/"$FOLDER"/%5d.png -filter_complex "[0]split=2[bg][fg];[bg]drawbox=c=white@1:replace=1:t=fill[bg];[bg][fg]overlay=format=auto,scale=-1:${HEIGHT}" ./app/videos/_moves/webm/"$NAME"-move.webm
ffmpeg -y -i ./sources/_loops/"$FOLDER"/%5d.png -pix_fmt yuv420p -filter_complex "[0]split=2[bg][fg];[bg]drawbox=c=white@1:replace=1:t=fill[bg];[bg][fg]overlay=format=auto,scale=-1:${HEIGHT}" ./app/videos/_moves/hevc/"$NAME"-move.mp4
NAME="lion"
FOLDER="lion new move"
HEIGHT=400
echo $NAME
ffmpeg -y -i ./sources/_moves/"$FOLDER"/%5d.png -filter_complex "[0]split=2[bg][fg];[bg]drawbox=c=white@1:replace=1:t=fill[bg];[bg][fg]overlay=format=auto,scale=${HEIGHT}:${HEIGHT}" ./app/videos/_moves/webm/"$NAME"-move.webm
ffmpeg -y -i ./sources/_moves/"$FOLDER"/%5d.png -pix_fmt yuv420p -filter_complex "[0]split=2[bg][fg];[bg]drawbox=c=white@1:replace=1:t=fill[bg];[bg][fg]overlay=format=auto,scale=${HEIGHT}:${HEIGHT}" ./app/videos/_moves/hevc/"$NAME"-move.mp4
NAME="opera"
FOLDER="opera moove"
HEIGHT=500
echo $NAME
ffmpeg -y -i ./sources/_moves/"$FOLDER"/%5d.png -itsoffset 00:00:06 -i ./sources/audio/opera.mp3 -filter_complex "[0]split=2[bg][fg];[bg]drawbox=c=white@1:replace=1:t=fill[bg];[bg][fg]overlay=format=auto,scale=-1:${HEIGHT}" ./app/videos/_moves/webm/"$NAME"-move.webm
ffmpeg -y -i ./sources/_moves/"$FOLDER"/%5d.png -itsoffset 00:00:06 -i ./sources/audio/opera.mp3 -pix_fmt yuv420p -filter_complex "[0]split=2[bg][fg];[bg]drawbox=c=white@1:replace=1:t=fill[bg];[bg][fg]overlay=format=auto,scale=-1:${HEIGHT}" ./app/videos/_moves/hevc/"$NAME"-move.mp4
NAME="pip-show"
FOLDER="pip show loop move"
HEIGHT=560
echo $NAME
ffmpeg -y -i ./sources/_moves/"$FOLDER"/%5d.png -filter_complex "[0]split=2[bg][fg];[bg]drawbox=c=white@1:replace=1:t=fill[bg];[bg][fg]overlay=format=auto,scale=-1:${HEIGHT}" ./app/videos/_moves/webm/"$NAME"-move.webm
ffmpeg -y -i ./sources/_moves/"$FOLDER"/%5d.png -pix_fmt yuv420p -filter_complex "[0]split=2[bg][fg];[bg]drawbox=c=white@1:replace=1:t=fill[bg];[bg][fg]overlay=format=auto,scale=-1:${HEIGHT}" ./app/videos/_moves/hevc/"$NAME"-move.mp4
NAME="raduga"
FOLDER="raduga dlya smotritelnitsy"
HEIGHT=290
echo $NAME
ffmpeg -y -i ./sources/_moves/"$FOLDER"/%5d.png -filter_complex "[0]split=2[bg][fg];[bg]drawbox=c=white@1:replace=1:t=fill[bg];[bg][fg]overlay=format=auto,scale=-1:${HEIGHT}" ./app/videos/_moves/webm/"$NAME"-move.webm
ffmpeg -y -i ./sources/_moves/"$FOLDER"/%5d.png -pix_fmt yuv420p -filter_complex "[0]split=2[bg][fg];[bg]drawbox=c=white@1:replace=1:t=fill[bg];[bg][fg]overlay=format=auto,scale=-1:${HEIGHT}" ./app/videos/_moves/hevc/"$NAME"-move.mp4
NAME="rusalka"
FOLDER="rusalka looop"
HEIGHT=402
echo $NAME
ffmpeg -y -i ./sources/_loops/"$FOLDER"/%5d.png -filter_complex "[0]split=2[bg][fg];[bg]drawbox=c=white@1:replace=1:t=fill[bg];[bg][fg]overlay=format=auto,scale=-1:${HEIGHT}" ./app/videos/_moves/webm/"$NAME"-move.webm
ffmpeg -y -i ./sources/_loops/"$FOLDER"/%5d.png -pix_fmt yuv420p -filter_complex "[0]split=2[bg][fg];[bg]drawbox=c=white@1:replace=1:t=fill[bg];[bg][fg]overlay=format=auto,scale=-1:${HEIGHT}" ./app/videos/_moves/hevc/"$NAME"-move.mp4
NAME="smotritelnitsa"
FOLDER="smotritelnitsa loop move loop"
HEIGHT=400
echo $NAME
ffmpeg -y -i ./sources/_moves/"$FOLDER"/%5d.png -vf scale=-1:$HEIGHT ./app/videos/_moves/webm/"$NAME"-move.webm
ffmpeg -y -i ./sources/_moves/"$FOLDER"/%5d.png -c:v prores_ks -profile:v 4444 -vf scale=-1:$HEIGHT ./sources/_temp/_moves/"$NAME"-move.mov
avconvert --preset PresetHEVCHighestQualityWithAlpha --source ./sources/_temp/_moves/"$NAME"-move.mov --output ./app/videos/_moves/hevc/"$NAME"-move.mp4
NAME="sport"
FOLDER="sport loop move loop"
HEIGHT=404
echo $NAME
ffmpeg -y -i ./sources/_moves/"$FOLDER"/%5d.png -filter_complex "[0]split=2[bg][fg];[bg]drawbox=c=white@1:replace=1:t=fill[bg];[bg][fg]overlay=format=auto,scale=-1:${HEIGHT}" ./app/videos/_moves/webm/"$NAME"-move.webm
ffmpeg -y -i ./sources/_moves/"$FOLDER"/%5d.png -pix_fmt yuv420p -filter_complex "[0]split=2[bg][fg];[bg]drawbox=c=white@1:replace=1:t=fill[bg];[bg][fg]overlay=format=auto,scale=-1:${HEIGHT}" ./app/videos/_moves/hevc/"$NAME"-move.mp4
NAME="svetofor"
FOLDER="svetofor move"
HEIGHT=602
echo $NAME
ffmpeg -y -i ./sources/_moves/"$FOLDER"/%5d.png -filter_complex "[0]split=2[bg][fg];[bg]drawbox=c=white@1:replace=1:t=fill[bg];[bg][fg]overlay=format=auto,scale=-1:${HEIGHT}" ./app/videos/_moves/webm/"$NAME"-move.webm
ffmpeg -y -i ./sources/_moves/"$FOLDER"/%5d.png -pix_fmt yuv420p -filter_complex "[0]split=2[bg][fg];[bg]drawbox=c=white@1:replace=1:t=fill[bg];[bg][fg]overlay=format=auto,scale=-1:${HEIGHT}" ./app/videos/_moves/hevc/"$NAME"-move.mp4
NAME="svidetel"
FOLDER="svidetel move"
HEIGHT=402
echo $NAME
ffmpeg -y -i ./sources/_moves/"$FOLDER"/%5d.png -filter_complex "[0]split=2[bg][fg];[bg]drawbox=c=white@1:replace=1:t=fill[bg];[bg][fg]overlay=format=auto,scale=-1:${HEIGHT}" ./app/videos/_moves/webm/"$NAME"-move.webm
ffmpeg -y -i ./sources/_moves/"$FOLDER"/%5d.png -pix_fmt yuv420p -filter_complex "[0]split=2[bg][fg];[bg]drawbox=c=white@1:replace=1:t=fill[bg];[bg][fg]overlay=format=auto,scale=-1:${HEIGHT}" ./app/videos/_moves/hevc/"$NAME"-move.mp4
NAME="wings"
FOLDER="wings"
WIDTH=494
HEIGHT=300
echo $NAME
ffmpeg -y -i ./sources/_loops/"$FOLDER"/%5d.png -filter_complex "[0]split=2[bg][fg];[bg]drawbox=c=white@1:replace=1:t=fill[bg];[bg][fg]overlay=format=auto,scale=${WIDTH}:${HEIGHT}" ./app/videos/_moves/webm/"$NAME"-move.webm
ffmpeg -y -i ./sources/_loops/"$FOLDER"/%5d.png -pix_fmt yuv420p -filter_complex "[0]split=2[bg][fg];[bg]drawbox=c=white@1:replace=1:t=fill[bg];[bg][fg]overlay=format=auto,scale=${WIDTH}:${HEIGHT}" ./app/videos/_moves/hevc/"$NAME"-move.mp4
