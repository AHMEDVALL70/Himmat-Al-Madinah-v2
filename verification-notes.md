
## Invalid submission browser test
An intentionally invalid email (`invalid-email`) was entered at step 5 and submitted. The UI remained on the contact step and displayed the structured validation summary: `راجع البيانات التالية: البريد الإلكتروني: Invalid email`. This confirms the tRPC formatter and client field-error summary are connected end to end.
