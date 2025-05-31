# Highlightjs-Terraform (maintained fork)

[![npm version](https://badge.fury.io/js/@taga3s%2Fhighlightjs-terraform.svg)](https://badge.fury.io/js/@taga3s%2Fhighlightjs-terraform)

This is a maintained fork of https://github.com/highlightjs/highlightjs-terraform. I started this fork because the original repository was not being maintained for a long time, but it is still a very useful library for syntax highlighting Terraform code in web applications using Highlight.js.

## Usage

1. Install with npm, pnpm, or yarn:

```bash
$ npm install @taga3s/highlightjs-terraform
```

2. Use `.css` files of highlight.js in your project

## Example

- Using with `rehype` plugins

```typescript
import rehypeHighlight from 'rehype-highlight'
import rehypeParse from 'rehype-parse'
import rehypeStringify from 'rehype-stringify'
import { common } from 'lowlight'
import { definer } from '@taga3s/highlightjs-terraform'
import { read } from 'to-vfile'
import { unified } from 'unified'

const file = await read('example.html')

await unified()
  .use(rehypeParse)
  .use(rehypeHighlight, {
      languages: { ...common, tf: definer },
      detect: true,
  })
  .use(rehypeStringify)
  .process(file)

console.log(String(file))
```

## License

[MIT](https://github.com/taga3s/highlightjs-terraform/blob/main/LICENSE)
