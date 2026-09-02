import test from "node:test";
import assert from "node:assert/strict";
import fs from "node:fs";
import path from "node:path";

const rootDir = path.resolve(import.meta.dirname, "..");
const manifestPath = path.join(rootDir, "manifest.json");

test("manifest.json exists and is valid JSON", () => {
  assert.ok(fs.existsSync(manifestPath), "manifest.json should exist");
  const raw = fs.readFileSync(manifestPath, "utf-8");
  assert.doesNotThrow(() => JSON.parse(raw), "manifest.json should be valid JSON");
});

test("manifest.json conforms to Manifest V3 specification and version 1.2.0", () => {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));

  assert.equal(manifest.manifest_version, 3, "manifest_version must be 3");
  assert.equal(manifest.version, "1.2.0", "version must be 1.2.0");
  assert.ok(typeof manifest.name === "string" && manifest.name.length > 0, "name must be a non-empty string");
  assert.ok(typeof manifest.description === "string" && manifest.description.length > 0, "description must be a non-empty string");
});

test("manifest.json permissions follow least privilege principle", () => {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));

  assert.ok(Array.isArray(manifest.permissions), "permissions must be an array");
  assert.ok(!manifest.permissions.includes("storage"), "unused 'storage' permission should be removed");
  assert.deepEqual(manifest.permissions, ["tabs"], "permissions should strictly be ['tabs']");
});

test("background service worker exists and is valid on disk", () => {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));

  assert.ok(manifest.background?.service_worker, "background.service_worker must be specified");
  const bgPath = path.join(rootDir, manifest.background.service_worker);
  assert.ok(fs.existsSync(bgPath), `Service worker file ${bgPath} must exist on disk`);
  const bgContent = fs.readFileSync(bgPath, "utf-8");
  assert.ok(bgContent.length > 0, "Service worker file should not be empty");
  assert.ok(bgContent.includes("startsWith"), "Service worker should use safe startsWith URL matching");
  assert.ok(bgContent.includes("setBadgeBackgroundColor"), "Service worker should set badge background color");
});

test("manifest icons exist on disk and have valid PNG signatures", () => {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));
  const pngSignature = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

  const iconSets = [
    { name: "icons", icons: manifest.icons },
    { name: "action.default_icon", icons: manifest.action?.default_icon },
  ];

  for (const { name, icons } of iconSets) {
    assert.ok(icons, `${name} must be defined`);
    for (const size of ["16", "48", "128"]) {
      const relPath = icons[size];
      assert.ok(relPath, `${name} should specify icon for size ${size}`);
      const absPath = path.join(rootDir, relPath);
      assert.ok(fs.existsSync(absPath), `Icon ${absPath} must exist on disk`);

      const buf = fs.readFileSync(absPath);
      assert.ok(buf.length >= 8, `Icon ${absPath} must be at least 8 bytes`);
      assert.ok(
        buf.subarray(0, 8).equals(pngSignature),
        `Icon ${absPath} must have a valid PNG signature`
      );

      // Verify dimensions
      const width = buf.readUInt32BE(16);
      const height = buf.readUInt32BE(20);
      assert.equal(width, parseInt(size, 10), `Icon width should be ${size}`);
      assert.equal(height, parseInt(size, 10), `Icon height should be ${size}`);
    }
  }
});

test("content_scripts matches, css, and js dependencies exist and are ordered correctly", () => {
  const manifest = JSON.parse(fs.readFileSync(manifestPath, "utf-8"));

  assert.ok(Array.isArray(manifest.content_scripts), "content_scripts must be an array");
  assert.ok(manifest.content_scripts.length > 0, "content_scripts must have at least one entry");

  const cs = manifest.content_scripts[0];

  // Matches pattern
  assert.ok(Array.isArray(cs.matches), "content_scripts.matches must be an array");
  assert.ok(
    cs.matches.some((m) => m.includes("https://mhf.inven.co.kr/dataninfo/mhr/monster/*")),
    "matches should match monster URL pattern with wildcard"
  );

  // CSS files
  assert.ok(Array.isArray(cs.css), "content_scripts.css must be an array");
  assert.ok(cs.css.includes("src/content/ui.css"), "css should include src/content/ui.css");
  for (const cssFile of cs.css) {
    const cssPath = path.join(rootDir, cssFile);
    assert.ok(fs.existsSync(cssPath), `CSS file ${cssPath} must exist on disk`);
    assert.ok(fs.readFileSync(cssPath, "utf-8").length > 0, `CSS file ${cssPath} should not be empty`);
  }

  // JS files
  const expectedJsOrder = [
    "src/content/common.js",
    "src/content/search-parser.js",
    "src/content/monsters.data.js",
    "src/content/monsters.js",
    "src/content/filter-state.js",
    "src/content/ui-form.js",
    "src/content/ui-table.js",
    "src/content/search.js",
  ];

  assert.deepEqual(
    cs.js,
    expectedJsOrder,
    "content_scripts.js must strictly follow the required dependency load order"
  );

  for (const jsFile of cs.js) {
    const jsPath = path.join(rootDir, jsFile);
    assert.ok(fs.existsSync(jsPath), `JS file ${jsPath} must exist on disk`);
    assert.ok(fs.readFileSync(jsPath, "utf-8").length > 0, `JS file ${jsPath} should not be empty`);
  }
});
