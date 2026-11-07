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
    const nameQuery = normalizeText(nameInput.value);
    const classQuery = normalizeText(classInput.value);
    filteredStudents = STUDENTS.filter((student) => normalizeText(student.name).includes(nameQuery)
        && normalizeText(student.classId).includes(classQuery)
        && (classificationInput.value === '' || student.classification === classificationInput.value));
    currentPage = 1;
    renderStudents();
}

/** Restore the complete list while preserving the selected page size. */
function resetSearch() {
    filteredStudents = [...STUDENTS];
    currentPage = 1;
    renderStudents();
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
searchForm.addEventListener('reset', resetSearch);
pageSizeInput.addEventListener('change', changePageSize);
pageNumbers.addEventListener('click', selectPage);
document.getElementById('previous-page').addEventListener('click', showPreviousPage);
document.getElementById('next-page').addEventListener('click', showNextPage);
document.getElementById('clear-empty').addEventListener('click', clearEmptySearch);
renderStudents();
