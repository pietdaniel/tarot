First get the images
https://github.com/jeremytarling/ruby-tarot
@jeremytarling

Gimp has scheme
Filters
 ->Script-fu
 ->Console

The browse function has documentation!

the image list is a pair of vectors in a list
(define image (car (vector->list (cadr (gimp-image-list)))))

but the image scale function takes a number
(gimp-image-scale image 150 261)

next we change the saturation all the way down, this takes a drawable
(define drawable (car (gimp-image-get-active-drawable image)))

easy change
(gimp-hue-saturation drawable 0 0 0 -100)

set the brightness and saturation
(gimp-brightness-contrast drawable 60 127)

get a the filename
(define filename (car (gimp-image-get-filename image)))

what a command
(file-jpeg-save 1 image drawable filename filename 1 1 1 1 "love" 1 1 0 0)

"love"
(caddr (cddddr (cddddr `(file-jpeg-save 1 image drawable filename filename 1 1 1 1 "love" 1 1 0 0))))

but we want to do a ton of files,

so we get an image
(define image (car (file-jpeg-load 1 filename filename)))

this helped a bit here tinyscheme documentation
http://www.alphageeksinc.com/tinyscheme/doc-tinyscheme.html

I just made this with sublime, 
there is probably a better way to list the files in the script-fu editor
(define images `("00.jpg" "07.jpg" "14.jpg" "21.jpg" "cu07.jpg" "cuqu.jpg" "pe07.jpg" "pequ.jpg" "sw06.jpg" "swpa.jpg" "wa06.jpg" "wapa.jpg" "01.jpg" "08.jpg" "15.jpg" "cu01.jpg" "cu08.jpg" "pe01.jpg" "pe08.jpg" "sw07.jpg" "swqu.jpg" "wa07.jpg" "waqu.jpg" "02.jpg" "09.jpg" "16.jpg" "cu02.jpg" "cu09.jpg" "pe02.jpg" "pe09.jpg" "sw01.jpg" "sw08.jpg" "wa01.jpg" "wa08.jpg" "03.jpg" "10.jpg" "17.jpg" "cu03.jpg" "cu10.jpg" "pe03.jpg" "pe10.jpg" "sw02.jpg" "sw09.jpg" "wa02.jpg" "wa09.jpg" "04.jpg" "11.jpg" "18.jpg" "cu04.jpg" "cuki.jpg" "pe04.jpg" "peki.jpg" "sw03.jpg" "sw10.jpg" "wa03.jpg" "wa10.jpg" "05.jpg" "12.jpg" "19.jpg" "cu05.jpg" "cukn.jpg" "pe05.jpg" "pekn.jpg" "sw04.jpg" "swki.jpg" "wa04.jpg" "waki.jpg" "06.jpg" "13.jpg" "20.jpg" "cu06.jpg" "cupa.jpg" "pe06.jpg" "pepa.jpg" "sw05.jpg" "swkn.jpg" "wa05.jpg" "wakn.jpg"))

directory
(define pwd "C:\\Users\\#{your directory jams}")

list of images with directory attached
most of this is just data munging a list of images
(define dir-images (map (lambda x (string-append pwd (car x))) images))

my manipulation function, saves the file as well
(define (manipulation filename)
  (define image (car (file-jpeg-load 1 filename filename)))
  (define drawable (car (gimp-image-get-active-drawable image)))
  (gimp-image-scale image 150 261)
  (gimp-hue-saturation drawable 0 0 0 -100)
  (gimp-brightness-contrast drawable 60 127)
  (file-jpeg-save 1 image drawable filename filename 1 1 1 1 "love" 1 1 0 0))

run that shit
(map (lambda x (manipulation (car x))) dir-images)

easy mode:
(define pwd "C:\\Users\\#{your directory jams}")
(define images `("00.jpg" "07.jpg" "14.jpg" "21.jpg" "cu07.jpg" "cuqu.jpg" "pe07.jpg" "pequ.jpg" "sw06.jpg" "swpa.jpg" "wa06.jpg" "wapa.jpg" "01.jpg" "08.jpg" "15.jpg" "cu01.jpg" "cu08.jpg" "pe01.jpg" "pe08.jpg" "sw07.jpg" "swqu.jpg" "wa07.jpg" "waqu.jpg" "02.jpg" "09.jpg" "16.jpg" "cu02.jpg" "cu09.jpg" "pe02.jpg" "pe09.jpg" "sw01.jpg" "sw08.jpg" "wa01.jpg" "wa08.jpg" "03.jpg" "10.jpg" "17.jpg" "cu03.jpg" "cu10.jpg" "pe03.jpg" "pe10.jpg" "sw02.jpg" "sw09.jpg" "wa02.jpg" "wa09.jpg" "04.jpg" "11.jpg" "18.jpg" "cu04.jpg" "cuki.jpg" "pe04.jpg" "peki.jpg" "sw03.jpg" "sw10.jpg" "wa03.jpg" "wa10.jpg" "05.jpg" "12.jpg" "19.jpg" "cu05.jpg" "cukn.jpg" "pe05.jpg" "pekn.jpg" "sw04.jpg" "swki.jpg" "wa04.jpg" "waki.jpg" "06.jpg" "13.jpg" "20.jpg" "cu06.jpg" "cupa.jpg" "pe06.jpg" "pepa.jpg" "sw05.jpg" "swkn.jpg" "wa05.jpg" "wakn.jpg"))
(define dir-images (map (lambda x (string-append pwd (car x))) images))
(define (manipulation filename) (define image (car (file-jpeg-load 0 filename filename))) (define drawable (car (gimp-image-get-active-drawable image))) (gimp-image-scale image 150 261) (gimp-hue-saturation drawable 0 0 0 -100) (gimp-brightness-contrast drawable 60 127) (file-jpeg-save 1 image drawable filename filename 1 1 1 1 "love" 1 1 0 0) #t)


ok time to go to ascii stuff

a lot of ascii converters, found this to be the best
http://www.springfrog.com/converter/ascii-text-art/index.php

curl gave me the slightest of troubles so lets try something new, 
http://phantomjs.org/download.html

how bout phantom js, running on windows

got a script that pushes to stdout, run.js
```js
var page = require('webpage').create(),
    system = require('system'),
    fname;
if (system.args.length !== 2) {
    console.log('Usage: run.js filename');
    phantom.exit(1);
} else {
    fname = system.args[1];
    page.open("http://www.springfrog.com/converter/ascii-text-art/index.php", function () {
        page.uploadFile('input[name=image]', fname);
        page.evaluate(function () {
            document.querySelector('form').submit();
        });
        window.setTimeout(function () {
            var text = page.plainText;
            var string = text.split("\n");
            var output = [];
            var record = false;
            var ctr = 0;
            for (var i in string) {
                if (record) {
                    if (ctr >= 1) {
                      output.push(string[i]);
                    }
                    if (ctr == 66) {
                        record = false
                    }
                    ctr++;
                }
                if (string[i].indexOf("Original") != -1) {
                    record = true;
                }
            }
            for (var q in output) {
                console.log(output[q])
            }
            phantom.exit();
        }, 1500);
    });
}
```

made a shell script
```sh
for file in `ls img/`; do phantomjs.exe run.js usr/$file > ascii/$file".txt"; done;
```

bingo bango

now that I have the ascii art time to make a shell program
