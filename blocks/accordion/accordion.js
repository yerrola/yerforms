import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  [...block.children].forEach((row, index) => {
    const details = document.createElement('details');
    if (index === 0) details.open = true;
    moveInstrumentation(row, details);

    const summary = document.createElement('summary');
    summary.className = 'accordion-item-title';

    const content = document.createElement('div');
    content.className = 'accordion-item-content';

    // First cell → heading label; remaining cells → panel body
    const [headingCell, ...contentCells] = [...row.children];
    const headingEl = headingCell?.querySelector(':is(h1,h2,h3,h4,h5,h6)');
    if (headingEl) {
      moveInstrumentation(headingEl, summary);
      summary.textContent = headingEl.textContent.trim();
    } else {
      summary.textContent = headingCell?.textContent?.trim() ?? '';
    }

    contentCells.forEach((cell) => {
      while (cell.firstChild) content.append(cell.firstChild);
    });

    details.append(summary, content);
    row.replaceWith(details);
  });
}
