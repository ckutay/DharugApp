for f in *.mp3; do g=`basename $f .mp3`; echo "Converting $g"; ffmpeg -ab 24k -i $f $g.new.mp3 || echo FAILED; done
