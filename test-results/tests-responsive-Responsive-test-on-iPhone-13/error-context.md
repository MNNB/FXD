# Test info

- Name: Responsive test on iPhone 13
- Location: /home/mnnb/Documents/Repos/f-xd/tests/responsive.spec.ts:10:3

# Error details

```
Error: browserType.launch: Executable doesn't exist at /home/mnnb/.cache/ms-playwright/chromium_headless_shell-1169/chrome-linux/headless_shell
╔═════════════════════════════════════════════════════════════════════════╗
║ Looks like Playwright Test or Playwright was just installed or updated. ║
║ Please run the following command to download new browsers:              ║
║                                                                         ║
║     npx playwright install                                              ║
║                                                                         ║
║ <3 Playwright Team                                                      ║
╚═════════════════════════════════════════════════════════════════════════╝
```

# Test source

```ts
   1 | import { test, expect } from '@playwright/test';
   2 |
   3 | const devices = [
   4 |   { name: 'iPhone 13', viewport: { width: 390, height: 844 } },
   5 |   { name: 'iPad Air', viewport: { width: 820, height: 1180 } },
   6 |   { name: 'Desktop', viewport: { width: 1920, height: 1080 } },
   7 | ];
   8 |
   9 | devices.forEach(({ name, viewport }) => {
> 10 |   test(`Responsive test on ${name}`, async ({ page }) => {
     |   ^ Error: browserType.launch: Executable doesn't exist at /home/mnnb/.cache/ms-playwright/chromium_headless_shell-1169/chrome-linux/headless_shell
  11 |     await page.setViewportSize(viewport);
  12 |     await page.goto('http://localhost:3000/');
  13 |
  14 |     // Hero Image
  15 |     const heroImage = await page.$('.hero-image');
  16 |     expect(heroImage).toBeTruthy();
  17 |
  18 |     // Navigation Menu
  19 |     const navigationMenu = await page.$('nav');
  20 |     expect(navigationMenu).toBeTruthy();
  21 |
  22 |     // Contact Form
  23 |     const contactForm = await page.$('form');
  24 |     expect(contactForm).toBeTruthy();
  25 |   });
  26 | });
```