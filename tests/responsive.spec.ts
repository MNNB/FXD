import { test, expect } from '@playwright/test';

const devices = [
  { name: 'iPhone 13', viewport: { width: 390, height: 844 } },
  { name: 'iPad Air', viewport: { width: 820, height: 1180 } },
  { name: 'Desktop', viewport: { width: 1920, height: 1080 } },
];

devices.forEach(({ name, viewport }) => {
  test(`Responsive test on ${name}`, async ({ page }) => {
    await page.setViewportSize(viewport);
    await page.goto('http://localhost:3000/');

    // Hero Image
    const heroImage = await page.$('.hero-image');
    expect(heroImage).toBeTruthy();

    // Navigation Menu
    const navigationMenu = await page.$('nav');
    expect(navigationMenu).toBeTruthy();

    // Contact Form
    const contactForm = await page.$('form');
    expect(contactForm).toBeTruthy();
  });
});