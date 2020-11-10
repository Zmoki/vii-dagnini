# Set PATH_TO_PROJECT env variable
for NAME in "NAME 1" "NAME 2" "NAME N"
do
  unrar x ~/Downloads/"$NAME".rar ./sources
  cd $PATH_TO_PROJECT/vii-dagnini/sources/"$NAME"
  pwd
  rename -N 00000 -f 's/.*/$N.png/' *.png
  cd $PATH_TO_PROJECT/vii-dagnini
done
