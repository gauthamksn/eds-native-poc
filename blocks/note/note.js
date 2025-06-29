export default function decorate(block) {
  // Create the note container
  const noteContainer = document.createElement('div');
  noteContainer.className = 'note-container';
  
  // Process the block content
  const rows = [...block.children];
  
  if (rows.length > 0) {
    // Get the note content from the first row
    const firstRow = rows[0];
    if (firstRow && firstRow.children.length > 0) {
      const content = firstRow.children[0];
      if (content) {
        // Create note content wrapper
        const noteContent = document.createElement('div');
        noteContent.className = 'note-content';
        noteContent.innerHTML = content.innerHTML;
        
        // Add an icon before the content
        const noteIcon = document.createElement('div');
        noteIcon.className = 'note-icon';
        noteIcon.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="12"></line><line x1="12" y1="16" x2="12.01" y2="16"></line></svg>';
        
        // Add both to the container
        noteContainer.appendChild(noteIcon);
        noteContainer.appendChild(noteContent);
      }
    }
  }
  
  // Clear the original block content and append the new structure
  block.textContent = '';
  block.appendChild(noteContainer);
}
