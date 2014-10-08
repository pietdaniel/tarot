#for file in `ls images/`; do jp2a --invert images/$file; done;
for file in `ls images/`; do jp2a --invert images/$file > ascii/$file".jp2a.txt"; done;
