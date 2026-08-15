import { chromium } from "playwright";
import path from "node:path";

const browser = await chromium.launch({
  headless: true,
  executablePath: "C:/Program Files/Google/Chrome/Application/chrome.exe",
});
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await page.goto("file:///C:/Users/riman/Downloads/24263cc4e9dce154441109b119d5a8ff.mp4");
await page.waitForSelector("video");

const duration = await page.locator("video").evaluate((video) => video.duration);
const times = [0.02, 0.18, 0.36, 0.54, 0.72, 0.9].map((ratio) => duration * ratio);

for (let index = 0; index < times.length; index += 1) {
  await page.locator("video").evaluate(async (video, time) => {
    video.pause();
    video.currentTime = time;
    await new Promise((resolve) => {
      video.addEventListener("seeked", resolve, { once: true });
    });
  }, times[index]);
  await page.screenshot({
    path: path.resolve(`reference-frame-${String(index + 1).padStart(2, "0")}.png`),
    fullPage: true,
  });
}

console.log(JSON.stringify({ duration, times }));
await browser.close();
