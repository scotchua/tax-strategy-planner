/* ============================================================================
 * REGISTRY BUILDER — run with:  node scripts/build-index.js
 * Regenerates the <script> tags between the STRATEGIES:BEGIN/END markers in
 * index.html from the files in js/data/strategies/. Run after adding or
 * removing a strategy file, then run scripts/validate-strategies.js.
 * ==========================================================================*/
var fs = require('fs');
var path = require('path');

var root = path.join(__dirname, '..');
var dir = path.join(root, 'js', 'data', 'strategies');
var htmlPath = path.join(root, 'index.html');

var files = fs.readdirSync(dir)
  .filter(function (f) { return f.slice(-3) === '.js'; })
  .sort();

var tags = files.map(function (f) {
  return '<script src="js/data/strategies/' + f + '"></script>';
}).join('\n');

var html = fs.readFileSync(htmlPath, 'utf8');
var begin = '<!-- STRATEGIES:BEGIN — auto-generated; run `node scripts/build-index.js` after adding a strategy file -->';
var end = '<!-- STRATEGIES:END -->';
var i = html.indexOf(begin), j = html.indexOf(end);
if (i === -1 || j === -1) {
  console.error('Markers not found in index.html — aborting.');
  process.exit(1);
}
if (j < i) {
  console.error('END marker precedes BEGIN marker — index.html looks corrupted (bad manual edit ' +
    'or merge conflict resolution) — aborting rather than duplicating the region between them.');
  process.exit(1);
}
var out = html.slice(0, i + begin.length) + '\n' + tags + '\n' + html.slice(j);
// Write to a temp file and rename so a crash mid-write can't leave
// index.html half-written.
var tmpPath = htmlPath + '.tmp';
fs.writeFileSync(tmpPath, out);
fs.renameSync(tmpPath, htmlPath);
console.log('Registered ' + files.length + ' strategy files in index.html.');
