#!/usr/bin/env node
// Auto-tagger prototype: generates semantic tags from style names
// Run: node scripts/auto-tagger.js

// Tag vocabulary
const tagRules = {
  subject: [
    [/food|dish|plate|meal|ingredient|recipe|cuisine/i, "food"],
    [/drink|cocktail|beer|wine|whiskey|coffee|tea|espresso|pour|sip|champagne|martini|bourbon|scotch|margarita|ale|latte|soda/i, "drink"],
    [/steak|ribeye|filet|burger|pizza|wing|taco|sandwich|wrap|salad|soup|pasta|sushi|lobster|shrimp|oyster|crab|fish|chicken|fry|fries|nachos|pretzel/i, "food"],
    [/cheese|bread|butter|cream|sauce|gravy|caramel|chocolate|honey|sugar|salt|pepper|spice|herb|egg|dough|flour|rice|truffle|olive oil|balsamic/i, "food"],
    [/dessert|cake|pie|crème|brûlée|ice cream|cookie|pastry/i, "food"],
    [/chef|bartender|server|waiter|sommelier|host|staff|cook|dishwasher|manager|line cook/i, "staff"],
    [/guest|crowd|people|friend|couple|group|diner|audience|singer|performer|band|musician/i, "people"],
    [/venue|room|dining|restaurant|bar |casino|hotel|lobby|entrance|hallway|staircase|patio|rooftop|exterior|building|property|parking/i, "space"],
    [/kitchen|prep|back.?of.?house|hood|dish pit|walk.?in|cooler/i, "kitchen"],
    [/bar top|bar back|bottle|tap|keg|glass|cocktail.*shaker/i, "bar"],
    [/table|booth|seat|chair|reservation|napkin|silverware|plate setting/i, "table"],
    [/stage|music|band|karaoke|dance floor|jukebox|drum|guitar/i, "stage"],
    [/logo|brand|sign|marquee|neon sign/i, "brand"],
    [/camera|gear|lighting|setup|equipment|drone|gimbal|slider|tripod/i, "equipment"],
    [/slot|poker|dice|chip|roulette|blackjack|gaming|jackpot/i, "gaming"],
  ],
  energy: [
    [/still|static|locked|frozen|pause|hold/i, "still"],
    [/slow|gentle|subtle|soft|gradual|creep|crawl/i, "slow"],
    [/medium|moderate|steady|walk/i, "medium"],
    [/fast|quick|rapid|burst|snap|whip|smash|slam|pop|punch|crash|flash|strike/i, "fast"],
    [/rhythm|beat|pulse|sync|tempo|staccato/i, "rhythmic"],
    [/time.?lapse|hyper.?lapse|speed.*ramp/i, "fast"],
    [/slow.?mo|phantom|1000fps/i, "slow"],
    [/stop.?motion/i, "rhythmic"],
  ],
  distance: [
    [/extreme.*close|macro|texture fill|tight on/i, "extreme-close"],
    [/close.?up|detail|tight|micro/i, "close"],
    [/medium shot|mid.?shot|waist|two.?shot/i, "medium"],
    [/wide|full.*room|establishing|venue|property|architecture/i, "wide"],
    [/aerial|drone|overhead|bird|fly.?over|top.?down/i, "aerial"],
    [/overhead|flat.?lay|90°|top.?down/i, "overhead"],
    [/eye.?level|eye.?line|tabletop.?level/i, "medium"],
  ],
  sense: [
    [/sizzle|crunch|crack|snap|pop|clink|fizz|bubble|pour.*sound|asmr|foley|audio|sound|music|beat|rhythm|silence/i, "auditory"],
    [/texture|rough|smooth|crispy|soft|felt|leather|wood|marble|stone|metal|glass|fabric|linen/i, "tactile"],
    [/thermal|heat|cold|ice|frost|steam|fire|flame|hot|warm|cool|freeze|melt|temperature/i, "thermal"],
    [/motion|movement|spin|rotate|orbit|slide|pan|tilt|dolly|track|follow|whip|swing|flip|toss|pour|drizzle|cascade/i, "kinetic"],
    [/color|light|glow|shadow|neon|golden|bright|dark|silhouette|reflection|bokeh|flare/i, "visual"],
    [/smoke|steam|aroma|scent|fragrant/i, "olfactory-implied"],
  ],
  technique: [
    [/handheld|documentary/i, "handheld"],
    [/gimbal|steadicam|stabiliz/i, "stabilized"],
    [/locked|static|tripod/i, "locked"],
    [/slider|lateral|dolly/i, "slider"],
    [/drone|aerial|fly/i, "drone"],
    [/turntable|rotate.*product|product.*spin/i, "turntable"],
    [/practical|in.?camera|real/i, "practical"],
    [/ai|digital|neural|generative|3d|point cloud|photogrammetry/i, "digital"],
    [/360|immersive|vr|spatial/i, "immersive"],
    [/thermal|infrared|uv|spectral/i, "specialty"],
    [/multi.?cam|dual.?cam|synced/i, "multicam"],
  ],
  role: [
    [/reveal|entrance|establish|approach|arrive|open|first/i, "opener"],
    [/transition|wipe|cut|dissolve|morph|match/i, "transition"],
    [/build|rise|ascend|crescendo|layer|stack|assembly/i, "buildup"],
    [/hero|money shot|beauty shot|glory|best|perfect|present/i, "payoff"],
    [/texture|detail|macro|close|grain|surface|pattern/i, "texture"],
    [/break|pause|breath|silence|contrast|negative space/i, "rhythm-break"],
    [/logo|end|final|closing|cta|brand.*mark/i, "closer"],
    [/loop|standalone|isolated|single/i, "standalone"],
    [/bts|behind|setup|process|how.*made/i, "behind-scenes"],
    [/interactive|poll|swipe|quiz|challenge|tag|save|comment/i, "engagement"],
  ],
};

// Auto-tag a style name
function autoTag(name) {
  const tags = {};
  for (const [dimension, rules] of Object.entries(tagRules)) {
    const matches = new Set();
    for (const [pattern, tag] of rules) {
      if (pattern.test(name)) matches.add(tag);
    }
    if (matches.size > 0) tags[dimension] = [...matches];
  }
  // Defaults for missing dimensions
  if (!tags.energy) tags.energy = ["medium"];
  if (!tags.distance) tags.distance = ["medium"];
  if (!tags.sense) tags.sense = ["visual"];
  return tags;
}

// Read styles from App.jsx
const fs = require("fs");
const src = fs.readFileSync(__dirname + "/../src/App.jsx", "utf8");
const styleRegex = /\[(\d+),"([^"]+)","([^"]*)"\]/g;
const styles = [];
let match;
while ((match = styleRegex.exec(src)) !== null) {
  styles.push({ id: parseInt(match[1]), name: match[2], outlets: match[3] });
}

// Tag all styles
const tagged = styles.map(s => ({ ...s, tags: autoTag(s.name) }));

// Stats
const dimCoverage = {};
for (const dim of Object.keys(tagRules)) {
  const covered = tagged.filter(s => s.tags[dim] && s.tags[dim].length > 0 && !(s.tags[dim].length === 1 && ["medium", "visual"].includes(s.tags[dim][0]))).length;
  dimCoverage[dim] = `${covered}/${tagged.length} (${Math.round(covered/tagged.length*100)}%)`;
}

console.log(`\n=== AUTO-TAGGER RESULTS ===`);
console.log(`Total styles: ${tagged.length}`);
console.log(`\nDimension coverage (non-default):`);
for (const [dim, cov] of Object.entries(dimCoverage)) {
  console.log(`  ${dim}: ${cov}`);
}

// Show some examples
console.log(`\n=== SAMPLE TAGS ===`);
const samples = [1, 23, 107, 151, 203, 301, 431, 501, 551, 601, 735, 851, 951, 1001, 1041, 1066, 1091, 1111, 1136, 1166];
for (const id of samples) {
  const s = tagged.find(t => t.id === id);
  if (s) {
    const tagStr = Object.entries(s.tags).map(([k, v]) => `${k}:[${v.join(",")}]`).join(" ");
    console.log(`  #${s.id} "${s.name}"\n    ${tagStr}`);
  }
}

// Find styles with fewest tags (potential gaps)
const byTagCount = tagged.map(s => ({
  id: s.id, name: s.name,
  count: Object.values(s.tags).flat().filter(t => !["medium", "visual"].includes(t)).length
})).sort((a, b) => a.count - b.count);

console.log(`\n=== LOWEST TAG COVERAGE (potential gaps) ===`);
for (const s of byTagCount.slice(0, 10)) {
  console.log(`  #${s.id} "${s.name}" — ${s.count} meaningful tags`);
}

// Output full tagged data as JSON
fs.writeFileSync(__dirname + "/tagged-styles.json", JSON.stringify(tagged, null, 2));
console.log(`\nFull tagged data written to scripts/tagged-styles.json`);
