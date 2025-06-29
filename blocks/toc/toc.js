export default function decorate(block) {
  // Create the TOC container
  const tocContainer = document.createElement('div');
  tocContainer.className = 'toc-container';
  
  // Create the TOC title
  const tocTitle = document.createElement('h2');
  tocTitle.className = 'toc-title';
  tocTitle.textContent = 'Table of Contents';
  tocContainer.appendChild(tocTitle);
  
  // Create the TOC list
  const tocList = document.createElement('ul');
  tocList.className = 'toc-list';
  
  // Find all headings in the main content
  const mainContent = document.querySelector('main');
  if (mainContent) {
    // Get all h2 and h3 headings
    const headings = mainContent.querySelectorAll('h2, h3, h4, h5, h6');
    
    // Process each heading
    headings.forEach((heading) => {
      // Create list item
      const listItem = document.createElement('li');
      listItem.className = `toc-item toc-${heading.tagName.toLowerCase()}`;
      
      // Create link to the heading
      const link = document.createElement('a');
      link.href = `#${heading.id}`;
      link.textContent = heading.textContent.replace(/^\s*\**\s*|\s*\**\s*$/g, ''); // Remove asterisks and trim
      
      // Add click event to smooth scroll to the heading
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').substring(1);
        const targetElement = document.getElementById(targetId);
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Update URL hash without jumping
          history.pushState(null, null, `#${targetId}`);
        }
      });
      
      // Add link to list item
      listItem.appendChild(link);
      
      // Add list item to TOC list
      tocList.appendChild(listItem);
    });
  }
  
  // Add the list to the container
  tocContainer.appendChild(tocList);
  
  // Add a toggle button for mobile view
  const toggleButton = document.createElement('button');
  toggleButton.className = 'toc-toggle';
  toggleButton.innerHTML = '<span>Contents</span><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>';
  
  toggleButton.addEventListener('click', () => {
    tocContainer.classList.toggle('toc-expanded');
  });
  
  tocContainer.appendChild(toggleButton);
  
  // Add scroll spy functionality to highlight current section
  const addScrollSpy = () => {
    const tocLinks = tocList.querySelectorAll('a');
    const headingElements = Array.from(headings);
    
    const highlightCurrentSection = () => {
      // Get current scroll position with a small offset
      const scrollPosition = window.scrollY + 100;
      
      // Find the current heading
      let currentHeading = headingElements[0];
      
      for (const heading of headingElements) {
        if (heading.offsetTop <= scrollPosition) {
          currentHeading = heading;
        } else {
          break;
        }
      }
      
      // Remove active class from all links
      tocLinks.forEach(link => link.classList.remove('toc-active'));
      
      // Add active class to current link
      if (currentHeading && currentHeading.id) {
        const activeLink = tocList.querySelector(`a[href="#${currentHeading.id}"]`);
        if (activeLink) {
          activeLink.classList.add('toc-active');
        }
      }
    };
    
    // Add scroll event listener
    window.addEventListener('scroll', highlightCurrentSection);
    
    // Initial highlight
    highlightCurrentSection();
  };
  
  // Initialize scroll spy after a short delay to ensure DOM is ready
  setTimeout(addScrollSpy, 100);
  
  // Clear the original block content and append the new structure
  block.textContent = '';
  block.appendChild(tocContainer);
}
