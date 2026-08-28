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
