import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const defaultRoot = fileURLToPath(new URL('../', import.meta.url));
const options = { root: defaultRoot, project: null, strict: false, json: false };
const usage = 'node scripts/audit-projects.mjs [--project SLUG] [--strict] [--json] [--root PATH]';

for (let index = 2; index < process.argv.length; index += 1) {
  const argument = process.argv[index];
  if (argument === '--help') {
    console.log(`${usage}\nChecks both languages. Exit 1: errors (or warnings with --strict); exit 2: invalid arguments/input.`);
    process.exit(0);
  } else if (argument === '--strict') options.strict = true;
  else if (argument === '--json') options.json = true;
  else if (argument === '--project' || argument === '--root') {
    const value = process.argv[index + 1];
    if (!value || value.startsWith('--')) {
      console.error(`Missing value for ${argument}\n${usage}`);
      process.exit(2);
    }
    options[argument.slice(2)] = value;
    index += 1;
  } else {
    console.error(`Unknown argument: ${argument}\n${usage}`);
    process.exit(2);
  }
}

const root = path.resolve(options.root);
const issues = [];
const projects = new Map();
const requiredFields = ['title', 'order', 'period', 'role', 'tech', 'summary', 'teaser', 'solution', 'highlights'];

function report(level, code, file, line, message) {
  issues.push({ level, code, file, line, message });
}

function scalar(value = '') {
  const trimmed = value.trim();
  if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
    try { return JSON.parse(trimmed); } catch { return trimmed.slice(1, -1); }
  }
  if (trimmed.startsWith("'") && trimmed.endsWith("'")) return trimmed.slice(1, -1).replaceAll("''", "'");
  return trimmed.replace(/\s+#.*$/, '').trim();
}

function maskExamples(text) {
  return text.replace(/<!--[\s\S]*?-->|^(`{3,}|~{3,})[^\n]*\n[\s\S]*?^\1[^\n]*$/gm,
    match => match.replace(/[^\n]/g, ' '));
}

function lineAt(text, offset) {
  return text.slice(0, offset).split('\n').length;
}

function attributes(tag) {
  const result = {};
  for (const match of tag.replace(/^<\/?[\w-]+/, '').matchAll(/([\w:-]+)(?:\s*=\s*(?:"([^"]*)"|'([^']*)'|([^\s>]+)))?/g)) {
    result[match[1].toLowerCase()] = match[2] ?? match[3] ?? match[4] ?? '';
  }
  return result;
}

function resolveLiquid(value, project, line) {
  return value.replace(/{{\s*(?:'([^']+)'|"([^"]+)"|page\.(\w+))\s*\|\s*relative_url\s*}}/g,
    (match, single, double, field) => single ?? double ?? scalar(project.fields[field]?.value))
    .replace(/{{[\s\S]*?}}/g, match => {
      report('error', 'LIQUID_PATH', project.file, line, `Unsupported dynamic media path: ${match}`);
      return '';
    });
}

function localFile(url) {
  const clean = decodeURI(url.split(/[?#]/)[0]);
  if (!clean.startsWith('/images/')) return null;
  const segments = clean.slice(1).split('/');
  let current = root;
  for (const segment of segments) {
    if (!segment || segment === '.' || segment === '..' || segment.includes('\\')) return null;
    if (!fs.existsSync(current) || !fs.statSync(current).isDirectory() || !fs.readdirSync(current).includes(segment)) return null;
    current = path.join(current, segment);
  }
  return fs.statSync(current).isFile() ? current : null;
}

function auditProject(project) {
  const { file, text, fields } = project;
  for (const field of requiredFields) {
    const entry = fields[field];
    if (!entry || (!scalar(entry.value) && !entry.block.trim()) || (/^[|>][-+]?\s*$/.test(entry.value) && !entry.block.trim())) {
      report('error', 'FIELD_REQUIRED', file, entry?.line ?? 1, `Missing or empty front matter field: ${field}`);
    }
  }
  for (const field of ['tech', 'highlights']) {
    if (fields[field] && !/^\s+-\s+\S/m.test(fields[field].block)) {
      report('error', 'FIELD_LIST', file, fields[field].line, `${field} must be an indented YAML list.`);
    }
  }
  if (!/^[1-9]\d*$/.test(scalar(fields.order?.value))) {
    report('error', 'ORDER', file, fields.order?.line ?? 1, 'order must be a positive integer.');
  }
  if (fields.math && !/^(true|false)$/.test(scalar(fields.math.value))) {
    report('error', 'MATH_FLAG', file, fields.math.line, 'math must be true or false.');
  }
  const media = new Set();
  for (const match of maskExamples(text).matchAll(/\/images\/[^\s"'<>|{}),]+/g)) {
    const url = match[0];
    media.add(url);
    try {
      if (!localFile(url)) report('error', 'MEDIA_PATH', file, lineAt(text, match.index), `Missing file or case mismatch: ${url}`);
    } catch {
      report('error', 'MEDIA_PATH', file, lineAt(text, match.index), `Invalid media path: ${url}`);
    }
  }
  project.media = [...media].sort();
  const teaser = scalar(fields.teaser?.value);
  if (teaser && !teaser.startsWith('/images/')) {
    report('error', 'TEASER_PATH', file, fields.teaser.line, 'teaser must be a local /images/ path.');
  }
  const videoTeaser = /\.(mp4|webm)$/i.test(teaser);
  if (videoTeaser && !/-web\.mp4$/.test(teaser)) {
    report('error', 'VIDEO_WEB', file, fields.teaser.line, 'Use a -web.mp4 teaser, preserving the original separately.');
  }
  const companion = videoTeaser ? 'teaser_poster' : 'teaser_webp';
  if (teaser && !scalar(fields[companion]?.value).endsWith('.webp')) {
    report('warning', 'CARD_COMPANION', file, fields.teaser.line, `Set ${companion} to a local WebP asset.`);
  }
  for (const field of ['teaser_webp', 'teaser_poster']) {
    if (fields[field] && !scalar(fields[field].value).startsWith('/images/')) {
      report('error', 'CARD_PATH', file, fields[field].line, `${field} must be a local /images/ path.`);
    }
  }
  const body = maskExamples(project.body);
  const bodyLine = offset => project.bodyLine + lineAt(body, offset) - 1;
  for (const match of maskExamples(text).matchAll(/\bTODO\b/g)) {
    report('error', 'PLACEHOLDER', file, lineAt(text, match.index), 'Replace template TODO placeholders before publishing.');
  }
  const videos = [...body.matchAll(/<video\b([^>]*)>([\s\S]*?)<\/video>/gi)];
  if ((body.match(/<video\b/gi) ?? []).length !== videos.length) {
    report('error', 'VIDEO_MARKUP', file, project.bodyLine, 'Each video element must have a closing </video> tag.');
  }
  for (const match of videos) {
    const attrs = attributes(`<video ${match[1]}>`);
    const line = bodyLine(match.index);
    if (!(attrs.class ?? '').split(/\s+/).includes('lazy-video')) {
      report('error', 'VIDEO_LAZY', file, line, 'Video needs class="lazy-video".');
    }
    for (const flag of ['autoplay', 'loop', 'muted', 'playsinline']) {
      if (!(flag in attrs)) report('error', 'VIDEO_FLAGS', file, line, `Video needs ${flag}.`);
    }
    if (attrs.preload !== 'none' || 'src' in attrs) {
      report('error', 'VIDEO_EAGER', file, line, 'Use preload="none" and no video src.');
    }
    const sources = [...match[2].matchAll(/<source\b[^>]*>/gi)];
    if (!sources.length) report('error', 'VIDEO_SOURCE', file, line, 'Video needs a source[data-src].');
    for (const source of sources) {
      const sourceAttrs = attributes(source[0]);
      const url = resolveLiquid(sourceAttrs['data-src'] ?? '', project, line);
      if ('src' in sourceAttrs || !url.startsWith('/images/') || !/-web\.mp4$/.test(url) || sourceAttrs.type !== 'video/mp4') {
        report('error', 'VIDEO_SOURCE', file, line, 'Use a local -web.mp4 source[data-src] with type="video/mp4" and no src.');
      }
      const poster = resolveLiquid(attrs.poster ?? '', project, line);
      if (!poster || poster !== url.replace(/\.mp4$/, '-poster.webp')) {
        report('error', 'VIDEO_POSTER', file, line, 'Detail poster must match the video basename: Demo-web-poster.webp.');
      }
    }
  }
  const pictures = [...body.matchAll(/<picture\b[^>]*>[\s\S]*?<\/picture>/gi)];
  for (const match of body.matchAll(/<img\b[^>]*>/gi)) {
    const attrs = attributes(match[0]);
    const line = bodyLine(match.index);
    const src = resolveLiquid(attrs.src ?? '', project, line);
    if (!src) report('error', 'IMAGE_SOURCE', file, line, 'Image needs a resolvable src.');
    if (!/^[1-9]\d*$/.test(attrs.width ?? '') || !/^[1-9]\d*$/.test(attrs.height ?? '')) {
      report('warning', 'IMAGE_SIZE', file, line, 'Set intrinsic pixel width/height; put percentage display widths in CSS.');
    }
    if (!attrs.alt?.trim() || /^(图|figure)\s*\d+$/i.test(attrs.alt)) {
      report('warning', 'IMAGE_ALT', file, line, 'Describe the image content in alt, beyond its figure number.');
    }
    if (!['lazy', 'eager'].includes(attrs.loading) || attrs.decoding !== 'async') {
      report('warning', 'IMAGE_LOADING', file, line, 'Set loading="lazy" (eager only for confirmed first-screen images) and decoding="async".');
    }
    if (/\.(png|jpe?g)$/i.test(src)) {
      const picture = pictures.find(entry => entry.index <= match.index && entry.index + entry[0].length > match.index);
      const webp = picture && [...picture[0].matchAll(/<source\b[^>]*>/gi)].some(source => {
        const sourceAttrs = attributes(source[0]);
        return sourceAttrs.type === 'image/webp' && resolveLiquid(sourceAttrs.srcset ?? '', project, line).endsWith('.webp');
      });
      if (!webp) report('warning', 'IMAGE_WEBP', file, line, 'Wrap raster images in picture with a WebP source and PNG/JPG fallback.');
    }
  }
  for (const match of body.matchAll(/!\[[^\]]*\]\([^)]+\)/g)) {
    report('warning', 'MARKDOWN_IMAGE', file, bodyLine(match.index), 'Use an HTML picture/img block to specify dimensions and fallback.');
  }
  if (/(^|\n)\s*\$\$|\\\(|\\\[/.test(body) && scalar(fields.math?.value) !== 'true') {
    report('warning', 'MATH_REQUIRED', file, project.bodyLine, 'Formula delimiters found; review math: true.');
  }
}

try {
  for (const directory of ['_projects', '_projects_en']) {
    const files = fs.readdirSync(path.join(root, directory)).filter(name => name.endsWith('.md')).sort();
    const collection = new Map();
    projects.set(directory, collection);
    for (const name of files) {
      const file = `${directory}/${name}`;
      const text = fs.readFileSync(path.join(root, file), 'utf8').replace(/^\uFEFF/, '').replaceAll('\r\n', '\n');
      const match = text.match(/^---\n([\s\S]*?)\n---(?:\n|$)/);
      const fields = {};
      if (match) {
        const entries = [...match[1].matchAll(/^([\w-]+):[^\S\n]*(.*)$/gm)];
        entries.forEach((entry, index) => {
          const key = entry[1];
          if (fields[key]) report('error', 'FIELD_DUPLICATE', file, lineAt(match[1], entry.index) + 1, `Duplicate field: ${key}`);
          fields[key] = { value: entry[2], line: lineAt(match[1], entry.index) + 1,
            block: match[1].slice(entry.index + entry[0].length, entries[index + 1]?.index ?? match[1].length) };
        });
      } else report('error', 'FRONT_MATTER', file, 1, 'File must start with a YAML front matter block.');
      collection.set(name, { file, text, fields, body: match ? text.slice(match[0].length) : text,
        bodyLine: match ? lineAt(text, match[0].length) : 1 });
    }
    if (!files.length) report('error', 'COLLECTION_EMPTY', directory, 1, 'No project Markdown files found.');
    const orders = new Map();
    for (const project of collection.values()) {
      const order = scalar(project.fields.order?.value);
      if (order && orders.has(order)) report('error', 'ORDER_DUPLICATE', project.file, project.fields.order.line, `order ${order} also used by ${orders.get(order)}.`);
      orders.set(order, project.file);
    }
  }
  const names = [...new Set([...projects.get('_projects').keys(), ...projects.get('_projects_en').keys()])].sort();
  if (options.project && !names.includes(`${options.project}.md`)) throw new Error(`Unknown project slug: ${options.project}`);
  for (const name of names) {
    if (options.project && name !== `${options.project}.md`) continue;
    const chinese = projects.get('_projects').get(name);
    const english = projects.get('_projects_en').get(name);
    for (const project of [chinese, english].filter(Boolean)) auditProject(project);
    if (!chinese || !english) {
      report('error', 'LANGUAGE_PAIR', (chinese ?? english).file, 1, 'Missing project file with the same name in the other language.');
      continue;
    }
    for (const field of ['order', 'period', 'teaser', 'teaser_webp', 'teaser_poster', 'math']) {
      const left = scalar(chinese.fields[field]?.value) || (field === 'math' ? 'false' : '');
      const right = scalar(english.fields[field]?.value) || (field === 'math' ? 'false' : '');
      if (left !== right) report(field === 'math' ? 'warning' : 'error', 'LANGUAGE_FIELD', english.file,
        english.fields[field]?.line ?? 1, `${field} differs from the Chinese page.`);
    }
    if (JSON.stringify(chinese.media) !== JSON.stringify(english.media)) {
      report('error', 'LANGUAGE_MEDIA', english.file, 1, 'Local media/download paths differ from the Chinese page.');
    }
  }
  const errors = issues.filter(issue => issue.level === 'error').length;
  const warnings = issues.filter(issue => issue.level === 'warning').length;
  const summary = { scope: options.project ?? 'all', errors, warnings, strict: options.strict };
  if (options.json) console.log(JSON.stringify({ summary, issues }, null, 2));
  else {
    for (const issue of issues) console.log(`${issue.level.toUpperCase()} ${issue.file}:${issue.line} [${issue.code}] ${issue.message}`);
    console.log(`Project audit (${summary.scope}): ${errors} error(s), ${warnings} warning(s).${options.strict ? ' Strict mode.' : ''}`);
  }
  process.exitCode = errors || (options.strict && warnings) ? 1 : 0;
} catch (error) {
  console.error(`Project audit could not run: ${error.message}`);
  process.exitCode = 2;
}
