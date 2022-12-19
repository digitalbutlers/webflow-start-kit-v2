# Webflow start kit v2

## Installation

1. Run `degit digitalbutlers/webflow-start-kit-v2 --force`. (Install `degit` globally if needed).
2. Update name in `package.json` file.
3. Follow the instructions from `config.js` and `config.local.js.example` files.
4. Run `pnpm install`.

## How to use

### Webflow integration

You only need to follow these steps once.

1. Run `pnpm webflow`. It will generate a webflow file in `/dist/webflow` directory.
2. Copy-paste content from built `webflow.js` file to project's custom code section.
3. Publish your website.

### Building and deploying

There are 4 commands to build and deploy.

| Command            | Minification | Deploy | Build and deploy subdirectory |
|:-------------------|:------------:|:------:|:------------------------------|
| `pnpm dev`         |      -       |   -    | `development`                 |
| `pnpm prod`        |      ✓       |   -    | `production`                  |
| `pnpm dev-deploy`  |      -       |   ✓    | `development`                 |
| `pnpm prod-deploy` |      ✓       |   ✓    | `production`                  |

### Connecting scripts and styles to the website

#### Main files

After completing 'Webflow integration' step and deploying your project you will see
that you already have `main.js` and `main.scss` files connected to the website.

#### Components

To connect component's script you have to add `[data-component-id="component-name"]`
attribute to component's html element where `component-name` equals the component directory name
(`/src/components/component-name/index.js`).
