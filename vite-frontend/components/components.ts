export function createCard(title, content) {
    // Get the template
    const template = document.getElementById('card-template');

    // Clone the template content
    const cardClone = document.importNode((template as HTMLTemplateElement)?.content, true);

    // Modify the cloned content
    const cardTitle = cardClone.querySelector('.card-title');
    if (cardTitle) {
        cardTitle.textContent = title;
    }
    const cardContent = cardClone.querySelector('.card-content');
    if (cardContent) {
        cardContent.textContent = content;
    }

    // Return the modified clone
    return cardClone;
}

// Function to add the card to a specific container
export function addCardToContainer(title, content, containerId) {
    const container = document.getElementById(containerId);
    const card = createCard(title, content);
    container?.appendChild(card);
}
