// Reading Progress Bar
window.onscroll = function() { updateProgressBar() };

function updateProgressBar() {
  const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
  const scrolled = (winScroll / height) * 100;
  document.getElementById("myBar").style.width = scrolled + "%";
}

// Add Copy Buttons to Code Blocks
document.addEventListener("DOMContentLoaded", () => {
  const codeWrappers = document.querySelectorAll('.code-wrapper');

  codeWrappers.forEach((wrapper) => {
    // Create copy button
    const copyBtn = document.createElement('button');
    copyBtn.className = 'copy-btn';
    copyBtn.innerText = 'Copy';
    
    // Add click event for copying
    copyBtn.addEventListener('click', () => {
      const codeElement = wrapper.querySelector('code');
      const textToCopy = codeElement.innerText;
      
      navigator.clipboard.writeText(textToCopy).then(() => {
        copyBtn.innerText = 'Copied!';
        copyBtn.style.backgroundColor = '#4caf50';
        copyBtn.style.color = '#fff';
        copyBtn.style.borderColor = '#4caf50';
        
        setTimeout(() => {
          copyBtn.innerText = 'Copy';
          copyBtn.style.backgroundColor = 'transparent';
          copyBtn.style.color = '#888';
          copyBtn.style.borderColor = '#555';
        }, 2000);
      }).catch(err => {
        console.error('Failed to copy: ', err);
      });
    });

    wrapper.appendChild(copyBtn);
  });
});
