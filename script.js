const wordElement = document.querySelector(".advent");
const elementsInsideWord = document.querySelectorAll(".word *");
wordElement.addEventListener("click", () => {
  elementsInsideWord.forEach((element) => {
    element.style.transition = "opacity 1s ease-in-out";
    element.style.opacity = "0";
  });

  setTimeout(() => {
    const giftElement = document.querySelector(".gift");
    giftElement.style.transform = "translateY(-50%)";
    giftElement.style.transition = "top 3s ease-in-out";
    giftElement.style.top = "50%";
  }, 1000);
});

const giftElement = document.querySelector(".gift");
giftElement.addEventListener("click", () => {
  const giftElementLeft = document.querySelector(".gift-left");
  const giftElementRight = document.querySelector(".gift-right");
  giftElement.style.display = "none";
  giftElementLeft.style.display = "block";
  giftElementRight.style.display = "block";

  const advent = document.querySelector(".advent");
  const postvent = document.querySelector(".postvent");
  advent.style.display = "none";
  postvent.style.display = "block";

  anime({
    targets: giftElementLeft,
    translateX: ["-100%", "-180%"],
    duration: 1000,
    easing: "easeInOutQuad",
  });

  anime({
    targets: giftElementRight,
    translateX: ["100%", "180%"],
    duration: 1000,
    easing: "easeInOutQuad",
  });

  elementsInsideWord.forEach((element) => {
    element.style.transition = "opacity 1s ease-in-out";
    element.style.opacity = "1";
  });
});

const postvent = document.querySelector(".postvent");
const essay = document.querySelector(".essay");
postvent.addEventListener("click", () => {
  const giftElementLeft = document.querySelector(".gift-left");
  const giftElementRight = document.querySelector(".gift-right");
  anime({
    targets: giftElementLeft,
    translateX: ["-180%", "-200%"],
    translateY: ["0%", "300%"],
    rotate: "-90deg",
    duration: 2000,
    easing: "easeInOutQuad",
  });

  anime({
    targets: giftElementRight,
    translateX: ["180%", "200%"],
    translateY: ["0%", "300%"],
    rotate: "90deg",
    duration: 2000,
    easing: "easeInOutQuad",
  });

  anime({
    targets: postvent,
    opacity: 0,
    duration: 2000,
    easing: "easeInOutQuad",
    complete: () => {
      postvent.style.display = "none";
      essay.style.display = "block";
      anime({
        targets: essay,
        opacity: 1,
        duration: 2000,
        easing: "easeInOutQuad",
        complete: () => {
          essay.addEventListener("click", () => {
            anime({
              targets: essay,
              height: ["90vh"],
              width: ["50vw"],
              duration: 2000,
              easing: "easeInOutQuad",
            });
            essay.classList.add("events");
            essay.style.display = "grid";
            essay.style.gridTemplateColumns = "1fr 1fr";
            essay.style.gridTemplateRows = "1fr 2fr 2fr";
            essay.style.justifyItems = "center";
            essay.style.alignItems = "center";
            let horsemen = document.querySelectorAll(".horsemen");
            horsemen.forEach((element, index) => {
              element.style.display = "flex";
              element.style.backgroundImage = `url(${horsemenBG[index]})`;

              // Add an event listener to the .horsemen element
              element.addEventListener("click", () => {
                // Save the current content of the .essay element
                const currentContent = essay.innerHTML;

                // Change the content of the .essay element
                essay.style.position = "relative";
                essay.innerHTML = templates[index];

                // Fetch the text file and insert its content into the <p> tag
                fetch(`./texts/${index + 1}.txt`)
                .then(response => response.text())
                .then(data => {
                    let content = document.querySelector(`#content${index + 1}`);
                    content.textContent = data;

                    // Set the position, top, left, right, and bottom properties to center the content
                    content.style.position = 'absolute';
                    content.style.top = '50%';
                    content.style.left = '50%';
                    content.style.transform = 'translate(-50%, -50%)';

                    const button = document.querySelector(`#imageButton${index + 1}`);
                    button.style.position = 'absolute';
                    button.style.bottom = '0';
                    button.style.left = '50%';
                    button.style.transform = 'translateX(-50%)';
                    button.style.color = 'white';
                    button.style.background = 'none';
                    button.style.margin = '20px';
                    button.style.cursor = 'cell';
                    
                    document.querySelector(`#imageButton${index + 1}`).addEventListener('click', (event) => {
                        // Stop the propagation of the event
                        event.stopPropagation();
                    
                        // Create the overlay element
                        const overlay = document.createElement('div');
                        overlay.id = 'overlay';
                        overlay.style.position = 'fixed';
                        overlay.style.top = '0';
                        overlay.style.left = '0';
                        overlay.style.width = '100%';
                        overlay.style.height = '100%';
                        overlay.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
                        overlay.style.zIndex = '999';
                    
                        // Append the overlay element to the body
                        document.body.appendChild(overlay);
                    
                        // Create the image element
                        const img = document.createElement('img');
                        img.id = `image${index + 1}`;
                        img.className = 'content-image';
                        img.src = images[index]; // replace with the actual path to your image
                        img.style.position = 'absolute';
                        img.style.top = '50%';
                        img.style.left = '50%';
                        img.style.transform = 'translate(-50%, -50%)';
                        img.style.zIndex = '1000';
                        img.style.height = '70%';
                        img.style.border = '2px solid white';
                    
                        // Append the image element to the body
                        document.body.appendChild(img);
                    });
                    
                    document.addEventListener('click', (event) => {
                        if (!event.target.classList.contains('content-image')) {
                          // Remove all content images
                          document.querySelectorAll('.content-image').forEach(image => {
                            image.remove();
                          });
                    
                          // Remove the overlay
                          const overlay = document.querySelector('#overlay');
                          if (overlay) {
                            overlay.remove();
                          }
                        }
                    });
                });

                // Add an event listener to the back button
                document
                  .querySelector("#backButton")
                  .addEventListener("click", () => {
                    // Restore the previous content of the .essay element
                    essay.innerHTML = currentContent;

                    // Reapply the styles and event listeners to the .horsemen elements
                    horsemen.forEach((element, index) => {
                      element.style.display = "flex";
                      element.style.backgroundImage = `url(${horsemenBG[index]})`;
                    });
                  });
              });
            });
            let content = document.querySelectorAll(".content");
            content.forEach((element) => {
              element.style.display = "flex";
            });
          });
        },
      });
    },
  });
});

horsemenBG = [
  "./assets/food-bg.jpg",
  "./assets/party-1.jpg",
  "./assets/fireworks.png",
  "./assets/mitza.jpg",
];

images = ['./assets/food-2.png', './assets/party-3.png', './assets/blur.jpg', './assets/mitza.jpg'];

let templates = [
  `<p id="content1" class="content"></p>
    <button id="imageButton1" class="image-button">Show Image</button>
    <button id="backButton" style="position: absolute; top: 0; left: 0; color: white; background: none; margin: 20px; cursor: cell;">&#8592;</button>
    <div class="circle"></div>`,

  `<p id="content2" class="content"></p>
    <button id="imageButton2" class="image-button">Show Image</button>
     <button id="backButton" style="position: absolute; top: 0; left: 0; color: white; background: none; margin: 20px; cursor: cell;">&#8592;</button>
     <div class="circle"></div>`,

  `<p id="content3" class="content"></p>
  <button id="imageButton3" class="image-button">Show Image</button>
     <button id="backButton" style="position: absolute; top: 0; left: 0; color: white; background: none; margin: 20px; cursor: cell;">&#8592;</button>
     <div class="circle"></div>`,

  `<p id="content4" class="content"></p>
  <button id="imageButton4" class="image-button">Show Image</button>
     <button id="backButton" style="position: absolute; top: 0; left: 0; color: white; background: none; margin: 20px; cursor: cell;">&#8592;</button>
     <div class="circle"></div>`,
];

const circle = document.querySelector(".circle");
circle.style.pointerEvents = "none";

document.addEventListener("mousemove", (event) => {
    
    circle.style.left = event.clientX + "px";
    circle.style.top = event.clientY + "px";
    circle.style.display = "block";
  });
