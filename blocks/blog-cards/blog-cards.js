import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * Fetches blog data from the API
 * @returns {Promise<Array>} The blog data
 */
async function fetchBlogData() {
  try {
    const response = await fetch('/blog-index.json');
    const data = await response.json();
    return data.data || [];
  } catch (error) {
    console.error('Error fetching blog data:', error);
    return [];
  }
}

/**
 * Creates a blog card element
 * @param {Object} blog The blog data
 * @returns {HTMLElement} The blog card element
 */
function createBlogCard(blog) {
  const card = document.createElement('div');
  card.className = 'blog-card';
  
  // Create card link
  const cardLink = document.createElement('a');
  cardLink.href = blog.path;
  cardLink.className = 'blog-card-link';
  
  // Create card image
  const imageContainer = document.createElement('div');
  imageContainer.className = 'blog-card-image';
  
  if (blog.image) {
    const picture = document.createElement('picture');
    const img = document.createElement('img');
    img.src = blog.image;
    img.alt = blog.title;
    img.loading = 'lazy';
    picture.appendChild(img);
    imageContainer.appendChild(picture);
  }
  
  // Create card content
  const content = document.createElement('div');
  content.className = 'blog-card-content';
  
  // Create card title
  const title = document.createElement('h3');
  title.className = 'blog-card-title';
  title.textContent = blog.title;
  
  // Create card description
  const description = document.createElement('p');
  description.className = 'blog-card-description';
  description.textContent = blog.description;
  
  // Assemble card
  content.appendChild(title);
  content.appendChild(description);
  
  cardLink.appendChild(imageContainer);
  cardLink.appendChild(content);
  
  card.appendChild(cardLink);
  
  return card;
}

/**
 * Decorates the blog cards block
 * @param {Element} block The blog cards block element
 */
export default async function decorate(block) {
  block.innerHTML = '<div class="blog-cards-container"><div class="blog-cards-grid"></div></div>';
  const grid = block.querySelector('.blog-cards-grid');
  
  // Add loading state
  const loadingElement = document.createElement('div');
  loadingElement.className = 'blog-cards-loading';
  loadingElement.textContent = 'Loading blog posts...';
  grid.appendChild(loadingElement);
  
  // Fetch blog data
  const blogs = await fetchBlogData();
  
  // Remove loading state
  grid.removeChild(loadingElement);
  
  // Create blog cards
  if (blogs.length > 0) {
    blogs.forEach((blog) => {
      const card = createBlogCard(blog);
      grid.appendChild(card);
    });
  } else {
    const noBlogs = document.createElement('div');
    noBlogs.className = 'blog-cards-empty';
    noBlogs.textContent = 'No blog posts found.';
    grid.appendChild(noBlogs);
  }
}
