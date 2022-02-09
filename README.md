# https://github.com/ckeditor/ckeditor5/issues/11218

## ckeditor
- base version `v31.1.0` , 
- commit hash: `11557db819f3f634bacb60087698faec983174f6`

## step
1. cd `ckeditor/packages/ckeditor5-build-inline`
2. `npm install`,  `npm run build`
3. copy `build` to `web/ckeditor/inline` folder
4. cd `web`, run `http-server`(or another http server)
5. copy a imgage from word, can't get the `src` attribute