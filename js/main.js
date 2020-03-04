const $main = $("#content");
const $nav = $(".nav-bar");

function getTemplate(name) {
  return $("#" + name)[0].innerHTML;
}

function renderTemplate(templateString, variables) {
  let renderedTemplate = templateString;

  if (typeof variables === "object") {
    Object.entries(variables).forEach(([variableName, value]) => {
      const key = String(variableName).toUpperCase();
      renderedTemplate = renderedTemplate.replace(key, value);
    });
  }

  return renderedTemplate;
}

function renderContent(newContent) {
  $main.html(newContent);
}

function renderCurrencyCard(page) {
  if (page.isLoading) {
    return `<div class="loading_img col-lg-12"><img src="/assets/svg-charts-loading-gif-6.gif" alt="loader fail"></div>`;
  }

  if (!page.currencies) {
    return "Nothing";
  }

  const template = getTemplate("currency-card");
  const list = Array.from(page.currencies).map(currency => {
    return renderTemplate(template, {
      title: currency["symbol"],
      short: currency["id"],
      more: "Learn more",
      id: currency["id"]
    });
  });

  return `<div class="grid-list">${list.join("")}</div>`;
}

// #region "Pages"
function renderLiveReportsPage() {
  return $("#live-reports")[0].innerHTML;
}

function renderAboutPage() {
  return $("#about")[0].innerHTML;
}
// #endregion

async function renderPage(page) {
  switch (page) {
    case "home":
      return Pages.renderHome(renderContent);
      break;
    case "reports":
      return renderLiveReportsPage();
      break;
    case "about":
      return renderAboutPage();
      break;
    default:
      return "404";
  }
}
async function main() {
  $("#slideout").click(() => {
    $nav.toggleClass("is-open");
  });

  const homePage = await renderPage("home");
  $main.html(homePage);
}

main();
