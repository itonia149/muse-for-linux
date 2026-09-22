# Icon source

`muse-for-linux.svg` is the official Muse app icon vendored from
`https://muse.ai/landing/brand/muse-app-icon.svg` (discovered via the
`Organization.logo` JSON-LD on `https://muse.ai/`).

Alternative favicon variant: `https://muse.ai/images/favicon/app-squiggle.svg`.

Rendered to the hicolor size set with:

```sh
for s in 16 32 48 64 128 256 512; do
  rsvg-convert -w $s -h $s assets/muse-for-linux.svg -o assets/icons/muse-for-linux-$s.png
done
```

Meta / Muse trademark — personal use, unofficial wrapper, no affiliation.
