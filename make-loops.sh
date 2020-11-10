# Use bash version 4 or higher
declare -A loop0=(
  [name]="four-hands"
  [folder]="four hands loop"
  [height]=334
)
declare -A loop1=(
  [name]="gorgulia"
  [folder]="gorgulia new loop"
  [height]=345
)
declare -A loop2=(
  [name]="goroh"
  [folder]="goroh raduga loop"
  [height]=299
)
declare -A loop3=(
  [name]="leg"
  [folder]="leg leg"
  [height]=207
)
declare -A loop4=(
  [name]="lion"
  [folder]="new lion loopp"
  [height]=368
)
declare -A loop5=(
  [name]="opera"
  [folder]="opera loop"
  [height]=529
)
declare -A loop6=(
  [name]="pip-show"
  [folder]="pip show loop"
  [height]=345
)
declare -A loop7=(
  [name]="rusalka"
  [folder]="rusalka looop"
  [height]=334
)
declare -A loop8=(
  [name]="smotritelnitsa"
  [folder]="smotritelnitsa loop"
  [height]=357
)
declare -A loop9=(
  [name]="sport"
  [folder]="sport loop"
  [height]=357
)
declare -A loop10=(
  [name]="svetofor"
  [folder]="svetofor loop"
  [height]=633
)
declare -A loop11=(
  [name]="svidetel"
  [folder]="svidetel loop"
  [height]=403
)

declare -n loop
for loop in ${!loop@}; do
  smallheight=$((loop[height] / 2))
  ffmpeg -y -i ./sources/_loops/"${loop[folder]}"/%5d.png -crf 40 -vf scale=-1:${loop[height]} ./app/videos/_loops/webm/"${loop[name]}"-loop.webm
  ffmpeg -y -i ./sources/_loops/"${loop[folder]}"/%5d.png -crf 40 -c:v prores_ks -profile:v 4444 -vf scale=-1:${loop[height]} ./sources/_temp/_loops/"${loop[name]}"-loop.mov
  avconvert --preset PresetHEVCHighestQualityWithAlpha --source ./sources/_temp/_loops/"${loop[name]}"-loop.mov --output ./app/videos/_loops/hevc/"${loop[name]}"-loop.mp4
  ffmpeg -y -i ./sources/_loops/"${loop[folder]}"/%5d.png -crf 40 -vf scale=-1:${smallheight} ./app/videos/_loops/_small/webm/"${loop[name]}"-loop.webm
  ffmpeg -y -i ./sources/_loops/"${loop[folder]}"/%5d.png -crf 40 -c:v prores_ks -profile:v 4444 -vf scale=-1:${smallheight} ./sources/_temp/_loops/_small/"${loop[name]}"-loop.mov
  avconvert --preset PresetHEVCHighestQualityWithAlpha --source ./sources/_temp/_loops/_small/"${loop[name]}"-loop.mov --output ./app/videos/_loops/_small/hevc/"${loop[name]}"-loop.mp4
done

NAME="heruvim"
FOLDER="heruvim"
HEIGHT=196
smallheight=$((HEIGHT / 2))
echo $NAME
ffmpeg -y -i ./sources/_loops/"$FOLDER"/%5d.png -filter_complex "[0]split=2[bg][fg];[bg]drawbox=c=white@1:replace=1:t=fill[bg];[bg][fg]overlay=format=auto,scale=-1:$HEIGHT" ./app/videos/_loops/webm/"$NAME"-loop.webm
ffmpeg -y -i ./sources/_loops/"$FOLDER"/%5d.png -pix_fmt yuv420p -filter_complex "[0]split=2[bg][fg];[bg]drawbox=c=white@1:replace=1:t=fill[bg];[bg][fg]overlay=format=auto,scale=-1:$HEIGHT" ./app/videos/_loops/hevc/"$NAME"-loop.mp4
ffmpeg -y -i ./sources/_loops/"$FOLDER"/%5d.png -filter_complex "[0]split=2[bg][fg];[bg]drawbox=c=white@1:replace=1:t=fill[bg];[bg][fg]overlay=format=auto,scale=-1:$smallheight" ./app/videos/_loops/_small/webm/"$NAME"-loop.webm
ffmpeg -y -i ./sources/_loops/"$FOLDER"/%5d.png -pix_fmt yuv420p -filter_complex "[0]split=2[bg][fg];[bg]drawbox=c=white@1:replace=1:t=fill[bg];[bg][fg]overlay=format=auto,scale=-1:$smallheight" ./app/videos/_loops/_small/hevc/"$NAME"-loop.mp4
NAME="wings"
FOLDER="wings"
WIDTH=250
HEIGHT=150
smallwidth=126
smallheight=76
echo $NAME
ffmpeg -y -i ./sources/_loops/"$FOLDER"/%5d.png -filter_complex "[0]split=2[bg][fg];[bg]drawbox=c=white@1:replace=1:t=fill[bg];[bg][fg]overlay=format=auto,scale=$WIDTH:$HEIGHT" ./app/videos/_loops/webm/"$NAME"-loop.webm
ffmpeg -y -i ./sources/_loops/"$FOLDER"/%5d.png -pix_fmt yuv420p -filter_complex "[0]split=2[bg][fg];[bg]drawbox=c=white@1:replace=1:t=fill[bg];[bg][fg]overlay=format=auto,scale=$WIDTH:$HEIGHT" ./app/videos/_loops/hevc/"$NAME"-loop.mp4
ffmpeg -y -i ./sources/_loops/"$FOLDER"/%5d.png -filter_complex "[0]split=2[bg][fg];[bg]drawbox=c=white@1:replace=1:t=fill[bg];[bg][fg]overlay=format=auto,scale=$smallwidth:$smallheight" ./app/videos/_loops/_small/webm/"$NAME"-loop.webm
ffmpeg -y -i ./sources/_loops/"$FOLDER"/%5d.png -pix_fmt yuv420p -filter_complex "[0]split=2[bg][fg];[bg]drawbox=c=white@1:replace=1:t=fill[bg];[bg][fg]overlay=format=auto,scale=$smallwidth:$smallheight" ./app/videos/_loops/_small/hevc/"$NAME"-loop.mp4


