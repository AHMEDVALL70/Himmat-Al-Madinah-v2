# Project TODO

- [x] Build the navy-and-gold valuation platform shell with Arabic RTL and English LTR support
- [x] Preserve the existing six-step valuation flow and collect property, consent, and financing inputs
- [x] Add server-side validation and sanitization for all valuation submissions
- [x] Add valuation request, property attributes, results, and comparable-sale tables to the database
- [x] Implement a transparent rules/comparables valuation engine with an ML replacement interface
- [x] Add a public tRPC valuation submission procedure returning reference, range, confidence, and factors
- [x] Connect the six-step frontend to the server-side valuation procedure
- [x] Display valuation results beside the mortgage calculator with the indicative-estimate disclaimer
- [x] Add loading, validation, empty, and error states for valuation submissions
- [x] Write Vitest coverage for validation, valuation calculations, and valuation persistence seam (live DB integration remains environment-dependent)
- [x] Run type checking, tests, and browser visual verification
- [x] Save a final project checkpoint after all completed items are marked [x]

- [x] Add a shared server-side sanitization layer for all customer, property, consent, and financing fields before calculation and persistence
- [x] Refactor the valuation engine behind a strategy interface and separate true comparable-sale inputs from derived result rows
- [x] Add explicit empty-result UI and detailed server-validation feedback for valuation submissions

- [x] Add structured tRPC/Zod validation error handling with field-specific messages in the six-step form
- [x] Show a validation summary near the submit step for server-side failures

- [x] Add and verify a tRPC error formatter that exposes stable Zod field errors
- [x] Add a test asserting invalid valuation input produces field-level errors
- [x] Browser-test invalid submission and confirm the validation summary renders

- [x] Browser-test an intentionally invalid valuation submission that reaches the server and verify the field summary
- [x] Add an integration assertion for a server-side validation failure reaching the client error shape

- [x] Fix responsive overflow in the admin comparables grid and verify mobile/desktop layout

# Comparables Management Roadmap

- [x] Add a comparable-sales table with location, property type, area, age, condition, sale price, sale date, and source label
- [x] Add admin-only procedures to list and create comparable sales with server-side validation
- [x] Update valuation calculations to use matching comparable sales when available
- [x] Add an Arabic/English admin screen for entering and reviewing comparable sales
- [x] Add tests for comparable validation, admin authorization, and comparable-based valuation
- [x] Run final checks and save a new checkpoint for the comparables update

# UX, Mobile, Image, and Contract Improvements

- [ ] Preserve the original nine-page residential and commercial PDF artwork, colors, and page dimensions while replacing mapped field values in the project generators
- [ ] Add complete whiteout and coordinate calibration coverage for every populated contract field, backed by generated-PDF comparison evidence
- [ ] Verify generated residential and commercial PDFs visually on desktop and mobile-sized previews, confirming no sample data or watermarks remain
- [x] Replace native image file controls with an Arabic drag-and-drop upload zone
- [x] Add client-side image previews, removal, ordering, compression, and file/type/size validation
- [x] Add secure server-side image upload metadata and optional vision-analysis seam without claiming unsupported facts
- [x] Make valuation output visually prominent and keep the indicative-estimate disclaimer visible
- [x] Add or refine mortgage amount/percentage slider and mobile layout
- [x] Add clear Excel upload template guidance for bulk property data
- [x] Expand FAQ answers, improve CTA copy, and add SEO metadata and image alt text
- [x] Run responsive browser checks and final regression tests

- [x] Add the styled Arabic drag-and-drop upload zone and local image preview/removal interaction
- [x] Add client-side compression, ordering, and complete file validation before submission
- [x] Connect selected images to server-side storage metadata; optional vision analysis remains a separate model integration

- [x] Make the server result point estimate visually prominent with a clear indicative disclaimer
- [x] Add concise Arabic/English FAQ answers with accessible disclosure controls
- [x] Improve page title, description, language, and direction metadata for SEO

- [x] Show user-facing image upload errors for unsupported, oversized, duplicate, and over-limit files
- [x] Handle image decode/compression failures without breaking the valuation flow
- [x] Add tests or browser verification for invalid image uploads, ordering, and compression failures (validation helper coverage and mobile regression verified)

- [x] Detect duplicate files within the same newly selected upload batch
- [x] Handle per-file compression failures so valid images in the same batch remain available
- [x] Verify invalid type, oversized, duplicate, over-limit, ordering, and compression-failure paths (validation helper coverage added; browser upload interaction remains manual)

- [x] Use name, size, and lastModified together for stronger duplicate image detection
- [x] Add verification coverage for invalid, duplicate, oversized, over-limit, ordering, and compression-failure paths

- [x] Add automated tests for uploader duplicate, over-limit, ordering, and per-file compression-failure behavior (shared validation tests plus browser verification)
- [x] Browser-test invalid image uploads for unsupported type, oversized, duplicate, and over-limit files
- [x] Browser-test image reordering and simulated compression/decode failure

- [x] Add pure automated coverage for uploader selection, duplicate/limit errors, ordering, and per-file failure behavior
- [x] Browser-test an oversized image and record its visible error message

- [x] Add an automated test for per-file image compression failure while preserving valid files in the same batch


# Temporary review release

- [x] Produce a review checkpoint that includes the current valuation, mortgage, image-upload, vision-seam, and server-side contract generator work
- [ ] Keep final contract artwork/whiteout/coordinate calibration pending until the user supplies clean residential and commercial PDF templates


# Mobile navigation fix

- [x] Fix the mobile navigation menu so the menu trigger, open state, close state, and navigation links are visible and usable in RTL/LTR layouts
- [x] Verify the mobile navigation at phone and desktop breakpoints and run regression checks


# Mobile navigation interaction verification

- [x] Verify the mobile navigation at the 375×812 responsive phone layout plus controlled preview interaction: hamburger visibility, open/close, and Arabic/English switch
- [x] Add a focused regression test for mobile menu state transitions and accessibility attributes


# ZIP delivery

- [x] Create a GitHub-ready ZIP archive of the updated project, excluding generated dependencies, build output, logs, and local secrets
- [x] Verify the archive contains the updated source and can be extracted successfully


# GitHub repository sync

- [ ] Review the confirmed GitHub repository structure and identify misplaced or duplicate upload folders
- [ ] Upload the verified updated project files to the confirmed repository without committing local secrets or generated dependencies
- [ ] Verify the repository tree and GitHub Pages path after the update
