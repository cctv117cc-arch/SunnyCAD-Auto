---
name: coding-standards
description: Apply SunProject conventions when writing, editing, or reviewing HTML/CSS and JavaScript/jQuery, including expanded multiline HTML formatting.
---

# Skill: Coding Standards Reference

## Purpose
Use this skill for HTML/CSS, JavaScript/jQuery implementation to keep style consistent with this repository.

## When to Use
- Writing or editing source code.
- Writing test code or code samples.
- Reviewing code style and consistency.

## HTML/CSS Rules
- Use HTML5 doctype.
- Use UTF-8.
- Indent with 4 spaces.
- Use semantic elements appropriately.
- IDs/classes use kebab-case.
- Attribute values use double quotes.
- Explicitly set `type` for `input`.
- Remove empty attributes like `id=""` or `class=""`.
- In forms, non-submit buttons must use `type="button"`.
- Add comments for important/shared UI sections.

### HTML Formatting
- For elements with opening and closing tags, put the opening tag, content, and closing tag on separate lines, even for short text or empty elements.
- Put each nested element on its own line. Indent content and child elements by 4 spaces per nesting level; align the closing tag with its opening tag.
- Do not compact multiple elements or an entire section onto one line.
- Void elements such as `<input>`, `<img>`, `<br>`, `<meta>`, and `<link>` stay on a single line and have no closing tag.
- Preserve whitespace-sensitive content, including `<pre>`, `<textarea>`, and inline text where added line breaks would change the rendered content or spacing. Do not reformat embedded JavaScript strings or templates as plain HTML.
- Apply these rules to HTML being created or edited. Reformat an entire existing file only when requested.
- Table allow use border
- Table head allow background color: #93B9F6, text aligin: center, font-size: 14px
- Table body: use color for even/odd row

Preferred:
```html
<div class="header-divider">
</div>

<div class="page-heading">
    <h1>
        Danh sách Sinh Viên
    </h1>
</div>
```

Avoid:
```html
<div class="header-divider"></div>
<div class="page-heading"><h1>Danh sách Sinh Viên</h1></div>
```

## JavaScript/jQuery Rules
### JavaScript
- Variable/function naming follows camelCase; constants UPPER_SNAKE_CASE.
- Functions should start with verbs.
- Indentation: 4 spaces.
- Always use semicolons.
- Never omit braces.
- Use single quotes for strings.
- Use strict comparison (`===`, `!==`).
- Prefer `const`, then `let`; avoid `var`.
- Add JSDoc to all functions.
- Use ternary operators when clear.
- Use `??` / `??=` where appropriate.
- Prefer `forEach()` for array loops.
- Do not use `eval`.
- Add intent comments when calling project-specific custom/shared methods.

### jQuery
- Ready: `$(() => { })` or `$(function() { })`.
- Load: `$(window).on('load', () => { })`.
- Event binding: `.on()` only.
- Cache repeated selectors.
- Use method chaining for repeated operations on the same selector.
- AJAX: use `.done()/.fail()/.always()`, set timeout, and show spinner while processing.
