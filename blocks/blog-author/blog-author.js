import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  // Create the author container
  const authorContainer = document.createElement('div');
  authorContainer.className = 'blog-author-container';
  
  // Process the block content
  const rows = [...block.children];
  
  if (rows.length > 0) {
    // First row contains author image
    const imageRow = rows[0];
    if (imageRow && imageRow.children.length > 0) {
      const imageContainer = document.createElement('div');
      imageContainer.className = 'blog-author-image';
      
      // Check if there's an image or picture in the first row
      const picture = imageRow.querySelector('picture');
      const img = imageRow.querySelector('img');
      
      if (picture) {
        // Use existing picture element
        imageContainer.appendChild(picture.cloneNode(true));
      } else if (img) {
        // Create optimized picture from img
        const optimizedPicture = createOptimizedPicture(img.src, img.alt, false, [{ width: '200' }]);
        imageContainer.appendChild(optimizedPicture);
      }
      
      authorContainer.appendChild(imageContainer);
    }
    
    // Second row contains author name and title
    if (rows.length > 1) {
      const infoRow = rows[1];
      if (infoRow && infoRow.children.length > 0) {
        const infoContainer = document.createElement('div');
        infoContainer.className = 'blog-author-info';
        
        // Process author name and title
        const content = infoRow.children[0];
        if (content) {
          infoContainer.innerHTML = content.innerHTML;
        }
        
        authorContainer.appendChild(infoContainer);
      }
    }
    
    // Third row contains bio
    if (rows.length > 2) {
      const bioRow = rows[2];
      if (bioRow && bioRow.children.length > 0) {
        const bioContainer = document.createElement('div');
        bioContainer.className = 'blog-author-bio';
        
        const content = bioRow.children[0];
        if (content) {
          bioContainer.innerHTML = content.innerHTML;
        }
        
        authorContainer.appendChild(bioContainer);
      }
    }
    
    // Fourth row contains social links
    if (rows.length > 3) {
      const socialRow = rows[3];
      if (socialRow && socialRow.children.length > 0) {
        const socialContainer = document.createElement('div');
        socialContainer.className = 'blog-author-social';
        
        const socialLinks = document.createElement('ul');
        
        // Process each social link
        const links = socialRow.querySelectorAll('a');
        links.forEach((link) => {
          const li = document.createElement('li');
          li.appendChild(link.cloneNode(true));
          socialLinks.appendChild(li);
        });
        
        socialContainer.appendChild(socialLinks);
        authorContainer.appendChild(socialContainer);
      }
    }
  }
  
  // Clear the original block content and append the new structure
  block.textContent = '';
  block.appendChild(authorContainer);
}
