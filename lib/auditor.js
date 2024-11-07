import lighthouse from 'lighthouse';
import lh_desktop_config from 'lighthouse/core/config/lr-desktop-config.js';
export async function getAudits(url, chrome_config) {
  lh_desktop_config.settings.skipAudits = null;
  lh_desktop_config.settings.onlyAudits = [
    'first-meaningful-paint',
    'speed-index',
    'first-cpu-idle',
    'interactive'
  ];
  const lh_audits = await lighthouse(url, chrome_config, lh_desktop_config).then(
    results => results.lhr.audits
  );
  return mapToSimpleArray(lh_audits);
}

function mapToSimpleArray(lh_audits) {
  return Object.keys(lh_audits).map(audit => ({
    id: audit,
    title: lh_audits[audit].title,
    score: lh_audits[audit].score
  }));
}
