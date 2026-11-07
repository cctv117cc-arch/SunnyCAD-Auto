'use strict';

const DEFAULT_ROW_COUNT = 8;
const MAX_ROW_COUNT = 1000;
const INPUT_FIELDS = [
    { key: 'yard', label: 'Yard', defaultValue: 0, min: 0, step: 'any' },
    { key: 'inch', label: 'Inch', defaultValue: 0, min: 0, step: 'any' },
    { key: 'p32', label: 'P32', defaultValue: 0, min: 0, step: 'any' },
    { key: 'ratio', label: 'Ratio (set)', defaultValue: 0, min: 0, step: '1' },
    { key: 'layer', label: 'Number of Layer', defaultValue: 1, min: 1, step: '1' }
];
const markerRows = document.getElementById('marker-rows');
const rowCountInput = document.getElementById('number-of-unit');
const calculationStatus = document.getElementById('calculation-status');
// Retain entered values when temporarily reducing the visible row count.
const savedRows = [];

/** Round a result for display and for the summed marker × layer values. */
function roundResult(value) {
    return Number(value.toFixed(4));
}

/** Calculate with the original marker precision before rounding each output. */
function calculateMarker(values) {
    const marker = values.yard + (values.inch + values.p32 / 32) / 36;
    return {
        marker: roundResult(marker),
        perSet: values.ratio > 0 ? roundResult(marker / values.ratio) : (marker === 0 ? 0 : null),
        layered: roundResult(marker * values.layer),
        sets: values.ratio * values.layer
    };
}

/** Display unavailable or overflowing calculations without Infinity or NaN. */
function formatResult(value) {
    return value !== null && Number.isFinite(value) ? value.toFixed(4) : '—';
}

/** Build an accessible numeric input for one marker field. */
function createMarkerInput(field, index) {
    const input = document.createElement('input');
    input.type = 'number';
    input.id = `${field.key}-${index + 1}`;
    input.dataset.field = field.key;
    input.min = field.min;
    input.step = field.step;
    input.required = true;
    input.value = savedRows[index]?.[field.key] ?? field.defaultValue;
    input.setAttribute('aria-label', `${field.label}, dòng ${index + 1}`);
    return input;
}

/** Resize the marker table while preserving values from existing rows. */
function renderRows(count) {
    const fragment = document.createDocumentFragment();
    Array.from({ length: count }).forEach((_, index) => {
        const row = document.createElement('tr');
        const heading = document.createElement('th');
        heading.scope = 'row';
        heading.textContent = index + 1;
        row.append(heading);
        INPUT_FIELDS.forEach((field) => {
            const cell = document.createElement('td');
            cell.append(createMarkerInput(field, index));
            row.append(cell);
        });
        ['marker', 'perSet', 'layered'].forEach((key) => {
            const cell = document.createElement('td');
            const output = document.createElement('output');
            output.dataset.result = key;
            cell.append(output);
            row.append(cell);
        });
        fragment.append(row);
    });
    markerRows.replaceChildren(fragment);
    refreshCalculation();
}

/** Validate all visible inputs and refresh row results and weighted totals. */
function refreshCalculation() {
    let totalSet = 0;
    let totalYard = 0;
    let hasInvalidInput = false;
    let hasMissingRatio = false;
    Array.from(markerRows.rows).forEach((row, index) => {
        const values = {};
        let isValid = true;
        const savedValues = {};
        row.querySelectorAll('input').forEach((input) => {
            const valid = input.validity.valid && Number.isFinite(input.valueAsNumber);
            input.setAttribute('aria-invalid', String(!valid));
            values[input.dataset.field] = input.valueAsNumber;
            savedValues[input.dataset.field] = input.value;
            isValid = isValid && valid;
        });
        savedRows[index] = savedValues;
        const result = isValid ? calculateMarker(values) : { marker: null, perSet: null, layered: null, sets: null };
        row.querySelectorAll('output').forEach((output) => {
            output.value = formatResult(result[output.dataset.result]);
        });
        hasInvalidInput = hasInvalidInput || !isValid;
        hasMissingRatio = hasMissingRatio || (isValid && result.perSet === null);
        totalSet += result.sets ?? 0;
        totalYard += result.layered ?? 0;
    });
    const average = totalSet > 0 ? totalYard / totalSet : (totalYard === 0 ? 0 : null);
    document.getElementById('total-set').value = formatResult(hasInvalidInput ? null : totalSet);
    document.getElementById('total-yard').value = formatResult(hasInvalidInput ? null : totalYard);
    document.getElementById('average-per-set').value = formatResult(hasInvalidInput ? null : average);
    calculationStatus.textContent = hasInvalidInput
        ? 'Vui lòng nhập số không âm vào các ô được đánh dấu; ratio là số nguyên và số lớp là số nguyên từ 1.'
        : (hasMissingRatio ? 'Có marker có độ dài nhưng Ratio bằng 0. Nhập Ratio lớn hơn 0 để tính độ dài mỗi set.' : 'Kết quả tự động cập nhật theo dữ liệu đã nhập.');
}

/** Apply only a valid whole row count; leave existing rows intact otherwise. */
function changeRowCount() {
    const count = rowCountInput.valueAsNumber;
    const valid = rowCountInput.validity.valid && Number.isInteger(count) && count >= 1 && count <= MAX_ROW_COUNT;
    rowCountInput.setAttribute('aria-invalid', String(!valid));
    if (!valid) {
        calculationStatus.textContent = 'Số lượng dòng phải là số nguyên từ 1 đến 1.000. Bảng vẫn giữ số dòng trước đó.';
        return;
    }
    renderRows(count);
}

/** Restore the initial eight rows and all documented defaults. */
function resetCalculation() {
    savedRows.length = 0;
    rowCountInput.value = DEFAULT_ROW_COUNT;
    rowCountInput.setAttribute('aria-invalid', 'false');
    renderRows(DEFAULT_ROW_COUNT);
}

markerRows.addEventListener('input', refreshCalculation);
rowCountInput.addEventListener('input', changeRowCount);
document.getElementById('reset-calculation').addEventListener('click', resetCalculation);
renderRows(DEFAULT_ROW_COUNT);
