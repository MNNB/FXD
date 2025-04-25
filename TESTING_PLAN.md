# Responsive/Fluid Layout Testing Plan

This plan outlines the steps for thoroughly testing the responsive/fluid layout of the website across different devices and viewport sizes.

## Devices and Viewports

* iPhone 13 (390x844)
* iPad Air (820x1180)
* Standard Desktop (1920x1080)

## Test Steps

1. **Choose Device/Viewport:** Select one of the specified devices or viewports.
2. **Open Website:** Open the website on the chosen device/viewport.
3. **Check Hero Image:** Verify the size, position, and quality of the hero image.
4. **Check Navigation Menu:** Ensure the navigation menu is accessible and functional.
5. **Check Contact Form:** Check the alignment and usability of the contact form.
6. **Check Content Reflow:** Verify that the content reflows and adapts appropriately to the screen size.
7. **Check Image Scaling:** Ensure images scale correctly and maintain their proportions without distortion.
8. **Check for Overlapping/Truncated Elements:** Ensure no elements overlap or become truncated, causing visual or functional issues.
9. **Document Discrepancies:** If any discrepancies are found, document the device/viewport size, a description of the issue, and a screenshot.


```mermaid
graph LR
    A[Start] --> B{Choose Device/Viewport: iPhone 13 (390x844), iPad Air (820x1180), Desktop (1920x1080)};
    B --> C[Open Website];
    C --> D{Check Hero Image: Size, Position, Quality};
    D --> E{Check Navigation Menu: Accessibility, Functionality};
    E --> F{Check Contact Form: Alignment, Usability};
    F --> G{Check Content Reflow: Adaptability to different screen sizes};
    G --> H{Check Image Scaling: Correct proportions, no distortion};
    H --> I{Check for Overlapping/Truncated Elements: Ensure no visual or functional issues};
    I --> J{Document Discrepancies: Device/Viewport, Description, Screenshot};
    J --> M[End];