'use strict';

// Demo records until a student API is available. Academic status is supplied by data.
const STUDENTS = [
    { id: 'SV0001', name: 'Nguyễn Minh Anh', classId: 'CNTT01', classification: 'CNC', point: 8.7, status: 'Giỏi' },
    { id: 'SV0002', name: 'Trần Quốc Bảo', classId: 'CNTT02', classification: 'Normal', point: 7.5, status: 'Khá' },
    { id: 'SV0003', name: 'Lê Ngọc Chi', classId: 'TOAN01', classification: 'Chuyên', point: 9.2, status: 'Xuất sắc' },
    { id: 'SV0004', name: 'Phạm Tiến Dũng', classId: 'CNTT01', classification: 'CNC', point: 8.1, status: 'Giỏi' },
    { id: 'SV0005', name: 'Hoàng Thùy Dương', classId: 'QTKD01', classification: 'Normal', point: 7.8, status: 'Khá' },
    { id: 'SV0006', name: 'Vũ Minh Đức', classId: 'LY01', classification: 'Chuyên', point: 8.9, status: 'Giỏi' },
    { id: 'SV0007', name: 'Đặng Thu Hà', classId: 'QTKD02', classification: 'Normal', point: 6.4, status: 'Trung bình' },
    { id: 'SV0008', name: 'Bùi Gia Hân', classId: 'CNTT03', classification: 'CNC', point: 9.4, status: 'Xuất sắc' },
    { id: 'SV0009', name: 'Đỗ Quang Huy', classId: 'CNTT02', classification: 'Normal', point: 7.2, status: 'Khá' },
    { id: 'SV0010', name: 'Ngô Khánh Linh', classId: 'ANH01', classification: 'Chuyên', point: 8.6, status: 'Giỏi' },
    { id: 'SV0011', name: 'Dương Hoàng Long', classId: 'CNTT03', classification: 'CNC', point: 7.9, status: 'Khá' },
    { id: 'SV0012', name: 'Lý Nhật Minh', classId: 'QTKD01', classification: 'Normal', point: 5.8, status: 'Trung bình' },
    { id: 'SV0013', name: 'Nguyễn Bảo Ngọc', classId: 'TOAN01', classification: 'Chuyên', point: 9.1, status: 'Xuất sắc' },
    { id: 'SV0014', name: 'Trần Hải Phong', classId: 'CNTT01', classification: 'CNC', point: 8.3, status: 'Giỏi' },
    { id: 'SV0015', name: 'Lê Minh Phúc', classId: 'QTKD02', classification: 'Normal', point: 4.3, status: 'Yếu' },
    { id: 'SV0016', name: 'Phạm Như Quỳnh', classId: 'ANH01', classification: 'Chuyên', point: 8.8, status: 'Giỏi' },
    { id: 'SV0017', name: 'Hoàng Anh Thư', classId: 'CNTT02', classification: 'Normal', point: 7.6, status: 'Khá' },
    { id: 'SV0018', name: 'Vũ Thanh Tùng', classId: 'CNTT03', classification: 'CNC', point: 8.2, status: 'Giỏi' },
    { id: 'SV0019', name: 'Đặng Hải Yến', classId: 'LY01', classification: 'Chuyên', point: 9.3, status: 'Xuất sắc' },
    { id: 'SV0020', name: 'Bùi Đức Anh', classId: 'QTKD01', classification: 'Normal', point: 6.1, status: 'Trung bình' },
    { id: 'SV0021', name: 'Đỗ Mai Lan', classId: 'CNTT01', classification: 'CNC', point: 8.5, status: 'Giỏi' },
    { id: 'SV0022', name: 'Ngô Thành Nam', classId: 'CNTT02', classification: 'Normal', point: 7.3, status: 'Khá' },
    { id: 'SV0023', name: 'Dương Hà My', classId: 'ANH01', classification: 'Chuyên', point: 9.5, status: 'Xuất sắc' },
    { id: 'SV0024', name: 'Lý Tuấn Kiệt', classId: 'QTKD02', classification: 'Normal', point: 6.7, status: 'Khá' }
];

const CLASS_STYLES = { Normal: '', CNC: 'class-cnc', 'Chuyên': 'class-special' };
const STATUS_STYLES = { 'Xuất sắc': 'status-excellent', 'Giỏi': 'status-excellent', 'Khá': 'status-good', 'Trung bình': 'status-average', 'Yếu': 'status-weak' };
const ROW_STYLES = { 'Yếu': 'student-row-weak', 'Giỏi': 'student-row-good', 'Xuất sắc': 'student-row-excellent' };
const searchForm = document.getElementById('search-form');
const nameInput = document.getElementById('name');
const classInput = document.getElementById('class-id');
const classificationInput = document.getElementById('classification');
const pageSizeInput = document.getElementById('page-size');
const studentList = document.getElementById('student-list');
const pageNumbers = document.getElementById('page-numbers');
const studentDialog = document.getElementById('student-dialog');
const studentForm = document.getElementById('student-form');
const editInputs = {
    id: document.getElementById('edit-id'),
    name: document.getElementById('edit-name'),
    classId: document.getElementById('edit-class-id'),
    classification: document.getElementById('edit-classification'),
    point: document.getElementById('edit-point'),
    status: document.getElementById('edit-status')
};
let activeFilters = { name: '', classId: '', classification: '' };
let editingStudentId = null;
let editTrigger = null;
let filteredStudents = [...STUDENTS];
let currentPage = 1;

/** Normalize Vietnamese search text, including the separate letter đ. */
function normalizeText(value) {
    return value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[đĐ]/g, 'd').toLowerCase().trim().replace(/\s+/g, ' ');
}

/** Create a cell using text content so data cannot inject markup. */
function createCell(value, className = '') {
    const cell = document.createElement('td');
    cell.textContent = value;
    cell.className = className;
    return cell;
}

/** Create an accessible row action with a local SVG icon for offline use. */
function createActionButton(student, action) {
    const isUpdate = action === 'update';
    const button = document.createElement('button');
    button.type = 'button';
    button.className = `student-action ${action}-btn`;
    button.dataset.action = action;
    button.dataset.studentId = student.id;
    button.title = `${isUpdate ? 'Cập nhật' : 'Xóa'} sinh viên ${student.name} (${student.id})`;
    button.setAttribute('aria-label', button.title);
    const icon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    icon.setAttribute('class', `fa-solid ${isUpdate ? 'fa-pen-nib' : 'fa-trash'}`);
    icon.setAttribute('viewBox', '0 0 24 24');
    icon.setAttribute('aria-hidden', 'true');
    icon.setAttribute('fill', 'none');
    icon.setAttribute('stroke', 'currentColor');
    icon.setAttribute('stroke-width', '1.8');
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('d', isUpdate
        ? 'M14 3 21 10 18 13 11 6Z M11 6 5 8 3 21 16 19 18 13 M3 21 10 14 M10 11a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3'
        : 'M3 6h18 M9 6V3h6v3 M5 6l1 15h12l1-15 M10 10v7 M14 10v7');
    icon.append(path);
    button.append(icon);
    return button;
}

/** Render the current result page and keep pagination within the valid range. */
function renderStudents() {
    const pageSize = Number(pageSizeInput.value);
    const totalPages = Math.max(1, Math.ceil(filteredStudents.length / pageSize));
    currentPage = Math.min(Math.max(1, currentPage), totalPages);
    const startIndex = (currentPage - 1) * pageSize;
    studentList.replaceChildren();

    filteredStudents.slice(startIndex, startIndex + pageSize).forEach((student) => {
        const row = document.createElement('tr');
        // STD001 v2 highlights the entire row according to the supplied academic status.
        const rowStyle = ROW_STYLES[student.status];
        if (rowStyle) {
            row.classList.add('student-row-highlight', rowStyle);
        }
        row.append(createCell(student.id, 'student-id'), createCell(student.name, 'student-name'), createCell(student.classId));
        const classCell = createCell('');
        const classBadge = document.createElement('span');
        classBadge.className = `class-badge ${CLASS_STYLES[student.classification] ?? ''}`;
        classBadge.textContent = student.classification;
        classCell.append(classBadge);
        const statusCell = createCell('');
        const statusBadge = document.createElement('span');
        statusBadge.className = `status ${STATUS_STYLES[student.status] ?? ''}`;
        statusBadge.textContent = student.status;
        statusCell.append(statusBadge);
        row.append(classCell, createCell(student.point.toFixed(1), 'score-cell'), statusCell);
        const actionsCell = createCell('', 'actions-cell');
        actionsCell.append(createActionButton(student, 'update'), createActionButton(student, 'delete'));
        row.append(actionsCell);
        studentList.append(row);
    });

    document.getElementById('empty-state').hidden = filteredStudents.length !== 0;
    document.getElementById('result-count').textContent = filteredStudents.length;
    document.getElementById('result-summary').textContent = filteredStudents.length === 0
        ? 'Không có sinh viên phù hợp.'
        : `Hiển thị ${startIndex + 1}–${Math.min(startIndex + pageSize, filteredStudents.length)} trong ${filteredStudents.length} sinh viên`;
    document.getElementById('previous-page').disabled = currentPage === 1;
    document.getElementById('next-page').disabled = currentPage === totalPages;
    pageNumbers.replaceChildren();
    Array.from({ length: totalPages }, (_, index) => index + 1).forEach((page) => {
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'page-button';
        button.textContent = page;
        button.dataset.page = page;
        button.setAttribute('aria-label', `Trang ${page}`);
        if (page === currentPage) {
            button.setAttribute('aria-current', 'page');
        }
        pageNumbers.append(button);
    });
}

/** Apply all search conditions together, then return to the first page. */
function applySearch(event) {
    event.preventDefault();
    activeFilters = {
        name: normalizeText(nameInput.value),
        classId: normalizeText(classInput.value),
        classification: classificationInput.value
    };
    currentPage = 1;
    refreshStudents();
}

/** Reapply submitted filters after a record changes, preserving the current page. */
function refreshStudents() {
    filteredStudents = STUDENTS.filter((student) => normalizeText(student.name).includes(activeFilters.name)
        && normalizeText(student.classId).includes(activeFilters.classId)
        && (activeFilters.classification === '' || student.classification === activeFilters.classification));
    renderStudents();
}

/** Restore the complete list while preserving the selected page size. */
function resetSearch() {
    activeFilters = { name: '', classId: '', classification: '' };
    currentPage = 1;
    refreshStudents();
}

/** Open STD002 for the selected student or remove the confirmed demo record. */
function handleStudentAction(event) {
    const button = event.target.closest('button[data-action]');
    if (!button) {
        return;
    }
    const studentIndex = STUDENTS.findIndex((student) => student.id === button.dataset.studentId);
    if (studentIndex === -1) {
        return;
    }
    const student = STUDENTS[studentIndex];
    if (button.dataset.action === 'update') {
        editingStudentId = student.id;
        editTrigger = button;
        studentForm.reset();
        Object.entries(editInputs).forEach(([key, input]) => {
            input.setCustomValidity('');
            input.value = student[key];
        });
        studentDialog.showModal();
        editInputs.name.focus();
    } else if (button.dataset.action === 'delete' && window.confirm(`Xóa sinh viên ${student.name} (${student.id}) khỏi danh sách?`)) {
        STUDENTS.splice(studentIndex, 1);
        refreshStudents();
        const nextAction = studentList.querySelector('button[data-action="delete"]');
        (nextAction ?? document.getElementById('clear-empty')).focus();
    }
}

/** Validate and save STD002 changes without deriving academic status from the score. */
function saveStudent(event) {
    event.preventDefault();
    [editInputs.name, editInputs.classId].forEach((input) => {
        input.setCustomValidity(input.value.trim() === '' ? 'Vui lòng nhập thông tin.' : '');
    });
    if (!studentForm.reportValidity()) {
        return;
    }
    const student = STUDENTS.find((record) => record.id === editingStudentId);
    if (!student) {
        return;
    }
    Object.assign(student, {
        name: editInputs.name.value.trim(),
        classId: editInputs.classId.value.trim(),
        classification: editInputs.classification.value,
        point: Number(editInputs.point.value),
        status: editInputs.status.value
    });
    refreshStudents();
    studentDialog.close();
}

/** Close STD002 without changing the selected record. */
function cancelEdit() {
    studentDialog.close();
}

/** Restore focus after closing, including when an edit removes a filtered row. */
function restoreEditFocus() {
    const button = Array.from(studentList.querySelectorAll('button[data-action="update"]'))
        .find((action) => action.dataset.studentId === editingStudentId);
    (button ?? (editTrigger?.isConnected ? editTrigger : nameInput)).focus();
    editingStudentId = null;
    editTrigger = null;
}

/** Clear a field error as soon as the user corrects its value. */
function clearEditValidity(event) {
    event.target.setCustomValidity('');
}

/** Recalculate pagination after changing the number of visible rows. */
function changePageSize() {
    currentPage = 1;
    renderStudents();
}

/** Navigate to a numbered page using event delegation. */
function selectPage(event) {
    const button = event.target.closest('button[data-page]');
    if (button) {
        currentPage = Number(button.dataset.page);
        renderStudents();
        pageNumbers.querySelector('[aria-current="page"]').focus();
    }
}

/** Move to the previous result page. */
function showPreviousPage() {
    currentPage -= 1;
    renderStudents();
}

/** Move to the next result page. */
function showNextPage() {
    currentPage += 1;
    renderStudents();
}

/** Clear the search form from the empty state and restore keyboard focus. */
function clearEmptySearch() {
    searchForm.reset();
    nameInput.focus();
}

searchForm.addEventListener('submit', applySearch);
studentList.addEventListener('click', handleStudentAction);
studentForm.addEventListener('submit', saveStudent);
studentForm.addEventListener('input', clearEditValidity);
studentDialog.addEventListener('close', restoreEditFocus);
document.getElementById('cancel-edit').addEventListener('click', cancelEdit);
searchForm.addEventListener('reset', resetSearch);
pageSizeInput.addEventListener('change', changePageSize);
pageNumbers.addEventListener('click', selectPage);
document.getElementById('previous-page').addEventListener('click', showPreviousPage);
document.getElementById('next-page').addEventListener('click', showNextPage);
document.getElementById('clear-empty').addEventListener('click', clearEmptySearch);
renderStudents();
