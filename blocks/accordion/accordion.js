import { moveInstrumentation } from '../../scripts/scripts.js';

export default function decorate(block) {
  [...block.children].forEach((row, index) => {
    const [titleDiv, contentDiv] = [...row.children];

    const details = document.createElement('details');
    if (index === 0) details.open = true;
    moveInstrumentation(row, details);

    const summary = document.createElement('summary');
    summary.className = 'accordion-item-title';
    if (titleDiv) {
      moveInstrumentation(titleDiv, summary);
      summary.textContent = titleDiv.textContent.trim();
    }

    const content = document.createElement('div');
    content.className = 'accordion-item-content';
    if (contentDiv) {
      moveInstrumentation(contentDiv, content);
      while (contentDiv.firstChild) content.append(contentDiv.firstChild);
    }

    details.append(summary, content);
    row.replaceWith(details);
  });
}
