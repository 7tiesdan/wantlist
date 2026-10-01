const grid = document.querySelector("#grid");
const template = document.querySelector("#record-template");
const releases = window.WANTLIST ?? [];

document.querySelector("#total").textContent = releases.length;

for (const [index, release] of releases.entries()) {
  const card = template.content.cloneNode(true);
  const article = card.querySelector(".record-card");
  const link = card.querySelector(".cover-link");
  const image = card.querySelector(".cover");

  link.href = release.discogsUrl;
  link.setAttribute("aria-label", `View ${release.Title} by ${release.Artist} on Discogs`);
  image.src = release.cover || release.thumb;
  image.alt = `${release.Title} by ${release.Artist} cover`;
  image.addEventListener("error", () => article.classList.add("no-cover"), { once: true });
  if (!image.src) article.classList.add("no-cover");

  card.querySelector(".fallback-label").textContent = release.Artist;
  card.querySelector(".release-no").textContent = String(index + 1).padStart(2, "0");
  card.querySelector(".artist").textContent = release.Artist;
  card.querySelector(".title").textContent = release.Title;
  card.querySelector(".year").textContent = release.Released || "—";
  card.querySelector(".format").textContent = release.Format || "Release";
  card.querySelector(".label").textContent = [release.Label, release["Catalog#"]].filter(Boolean).join(" · ");
  const median = card.querySelector(".median");
  median.href = release.marketplaceUrl;
  median.setAttribute("aria-label", `Median value ${release.median} — shop ${release.Title} on Discogs`);
  median.querySelector("strong").textContent = release.median;
  grid.append(card);
}
