for f in *.new.mp3; do g=`basename $f .new.mp3`; echo "Converting $g"; mv $f $g.mp3 || echo FAILED; done
