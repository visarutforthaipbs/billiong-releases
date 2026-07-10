# BillNgai Pro Sales Log — Google Sheets Template

This document provides a copy-pasteable template and configuration instructions for your Google Sheets customer database. 

Since BillNgai uses offline key verification, **this spreadsheet serves as your single source of truth for customer support, key retrieval, and financial logging.**

---

## 1. Quick Import (CSV Template)

You can copy the CSV block below, save it as a `.csv` file, and import it into Google Sheets (**File > Import > Upload**), or simply copy and paste it directly into cell `A1` of a new sheet.

```csv
Date,Email,LINE Name,Product,Amount Paid (THB),License Key,Key Prefix,Status,Notes
2026-07-09,buyer@example.com,Somchai,Pro (Early Bird),590.00,KEY_1234567890ABCDEF...,=LEFT(F2\, 12),Completed,First buyer
```

---

## 2. Google Sheets Structure & Columns

Here is how you should structure the columns. Setting up formatting and data validation makes manual entry fast and error-free:

| Column | Header | Type / Format | Google Sheets Formulas & Settings |
|---|---|---|---|
| **A** | **Date** | Date (`YYYY-MM-DD`) | Double-click to show calendar picker. |
| **B** | **Email** | Text (Email format) | Used for searching when a user loses their key. |
| **C** | **LINE Name** | Text | Customer's LINE profile display name. |
| **D** | **Product** | Dropdown | **Data Validation**: List of items: `Pro (Early Bird)`, `Pro (Full)`, `Local` |
| **E** | **Amount Paid (THB)** | Currency (`฿#,##0`) | Format as Thai Baht. |
| **F** | **License Key** | Text | The full Ed25519 license key. |
| **G** | **Key Prefix** | Text | Formula: `=IF(F2<>"", LEFT(F2, 12), "")` (helps you lookup keys safely without displaying the full key) |
| **H** | **Status** | Dropdown | **Data Validation**: List of items: `Completed` (Green), `Refunded` (Red), `Pending Verification` (Yellow) |
| **I** | **Notes** | Text | Any custom notes (e.g., "refund requested", "upgrade from local"). |

---

## 3. Automated Dashboard / Summary Metrics

In a **second sheet tab** (name it `Dashboard`), you can create a summary panel using these formulas:

### KPI Summary Cards

* **Total Pro Sales (Count):**
  ```excel
  =COUNTA('Sales Log'!B2:B)
  ```
* **Total Revenue (THB):**
  ```excel
  =SUM('Sales Log'!E2:E)
  ```
* **Total Refunds (THB):**
  ```excel
  =SUMIF('Sales Log'!H2:H, "Refunded", 'Sales Log'!E2:E)
  ```
* **Net Revenue (THB):**
  ```excel
  =SUMIF('Sales Log'!H2:H, "Completed", 'Sales Log'!E2:E)
  ```

---

## 4. Google Sheets Setup Best Practices

1. **Format Date Picker:** Select Column A, go to **Format > Number > Custom date and time**, and choose `YYYY-MM-DD`.
2. **Conditional Formatting for Status:**
   * Select Column H (Status).
   * Go to **Format > Conditional formatting**.
   * Add rules:
     * If text is `Completed` $\rightarrow$ Background color **Soft Green**.
     * If text is `Refunded` $\rightarrow$ Background color **Soft Red**.
     * If text is `Pending Verification` $\rightarrow$ Background color **Soft Yellow**.
3. **Freeze Header Row:** Go to **View > Freeze > 1 row** so headings remain visible when scrolling.
4. **Enable Search Shortcut:** Press `Cmd + F` (Mac) or `Ctrl + F` (Windows) to instantly look up a customer by **email** or **LINE name** when handling support requests.
