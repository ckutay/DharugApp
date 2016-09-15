for f in *.mp3; do g=`basename $f .mp3`; echo "Converting $g"; ffmpeg -sameq -i $f $g.new.mp3 || echo FAILED; done
