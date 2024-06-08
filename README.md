
# pdfkit

> write your book faster; iterate more

## main features

- markdown to pdf (perfile or batch)
- create pdf cover
- merge pdfs in specific directory

## usage

to use this tools, we need to install "puppeteer"

- clone the project, install libs `bun install`
- create system shell aliases

### perfile

```sh
bun run pdfkit:perfile <filename>

# or

bun run pdfkit:perfile <path/filename>

```

### batch

```sh

bun run pdfkit:batch <filename>

# or

bun run pdfkit:batch <path/filename>

```

### create cover


```sh

bun run pdfkit:cover

```

### merge pdfs

```sh

bun run pdfkit:merge <filename>

# or

bun run pdfkit:merge <path/filename>

```

## upcoming features

- [WIP] auto generated TOC (table of contents)
