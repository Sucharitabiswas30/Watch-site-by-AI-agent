# 07 — Watchmaker's Spotlight parallax panels

The former two editorial `.story-panel` sections are replaced by `.parallax-slider.pan-watch` in the same page position.

- Two vertically stacked, full-viewport watch panels use existing Aevum product imagery and copy.
- Each panel anchors product information at the lower left and its product-detail CTA at the lower right.
- On desktop, each cover image uses a fixed background while the panel content moves with the page, producing the upward wipe shown in the supplied Screencast reference.
- GSAP adds a restrained background-position scrub and supplies visible depth on mobile browsers where fixed backgrounds are disabled for reliability.
- The mobile layout moves the CTA into a full-width bottom action while maintaining a full-screen image crop.
