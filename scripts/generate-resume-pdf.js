const fs = require('fs');
const path = require('path');

const outPath = path.join(__dirname, '..', 'client', 'public', 'resume.pdf');
const pageWidth = 595.28;
const pageHeight = 841.89;
const margin = 42;
const contentWidth = pageWidth - margin * 2;

const regular = 'F1';
const bold = 'F2';
const pages = [];
let ops = [];
let annotations = [];
let y = pageHeight - margin;

function esc(text) {
  return String(text)
    .replace(/\\/g, '\\\\')
    .replace(/\(/g, '\\(')
    .replace(/\)/g, '\\)');
}

function addOp(op) {
  ops.push(op);
}

function beginPage() {
  ops = [];
  annotations = [];
  y = pageHeight - margin;
}

function finishPage() {
  pages.push({ content: ops.join('\n'), annotations });
}

function ensureSpace(height) {
  if (y - height < margin) {
    finishPage();
    beginPage();
  }
}

function textLine(text, x, size = 10, font = regular, color = '0.10 0.14 0.20') {
  addOp(`BT /${font} ${size} Tf ${color} rg ${x.toFixed(2)} ${y.toFixed(2)} Td (${esc(text)}) Tj ET`);
  y -= size * 1.28;
}

function linkLine(text, url, x, size = 9.2) {
  const width = measure(text, size);
  addOp(`BT /${regular} ${size} Tf 0.03 0.35 0.55 rg ${x.toFixed(2)} ${y.toFixed(2)} Td (${esc(text)}) Tj ET`);
  annotations.push({
    rect: [x, y - 3, x + width, y + size],
    url,
  });
  y -= size * 1.28;
}

function inlineLine(segments, x, size = 9.2) {
  let cursor = x;

  for (const segment of segments) {
    const font = segment.font || regular;
    const color = segment.color || '0.20 0.25 0.32';
    const width = measure(segment.text, size);
    addOp(`BT /${font} ${size} Tf ${color} rg ${cursor.toFixed(2)} ${y.toFixed(2)} Td (${esc(segment.text)}) Tj ET`);

    if (segment.url) {
      annotations.push({
        rect: [cursor, y - 3, cursor + width, y + size],
        url: segment.url,
      });
    }

    cursor += width;
  }

  y -= size * 1.28;
}

function line(x1, y1, x2, y2, width = 1, color = '0.82 0.86 0.91') {
  addOp(`${color} RG ${width} w ${x1.toFixed(2)} ${y1.toFixed(2)} m ${x2.toFixed(2)} ${y2.toFixed(2)} l S`);
}

function measure(text, size) {
  return String(text).length * size * 0.48;
}

function wrap(text, size, maxWidth) {
  const words = String(text).split(/\s+/);
  const lines = [];
  let current = '';

  for (const word of words) {
    const next = current ? `${current} ${word}` : word;
    if (measure(next, size) <= maxWidth) {
      current = next;
    } else {
      if (current) lines.push(current);
      current = word;
    }
  }

  if (current) lines.push(current);
  return lines;
}

function paragraph(text, size = 9.6, indent = 0, font = regular) {
  const lines = wrap(text, size, contentWidth - indent);
  ensureSpace(lines.length * size * 1.5);
  for (const row of lines) {
    addOp(`BT /${font} ${size} Tf 0.15 0.20 0.28 rg ${(margin + indent).toFixed(2)} ${y.toFixed(2)} Td (${esc(row)}) Tj ET`);
    y -= size * 1.5;
  }
}

function section(title) {
  ensureSpace(36);
  y -= 4;
  textLine(title.toUpperCase(), margin, 10.5, bold, '0.05 0.09 0.16');
  line(margin, y + 4, pageWidth - margin, y + 4, 0.8);
  y -= 7;
}

function itemTitle(title, meta = '') {
  ensureSpace(28);
  addOp(`BT /${bold} 10.4 Tf 0.06 0.09 0.16 rg ${margin.toFixed(2)} ${y.toFixed(2)} Td (${esc(title)}) Tj ET`);
  if (meta) {
    const x = pageWidth - margin - measure(meta, 9.2);
    addOp(`BT /${regular} 9.2 Tf 0.40 0.45 0.53 rg ${x.toFixed(2)} ${y.toFixed(2)} Td (${esc(meta)}) Tj ET`);
  }
  y -= 13;
}

function subtitle(text) {
  textLine(text, margin, 9.4, bold, '0.20 0.28 0.38');
}

function bullet(text) {
  const rows = wrap(text, 9.3, contentWidth - 16);
  ensureSpace(rows.length * 13);
  rows.forEach((row, index) => {
    const prefix = index === 0 ? '- ' : '  ';
    textLine(`${prefix}${row}`, margin + 8, 9.3, regular, '0.16 0.21 0.29');
  });
}

function skill(label, value) {
  ensureSpace(14);
  addOp(`BT /${bold} 9.4 Tf 0.06 0.09 0.16 rg ${margin.toFixed(2)} ${y.toFixed(2)} Td (${esc(label)}) Tj ET`);
  addOp(`BT /${regular} 9.4 Tf 0.16 0.21 0.29 rg ${(margin + 138).toFixed(2)} ${y.toFixed(2)} Td (${esc(value)}) Tj ET`);
  y -= 13;
}

function buildResume() {
  beginPage();

  textLine('Shanmuka Patnala', margin, 22, bold, '0.03 0.08 0.15');
  textLine('Full Stack Developer | Java Developer | AI Enthusiast', margin, 11.4, bold, '0.06 0.37 0.56');
  y -= 2;
  inlineLine([
    { text: 'Phone: ' },
    { text: '9505510317' },
    { text: '   ' },
    { text: 'Email: ' },
    { text: 'shanmukpatnala13@gmail.com', color: '0.03 0.35 0.55', url: 'mailto:shanmukpatnala13@gmail.com' },
  ], margin, 9.2);
  inlineLine([
    { text: 'Github: ' },
    { text: 'github.com/shanmukpatnala', color: '0.03 0.35 0.55', url: 'https://github.com/shanmukpatnala' },
    { text: '   ' },
    { text: 'Linkedin: ' },
    { text: 'linkedin.com/in/shanmuka-patnala-b752b430b', color: '0.03 0.35 0.55', url: 'https://www.linkedin.com/in/shanmuka-patnala-b752b430b/' },
  ], margin, 9.2);
  line(margin, y + 4, pageWidth - margin, y + 4, 1.3, '0.06 0.37 0.56');
  y -= 6;

  section('Professional Summary');
  paragraph('Passionate Full Stack Developer focused on building modern, scalable, and user-friendly web applications. Strong foundation in React.js, Node.js, Java, REST APIs, Firebase, databases, and AI/ML fundamentals. Interested in solving real-world problems through clean code, practical design, and continuous learning.');

  section('Technical Skills');
  skill('Languages', 'C, Java, Python, JavaScript (ES6+)');
  skill('Frontend', 'HTML5, CSS3, React.js, responsive web design');
  skill('Backend', 'Node.js, Express.js, REST APIs, JSON, HTTP methods, Firebase basics');
  skill('Databases', 'SQL, MySQL, PostgreSQL/SQLite, Firebase Firestore, Realtime Database, Supabase');
  skill('AI/ML', 'AI basics, machine learning basics, CNN, NLP, prompt engineering');
  skill('Tools', 'Git, GitHub, VS Code, Android Studio, Firebase Hosting, Vercel, Azure DevOps');

  section('Projects');
  itemTitle('Bridging Risk and Innovation Generative AI');
  subtitle('Generative AI scenario generation system');
  bullet('Developed a GPT-2 based scenario generation system to automate future forecasting and decision-making.');
  bullet('Built an end-to-end NLP pipeline with prompt processing, preprocessing, and BPE tokenization.');
  bullet('Implemented generation, filtering, evaluation, and output rendering modules.');
  bullet('Integrated ethical AI filtering to reduce bias, hallucination, and unsafe content.');
  paragraph('Tech Stack: GPT-2, HuggingFace Transformers, Scikit-learn, Pandas, NumPy', 9.1, 8, bold);
  y -= 3;

  itemTitle('Facial Recognition Based Attendance System');
  subtitle('Real-time attendance platform using computer vision');
  bullet('Engineered a real-time attendance system using MobileNet and Tiny Face Detector.');
  bullet('Developed a scalable full-stack application using React.js, Node.js, Firebase, and REST APIs.');
  bullet('Implemented face embeddings and distance-based matching for identity verification.');
  bullet('Built secure role-based access control for Admin, Faculty, and Student users.');
  paragraph('Tech Stack: React.js, Node.js, Firebase, REST APIs, Computer Vision', 9.1, 8, bold);
  y -= 3;

  itemTitle('Project Task Manager');
  subtitle('Responsive task management web application');
  bullet('Developed task tracking features with React.js and Firebase.');
  bullet('Implemented real-time data handling and authentication using Firebase Firestore and Firebase Auth.');
  bullet('Designed modular components and admin features to support user management and scalability.');
  paragraph('Tech Stack: React.js, Vite, Firebase Firestore, Firebase Auth', 9.1, 8, bold);

  section('Experience');
  itemTitle('Software Developer Intern - Linkerr.in', 'Jan 2026 - Present');
  bullet('Gaining hands-on experience and contributing to real-world software development tasks.');
  bullet('Working across frontend and backend development workflows.');

  section('Education');
  itemTitle('DRK Institute of Science and Technology', '2022 - 2026');
  subtitle('B.Tech, Computer Science Engineering (AI & ML)');

  section('Professional Skills');
  bullet('Problem solving, debugging, time management, adaptability, team collaboration, and fast learning.');

  finishPage();
}

function streamObject(content) {
  const len = Buffer.byteLength(content, 'utf8');
  return `<< /Length ${len} >>\nstream\n${content}\nendstream`;
}

function linkAnnotation(annotation) {
  const rect = annotation.rect.map((value) => value.toFixed(2)).join(' ');
  return `<< /Type /Annot /Subtype /Link /Rect [${rect}] /Border [0 0 0] /A << /S /URI /URI (${esc(annotation.url)}) >> >>`;
}

function makePdf() {
  buildResume();

  const objects = [];
  objects.push('<< /Type /Catalog /Pages 2 0 R >>');

  let nextObject = 5;
  const pageRefs = pages.map((page) => {
    const pageRef = nextObject++;
    const streamRef = nextObject++;
    const annotationRefs = page.annotations.map(() => nextObject++);
    return { page, pageRef, streamRef, annotationRefs };
  });
  const kids = pageRefs.map(({ pageRef }) => `${pageRef} 0 R`).join(' ');
  objects.push(`<< /Type /Pages /Kids [ ${kids} ] /Count ${pages.length} >>`);
  objects.push('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>');
  objects.push('<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold >>');

  pageRefs.forEach(({ page, streamRef, annotationRefs }) => {
    const annots = annotationRefs.length ? ` /Annots [ ${annotationRefs.map((ref) => `${ref} 0 R`).join(' ')} ]` : '';
    objects.push(`<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${pageWidth} ${pageHeight}] /Resources << /Font << /F1 3 0 R /F2 4 0 R >> >> /Contents ${streamRef} 0 R${annots} >>`);
    objects.push(streamObject(page.content));
    page.annotations.forEach((annotation) => {
      objects.push(linkAnnotation(annotation));
    });
  });

  let pdf = '%PDF-1.4\n';
  const offsets = [0];
  objects.forEach((obj, index) => {
    offsets.push(Buffer.byteLength(pdf, 'utf8'));
    pdf += `${index + 1} 0 obj\n${obj}\nendobj\n`;
  });

  const xrefOffset = Buffer.byteLength(pdf, 'utf8');
  pdf += `xref\n0 ${objects.length + 1}\n0000000000 65535 f \n`;
  for (let i = 1; i < offsets.length; i += 1) {
    pdf += `${String(offsets[i]).padStart(10, '0')} 00000 n \n`;
  }
  pdf += `trailer\n<< /Size ${objects.length + 1} /Root 1 0 R >>\nstartxref\n${xrefOffset}\n%%EOF\n`;

  fs.writeFileSync(outPath, pdf);
  console.log(`Wrote ${outPath}`);
}

makePdf();
