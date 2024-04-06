function copyCss(className) {
  const elements = document.querySelectorAll(className);
  const previousHTML = elements[0].innerHTML;
  elements.forEach((element) => {
    element.classList.add("copied");
  });

  const styleSheets = document.styleSheets;

  let cssText = "";

  for (let i = 0; i < styleSheets.length; i++) {
    const rules = styleSheets[i].cssRules;
    if (rules) {
      // Loop through each CSS rule
      for (let j = 0; j < rules.length; j++) {
        // Check if the rule is for the specified class
        if (
          rules[j].selectorText &&
          rules[j].selectorText.includes(className)
        ) {
          cssText += rules[j].cssText + "\n";
        }
      }
    }
  }

  //place text in the center if <a> tag is used, additional rule for better performance
  cssText += `
        div.anchor-tag-btn {
            display: flex;
            justify-content: center;
            align-items: center;
        }
    `;

  copyToClipboard(cssText);
  elements.forEach((element) => {
    element.innerHTML = "COPIED!";
    element.style.color = "#1E90FF";
    element.style.fontWeight = "700";
    element.style.letterSpacing = "2px";
  });

  setTimeout(() => {
    elements.forEach((element) => {
      element.innerHTML = previousHTML;
      element.classList.remove("copied");
    });
  }, 500);
}

function copyToClipboard(text) {
  const el = document.createElement("textarea");
  el.value = text;
  document.body.appendChild(el);
  el.select();
  document.execCommand("copy");
  document.body.removeChild(el);
}
