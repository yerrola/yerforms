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

    // flatten all cells in the row into a single content stream
    [...row.children].forEach((cell) => {
      while (cell.firstChild) content.append(cell.firstChild);
    });

    // promote the first heading to the summary title
    const heading = content.querySelector(':scope > :is(h1,h2,h3,h4,h5,h6)');
    if (heading) {
      moveInstrumentation(heading, summary);
      summary.textContent = heading.textContent.trim();
      heading.remove();
    }

    details.append(summary, content);
    row.replaceWith(details);
  });
}
