# Portfolio template

A static, dependency-free portfolio site: plain HTML, CSS and JavaScript, no build step. It runs as-is on GitHub Pages.

| Page | File | What it shows |
| --- | --- | --- |
| Main page | `index.html` | Short intro, three highlighted projects, "View all projects" buttons |
| All projects | `projects.html` | Every project, filterable by tag |
| Project page | `project.html?id=<project-id>` | One project: details, write-up, code highlights, gallery |

Every page shares the navigation bar (Home, Projects, Contact, plus LinkedIn / GitHub / itch.io icon buttons and a light/dark toggle) and the footer (the same contact buttons plus Email).

## Make it yours

Almost everything lives in **`assets/js/data.js`**:

1. **`SITE`** — your name, role, headline, bio, the "details" panel, and your LinkedIn / GitHub / itch.io / email links. Leave a link as `""` to hide its button.
2. **`PROJECTS`** — one object per project. Copy an existing entry and edit it.
   - `id` must be unique and URL-safe; it becomes `project.html?id=<id>`.
   - Set `featured: true` on the three projects you want on the main page.
   - `cover`: path to an image, e.g. `assets/img/my-game/cover.jpg`. Cards crop it to 16:9; `coverPosition` (e.g. `"50% 10%"`) moves the crop. Leave `""` for a generated placeholder tinted by `hue`.
   - `video`: a YouTube video id to show a trailer instead of the cover.
   - `highlights`: the "My contributions" sections. Each has a `title` and a list of `blocks`: a string is a paragraph, `{ images: [{ src, alt }] }` shows screenshots or GIFs (click to enlarge), and `{ code: "assets/code/my-game/File.cpp" }` shows a real source file in a collapsible, syntax-highlighted block.
   - `takeaways`: bullet list at the end of the page.
   - `gallery`: optional extra screenshots.

Source files shown on project pages live in `assets/code/<project>/`. The highlighting language comes from the file extension (`.h` / `.cpp` → C++, `.cs` → C#); add `lang: "cpp"` or `lang: "csharp"` to a code block to override it. They are loaded on demand, so they only appear when the site is served over HTTP (for example on GitHub Pages), not when a page is opened straight from disk.

Then update the few things that are plain HTML, in the `<head>` of each `.html` file: the `<title>`, the `description` / `og:` meta tags, and (optionally) the favicon.

Colours and fonts are CSS variables at the top of `assets/css/style.css` (one block for dark, one for light).

## Preview locally

Opening `index.html` directly in a browser works for everything except the code snippets, which need the site to be served over HTTP (they show up once it is on GitHub Pages).

## Publish on GitHub Pages

1. Create a repository on GitHub. Name it `<username>.github.io` to get `https://<username>.github.io/`, or anything else to get `https://<username>.github.io/<repo>/`.
2. Push these files to the `main` branch, with `index.html` at the repository root.
3. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, pick `main` and `/ (root)`, and save.
4. The site is live a minute or two later.

All links in the site are relative, so it works both at a domain root and under a `/<repo>/` sub-path. The empty `.nojekyll` file tells GitHub Pages to serve the files as they are.

## File layout

```
index.html          main page
projects.html       all projects
project.html        single project (reads ?id= from the URL)
404.html            shown by GitHub Pages for unknown URLs
assets/css/style.css
assets/js/data.js   <- your content
assets/js/main.js   renders header, footer and pages from data.js
assets/js/theme.js  light/dark theme, applied before first paint
assets/img/         images, one folder per project
assets/code/        source files shown on project pages
```
