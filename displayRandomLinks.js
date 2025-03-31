let cycleInterval;
const totalIterations = 200;
const delayBetweenChanges = 10000; // 10 seconds in milliseconds
const allLinks = Array.from(document.getElementsByTagName('a'));
const validLinks = allLinks.filter(link => 
      link.href && !link.href.startsWith('javascript:')
);
const duplicateArray = [...validLinks];

document.addEventListener('DOMContentLoaded', function() {
  startShow();
});

function displayRandomLink() {
    displayDiv = document.getElementById('showPlace');

    if (validLinks.length === 0) {
      validLinks = [...duplicateArray];
    }

    // Get random index and remove the link from array
    const randomIndex = Math.floor(Math.random() * validLinks.length);
    const randomLink = validLinks[randomIndex];
    validLinks.splice(randomIndex, 1);
    displayDiv.innerHTML = `<a href="${randomLink.href}">${randomLink.textContent || randomLink.href}</a>`;
}

  function startShow() {
    iterationCount = 0;
    cycleInterval = setInterval(() => {
      displayRandomLink();
      iterationCount++;
    }, delayBetweenChanges);
  }

  function stopLinkCycle() {
    clearInterval(cycleInterval);
  }
