# Create output folder
mkdir -p public/favicons

# Standard PNG sizes
magick _design/favicon.png -filter Lanczos -resize 16x16     -unsharp 0x1+0.5+0.05 public/favicons/favicon-16x16.png
magick _design/favicon.png -filter Lanczos -resize 32x32     -unsharp 0x1+0.5+0.05 public/favicons/favicon-32x32.png
magick _design/favicon.png -filter Lanczos -resize 48x48     -unsharp 0x1+0.5+0.05 public/favicons/favicon-48x48.png
magick _design/favicon.png -filter Lanczos -resize 180x180   -unsharp 0x1+0.5+0.05 public/favicons/apple-touch-icon.png
magick _design/favicon.png -filter Lanczos -resize 192x192   -unsharp 0x1+0.5+0.05 public/favicons/android-chrome-192x192.png
magick _design/favicon.png -filter Lanczos -resize 512x512   -unsharp 0x1+0.5+0.05 public/favicons/android-chrome-512x512.png

# .ico file (contains 16, 32, and 48px layers)
magick _design/favicon.png -filter Lanczos -resize 16x16     -unsharp 0x1+0.5+0.05 public/favicons/tmp-16.png
magick _design/favicon.png -filter Lanczos -resize 32x32     -unsharp 0x1+0.5+0.05 public/favicons/tmp-32.png
magick _design/favicon.png -filter Lanczos -resize 48x48     -unsharp 0x1+0.5+0.05 public/favicons/tmp-48.png
magick public/favicons/tmp-16.png public/favicons/tmp-32.png public/favicons/tmp-48.png public/favicons/favicon.ico
rm public/favicons/tmp-*.png

cp public/favicons/favicon.ico public/favicon.ico