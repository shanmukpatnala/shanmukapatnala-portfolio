import React, {useEffect, useRef, useState} from 'react'

const Typing = ({words, speed=80})=>{
  const [text, setText] = useState('')
  const wi = useRef(0); const ci = useRef(0); const forward = useRef(true)
  useEffect(()=>{
    let mounted=true
    function tick(){
      const cur = words[wi.current]
      if(forward.current){ ci.current++; if(ci.current>cur.length){ forward.current=false; setTimeout(tick,800); return }}
      else { ci.current--; if(ci.current<0){ forward.current=true; wi.current=(wi.current+1)%words.length }}
      if(mounted) setText(cur.slice(0,ci.current))
      setTimeout(tick, forward.current?speed:40)
    }
    tick()
    return ()=>mounted=false
  },[words,speed])
  return <span>{text}<span className="cursor">|</span></span>
}

export default function App(){
  const fullName = 'Shanmuka Sai Manikanta Patnala'
  const shortName = 'Shanmuka Patnala'
  const phone = '9505510317'
  const whatsapp = 'https://wa.me/919505510317'
  const email = 'shanmukpatnala13@gmail.com'
  const github = 'https://github.com/shanmukpatnala'
  const linkedin = 'https://www.linkedin.com/in/shanmuka-patnala-b752b430b/'
  const repositories = {
    generativeAi: `${github}/bridging-risk-and-innovation-generative-ai`,
    attendance: `${github}/facial-recognition-attendance-system`,
    taskManager: `${github}/project-task-manager`,
  }
  const profileImage = './profile.jpeg'
  const fallbackImage = 'https://via.placeholder.com/140x140.png?text=Photo'
  const words=['Full Stack Developer','Java Developer','Problem Solver','AI Enthusiast']
  const skillGroups = [
    {
      title:'AI & Data',
      skills:[
        {name:'Artificial Intelligence (AI)',details:'Basics, model usage, prompt engineering'},
        {name:'Machine Learning (Basics)',details:'Deep learning (CNN), natural language processing (NLP)'},
        {name:'Analytical Skills',details:'Data interpretation, debugging'},
        {name:'AI Tools',details:'ChatGPT, Google Gemini, Claude, GitHub Copilot'},
      ],
    },
    {
      title:'Frontend',
      skills:[
        {name:'HTML/CSS',details:'Responsive web design'},
        {name:'JavaScript (ES6+)',details:'Modern JavaScript fundamentals'},
        {name:'React.js',details:'Component-based user interfaces'},
        {name:'Web Development',details:'Frontend and backend basics'},
      ],
    },
    {
      title:'Programming & Backend',
      skills:[
        {name:'Programming Languages',details:'C, Java, Python'},
        {name:'Data Structures & Algorithms',details:'Basics'},
        {name:'Logic Programming',details:'Problem-solving fundamentals'},
        {name:'Backend',details:'Node.js, Express.js, Firebase Console basics'},
        {name:'API Development',details:'REST APIs, JSON, HTTP methods'},
      ],
    },
    {
      title:'Database & Tools',
      skills:[
        {name:'Database',details:'SQL, MySQL, PostgreSQL/SQLite, Firebase Firestore, Realtime Database, Supabase'},
        {name:'Authentication',details:'Firebase authentication'},
        {name:'Deployment',details:'Firebase Hosting, Vercel'},
        {name:'Version Control',details:'Git, GitHub branching, merging, pull requests'},
        {name:'DevOps & Project Management',details:'Azure DevOps boards, repos, work items'},
        {name:'Tools',details:'VS Code, Android Studio, Microsoft Word, PowerPoint'},
      ],
    },
    {
      title:'Professional Skills',
      skills:[
        {name:'Problem Solving',details:'Algorithms, optimization'},
        {name:'Self-Management',details:'Time management, adaptability'},
        {name:'Computer Literacy',details:'General computing and productivity tools'},
      ],
    },
  ]
  const canvasRef = useRef(null)

  useEffect(()=>{
    // Particle / grid background for hero
    const canvas = canvasRef.current
    if(!canvas) return
    const ctx = canvas.getContext('2d')
    let w = canvas.width = canvas.clientWidth
    let h = canvas.height = canvas.clientHeight
    const particles = []
    const count = Math.round((w*h)/60000)
    for(let i=0;i<count;i++) particles.push({x:Math.random()*w,y:Math.random()*h,r:Math.random()*1.2+0.4,vx:(Math.random()-0.5)*0.3,vy:(Math.random()-0.5)*0.3})
    let raf
    function resize(){ w=canvas.width=canvas.clientWidth; h=canvas.height=canvas.clientHeight }
    window.addEventListener('resize', resize)
    function draw(){
      ctx.clearRect(0,0,w,h)
      // soft gradient
      const g = ctx.createLinearGradient(0,0,w,h); g.addColorStop(0,'rgba(0,194,255,0.03)'); g.addColorStop(1,'rgba(107,224,255,0.01)');
      ctx.fillStyle = g; ctx.fillRect(0,0,w,h)
      // grid lines
      ctx.strokeStyle = 'rgba(60,140,200,0.04)'; ctx.lineWidth=1
      const gap = 80
      for(let x=0;x<w;x+=gap){ ctx.beginPath(); ctx.moveTo(x,0); ctx.lineTo(x,h); ctx.stroke() }
      for(let y=0;y<h;y+=gap){ ctx.beginPath(); ctx.moveTo(0,y); ctx.lineTo(w,y); ctx.stroke() }
      // particles
      particles.forEach(p=>{
        p.x+=p.vx; p.y+=p.vy
        if(p.x<0) p.x=w; if(p.x>w) p.x=0; if(p.y<0) p.y=h; if(p.y>h) p.y=0
        ctx.beginPath(); ctx.fillStyle='rgba(107,224,255,0.7)'; ctx.arc(p.x,p.y,p.r,0,Math.PI*2); ctx.fill()
      })
      raf = requestAnimationFrame(draw)
    }
    draw()
    return ()=>{ cancelAnimationFrame(raf); window.removeEventListener('resize', resize) }
  },[])

  useEffect(()=>{
    // Intersection observer for fade-in
    const obs = new IntersectionObserver((entries)=>{
      entries.forEach(e=>{ if(e.isIntersecting) e.target.classList.add('in-view') })
    },{threshold:0.12})
    document.querySelectorAll('.fade-up').forEach(el=>obs.observe(el))
    return ()=>obs.disconnect()
  },[])

  useEffect(()=>{
    // Active nav link on scroll
    const links = Array.from(document.querySelectorAll('.nav-links a'))
    const sections = links.map(l=>document.querySelector(l.getAttribute('href')))
    function onScroll(){
      const top = window.scrollY + 120
      let idx = sections.findIndex(s=>s && s.offsetTop + s.offsetHeight > top)
      if(idx===-1) idx = sections.length-1
      links.forEach((a,i)=> a.classList.toggle('active', i===idx))
    }
    onScroll(); window.addEventListener('scroll', onScroll)
    return ()=>window.removeEventListener('scroll', onScroll)
  },[])

  const handleSubmit=(e)=>{
    e.preventDefault()
    const data=Object.fromEntries(new FormData(e.target))
    const subject = encodeURIComponent(`Portfolio message from ${data.name}`)
    const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`)
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`
    e.target.reset()
  }

  return (
    <div>
      <header className="nav-wrap">
        <nav className="nav container sticky">
          <a className="brand" href="#hero">{shortName}</a>
          <ul className="nav-links"><li><a href="#about">About</a></li><li><a href="#skills">Skills</a></li><li><a href="#projects">Projects</a></li><li><a href="#education">Education</a></li><li><a href="#contact">Contact</a></li></ul>
        </nav>
      </header>

      <main>
        <section id="hero" className="hero">
          <canvas ref={canvasRef} id="hero-canvas" className="hero-canvas"></canvas>
          <div className="hero-content container">
            <div className="hero-left">
              <h1 className="name">{fullName}</h1>
              <p className="subtitle">Full Stack Developer</p>
              <p className="tagline">Building Future with Code</p>
              <p className="rotating">I am <Typing words={words} /></p>
              <div className="hero-ctas"><a className="btn primary" href="#projects">View Projects</a><a className="btn outline" href="./resume.pdf" download>Download Resume</a><a className="btn" href="#contact">Contact Me</a></div>
            </div>
            <div className="hero-right"><div className="profile-card glass"><div className="avatar"><img src={profileImage} alt={shortName} onError={(e)=>{ e.currentTarget.src = fallbackImage }}/></div><h3>{shortName}</h3><p>Full Stack Developer • Intern</p><div className="stats"><span>Intern at Linkerr.in</span><span>B.Tech CSE (AI &amp; ML)</span><span>Grad 2026</span></div></div></div>
          </div>
        </section>

        <section id="about" className="section about container fade-up"><h2>About Me</h2>
          <div className="about-grid">
            <div className="about-text card glass"><p>Hi, I’m {fullName}, a passionate Full Stack Developer focused on building modern, scalable, and user-friendly web applications. I enjoy turning ideas into real digital solutions through clean code and creative design. Currently, I am continuously learning and improving my skills in both frontend and backend technologies to become an industry-ready developer.</p></div>
            <div className="profile-quick card glass">
              <h3>Quick Profile</h3>
              <ul><li>Current Intern at Linkerr.in</li><li>B.Tech CSE (AI &amp; ML)</li><li>Graduation: 2026</li><li>Fast Learner</li><li>Team Player</li></ul>
            </div>
          </div>
        </section>

        <section id="skills" className="section skills container fade-up"><h2>Skills</h2>
          <div className="skills-grid">
            {skillGroups.map(group => (
              <div className="skill-card card glass detailed-skill-card" key={group.title}>
                <h4>{group.title}</h4>
                <div className="skill-list">
                  {group.skills.map(skill => (
                    <div className="skill-row" key={skill.name}>
                      <strong>{skill.name}:</strong> {skill.details}
                    </div>
                  ))}
                </div>
              </div>
            ))}
            <div className="skill-card card glass"><h4>Frontend</h4><div className="tags">HTML5 • CSS3 • JavaScript • React • Tailwind • Bootstrap</div><div className="progress"><span style={{'--w':'90%'}}>90%</span></div></div>
            <div className="skill-card card glass"><h4>Backend</h4><div className="tags">Java • Spring Boot • Node.js • Express</div><div className="progress"><span style={{'--w':'80%'}}>80%</span></div></div>
            <div className="skill-card card glass"><h4>Database</h4><div className="tags">MySQL • MongoDB</div><div className="progress"><span style={{'--w':'75%'}}>75%</span></div></div>
            <div className="skill-card card glass"><h4>Tools &amp; Other</h4><div className="tags">Git • GitHub • REST APIs • VS Code • OOP • Problem Solving</div><div className="progress"><span style={{'--w':'85%'}}>85%</span></div></div>
          </div>
        </section>

        <section id="projects" className="section projects container fade-up"><h2>Projects</h2>
          <div className="projects-grid">
            <article className="project-card card glass detailed-project-card">
              <div className="project-inner">
                <div className="project-media">AI</div>
                <div className="project-body">
                  <h3>Bridging Risk and Innovation Generative AI</h3>
                  <p>Developed a Generative AI scenario generation system using GPT-2 to automate future forecasting and decision-making.</p>
                  <ul>
                    <li>Built an end-to-end NLP pipeline with prompt processing, text preprocessing, and BPE tokenization.</li>
                    <li>Implemented advanced text generation and modular components for scenario generation, filtering, evaluation, and output rendering.</li>
                    <li>Integrated ethical AI filtering to reduce bias, hallucination, and unsafe content.</li>
                    <li>Evaluated performance using BLEU score, perplexity, and semantic relevance metrics.</li>
                  </ul>
                  <div className="tech-stack" aria-label="Tech stack">
                    <span>GPT-2</span><span>HuggingFace</span><span>Scikit-learn</span><span>Pandas</span><span>NumPy</span>
                  </div>
                  <div className="project-actions">
                    <a className="repo-link" href={repositories.generativeAi} target="_blank" rel="noreferrer">GitHub Repository</a>
                  </div>
                </div>
              </div>
            </article>
            <article className="project-card card glass detailed-project-card">
              <div className="project-inner">
                <div className="project-media">CV</div>
                <div className="project-body">
                  <h3>Facial Recognition Based Attendance System</h3>
                  <p>Engineered a real-time attendance system using MobileNet and Tiny Face Detector for accurate identification in different conditions.</p>
                  <ul>
                    <li>Developed a scalable full-stack application with React.js, Node.js, Firebase, and REST APIs.</li>
                    <li>Implemented face embedding and distance-based matching for precise identity verification.</li>
                    <li>Designed real-time video processing and browser APIs for efficient frame-by-frame face detection.</li>
                    <li>Built secure role-based access control for Admin, Faculty, and Student users.</li>
                  </ul>
                  <div className="tech-stack" aria-label="Tech stack">
                    <span>React.js</span><span>Node.js</span><span>Firebase</span><span>REST APIs</span><span>Computer Vision</span>
                  </div>
                  <div className="project-actions">
                    <a className="repo-link" href={repositories.attendance} target="_blank" rel="noreferrer">GitHub Repository</a>
                  </div>
                </div>
              </div>
            </article>
            <article className="project-card card glass detailed-project-card">
              <div className="project-inner">
                <div className="project-media">Web</div>
                <div className="project-body">
                  <h3>Project Task Manager</h3>
                  <p>Developing a responsive task management web application using React.js and Firebase.</p>
                  <ul>
                    <li>Implemented real-time data handling and authentication with Firebase Firestore and Firebase Auth.</li>
                    <li>Designed modular components and admin features to support task tracking, user management, and future scalability.</li>
                  </ul>
                  <div className="tech-stack" aria-label="Tech stack">
                    <span>React.js</span><span>Vite</span><span>Firestore</span><span>Firebase Auth</span>
                  </div>
                  <div className="project-actions">
                    <a className="repo-link" href={repositories.taskManager} target="_blank" rel="noreferrer">GitHub Repository</a>
                  </div>
                </div>
              </div>
            </article>
            <article className="project-card card glass">
              <div className="project-inner">
                <div className="project-media">3D</div>
                <div className="project-body"><h3>Project 1</h3><p>XXXXXXXX</p><p className="muted">Tech Stack: Python • Machine Learning • LightGBM • SHAP • Dashboard</p></div>
              </div>
            </article>
            <article className="project-card card glass"><div className="project-inner"><div className="project-media">Web</div><div className="project-body"><h3>E-Commerce Web App (placeholder)</h3><p>Full-featured shopping experience with product management, cart, and payments (placeholder).</p></div></div></article>
          </div>
        </section>

        <section id="education" className="section education container fade-up"><h2>Education</h2>
          <div className="timeline card glass">
            <div className="timeline-item"><h4>DRK Institute of Science and Technology</h4><p>Computer Science Engineering (AI &amp; ML) — Academic Year: 2022 - 2026</p></div>
          </div>
        </section>

        <section id="experience" className="section experience container fade-up"><h2>Experience</h2>
          <div className="timeline card glass">
            <div className="timeline-item"><h4>Linkerr.in</h4><p>Software Developer Intern • Jan 2026 - Present</p><p>Currently working as a software developer intern, gaining hands-on experience and contributing to real-world development tasks.</p></div>
          </div>
        </section>

        <section id="contact" className="section contact container fade-up"><h2>Contact</h2>
          <div className="contact-grid">
            <form onSubmit={handleSubmit} className="contact-form card glass">
              <label>Name<input name="name" required/></label>
              <label>Email<input name="email" type="email" required/></label>
              <label>Message<textarea name="message" rows={5} required/></label>
              <div className="form-ctas"><button className="btn primary" type="submit">Send Message</button></div>
            </form>
            <div className="contact-info card glass"><h3>Get in touch</h3><p>Email: <a href={`mailto:${email}`}>{email}</a></p><p>Phone: <a href={`tel:${phone}`}>{phone}</a></p><p>WhatsApp: <a href={whatsapp} target="_blank" rel="noreferrer">{phone}</a></p><p>LinkedIn: <a href={linkedin} target="_blank" rel="noreferrer">shanmuka-patnala</a></p><p>GitHub: <a href={github} target="_blank" rel="noreferrer">shanmukpatnala</a></p></div>
          </div>
        </section>
      </main>

      <footer className="site-footer"><div className="container">© 2026 {shortName}. Built with passion and code.</div></footer>
    </div>
  )
}
