import React, {useEffect, useRef, useState} from 'react'

const Icon = ({name, size=18}) => {
  const paths = {
    projects: <><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></>,
    download: <><path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M5 21h14"/></>,
    contact: <><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/><path d="M8 9h8M8 13h5"/></>,
    email: <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/></>,
    phone: <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.79 19.79 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.12.9.33 1.78.62 2.63a2 2 0 0 1-.45 2.11L8 9.73a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.85.29 1.73.5 2.63.62A2 2 0 0 1 22 16.92z"/>,
    whatsapp: <><path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8A8.5 8.5 0 0 1 12.5 20a8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7A8.38 8.38 0 0 1 4 11.5a8.5 8.5 0 1 1 17 0z"/><path d="M9 8.5c.5 2.5 2 4 4.5 5l1.5-1"/></>,
    linkedin: <><rect x="3" y="9" width="4" height="12"/><path d="M5 3.5v.01"/><path d="M11 21V9h4v2c1-2 6-3 6 3v7"/><circle cx="5" cy="4" r="1"/></>,
    github: <><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3.3-.4 6.8-1.6 6.8-7A5.4 5.4 0 0 0 19.4 4 5 5 0 0 0 19.3 1S18.2.7 15 2.5a13.4 13.4 0 0 0-7 0C4.8.7 3.7 1 3.7 1A5 5 0 0 0 3.6 4a5.4 5.4 0 0 0-1.4 3.7c0 5.4 3.5 6.6 6.8 7A4.8 4.8 0 0 0 8 18v4"/><path d="M8 19c-3 .9-3-1.5-4-2"/></>,
    send: <><path d="m22 2-7 20-4-9-9-4z"/><path d="M22 2 11 13"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/></>,
    message: <><path d="M21 15a4 4 0 0 1-4 4H8l-5 3V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4z"/></>,
  }

  return (
    <svg className="icon" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      {paths[name]}
    </svg>
  )
}

const Typing = ({words, speed=80, hold=5000})=>{
  const [text, setText] = useState('')
  const wi = useRef(0)
  const ci = useRef(0)
  const forward = useRef(true)

  useEffect(()=>{
    let timer

    function tick(){
      const cur = words[wi.current]

      if (forward.current) {
        ci.current += 1
        setText(cur.slice(0, ci.current))

        if (ci.current === cur.length) {
          forward.current = false
          timer = setTimeout(tick, hold)
          return
        }
      } else {
        ci.current -= 1
        setText(cur.slice(0, ci.current))

        if (ci.current === 0) {
          forward.current = true
          wi.current = (wi.current + 1) % words.length
          timer = setTimeout(tick, 350)
          return
        }
      }

      timer = setTimeout(tick, forward.current ? speed : 40)
    }

    tick()
    return ()=>clearTimeout(timer)
  },[words,speed,hold])

  return <span>{text}<span className="cursor">|</span></span>
}

export default function App(){
  const shortName = 'Shanmuka Patnala'
  const phone = '9505510317'
  const whatsapp = 'https://wa.me/919505510317'
  const email = 'shanmukpatnala13@gmail.com'
  const github = 'https://github.com/shanmukpatnala'
  const linkedin = 'https://www.linkedin.com/in/shanmuka-patnala-b752b430b/'
  const repositories = {
    generativeAi: `${github}/bridging-risk-and-innovation-generative-ai`,
    attendance: `${github}/Drk-Attendance-System`,
    taskManager: `${github}/project-task-manager`,
  }
  const profileImage = './profile.jpeg'
  const fallbackImage = 'https://via.placeholder.com/140x140.png?text=Photo'
  const words=['AI Enthusiast','Machine Learning Engineer','Frontend Developer','Software Developer','Full Stack Developer','Mobile App Developer','Problem Solver','Technical Support Engineer']
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
          <ul className="nav-links"><li><a href="#hero">Home</a></li><li><a href="#about">About</a></li><li><a href="#skills">Skills</a></li><li><a href="#projects">Projects</a></li><li><a href="#education">Education</a></li><li><a href="#contact">Contact</a></li></ul>
        </nav>
      </header>

      <main>
        <section id="hero" className="hero">
          <canvas ref={canvasRef} id="hero-canvas" className="hero-canvas"></canvas>
          <div className="hero-content container">
            <div className="hero-left">
              <h1 className="name">{shortName}</h1>
              <p className="subtitle">Full Stack Developer</p>
              <p className="tagline">Building Future with Code</p>
              <p className="rotating">I am <Typing words={words} /></p>
              <div className="hero-ctas"><a className="btn primary" href="#projects"><Icon name="projects"/>View Projects</a><a className="btn outline" href="./resume.pdf" download><Icon name="download"/>Download Resume</a><a className="btn" href="#contact"><Icon name="contact"/>Contact Me</a></div>
            </div>
            <div className="hero-right"><div className="profile-card glass"><div className="avatar"><img src={profileImage} alt={shortName} onError={(e)=>{ e.currentTarget.src = fallbackImage }}/></div><h3>{shortName}</h3><p className="profile-role">Full Stack Developer</p><div className="stats"><span>Intern at Linkerr.in</span><span>Fresher</span><span>B.Tech CSE (AI &amp; ML)</span><span>Grad 2026</span></div></div></div>
          </div>
        </section>

        <section id="about" className="section about container fade-up"><h2>About Me</h2>
          <div className="about-grid">
            <div className="about-text card glass">
              <p>Hi, I’m {shortName}, a versatile software professional interested in development, AI/ML, mobile applications, problem solving, and technical support. I enjoy learning quickly, understanding real-world requirements, and turning ideas or technical challenges into practical, user-friendly solutions.</p>
              <div className="role-focus">
                <div className="role-focus-item">
                  <span className="role-focus-icon">01</span>
                  <div><h4>Software Development</h4><p>Building responsive frontend, full-stack, and mobile application experiences with clean and maintainable code.</p></div>
                </div>
                <div className="role-focus-item">
                  <span className="role-focus-icon">02</span>
                  <div><h4>AI &amp; Machine Learning</h4><p>Exploring intelligent solutions through AI tools, machine learning fundamentals, data analysis, and continuous experimentation.</p></div>
                </div>
                <div className="role-focus-item">
                  <span className="role-focus-icon">03</span>
                  <div><h4>Problem Solving &amp; Support</h4><p>Diagnosing issues, communicating clearly, and providing dependable technical solutions with a user-first approach.</p></div>
                </div>
              </div>
              <div className="career-highlights">
                <div>
                  <span className="career-label">What I Bring</span>
                  <h4>Ready to learn, contribute, and grow</h4>
                  <p>I’m looking for an opportunity where I can apply my technical foundation, collaborate with an experienced team, and take ownership of meaningful work.</p>
                </div>
                <ul>
                  <li>Fast learner</li>
                  <li>Team collaboration</li>
                  <li>Clear communication</li>
                  <li>Adaptable mindset</li>
                </ul>
              </div>
            </div>
            <div className="profile-quick card glass">
              <h3>Quick Profile</h3>
              <ul><li>Current Intern at Linkerr.in</li><li>B.Tech CSE (AI &amp; ML)</li><li>Graduation: 2026</li><li>Fast Learner</li><li>Team Player</li></ul>
              <div className="target-roles">
                <h4>Target Roles</h4>
                <div className="role-tags">
                  {words.map(role => <span key={role}>{role}</span>)}
                </div>
              </div>
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
                    <a className="repo-link" href={repositories.generativeAi} target="_blank" rel="noreferrer"><Icon name="github"/>GitHub Repository</a>
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
                    <a className="repo-link" href={repositories.attendance} target="_blank" rel="noreferrer"><Icon name="github"/>GitHub Repository</a>
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
                    <a className="repo-link" href={repositories.taskManager} target="_blank" rel="noreferrer"><Icon name="github"/>GitHub Repository</a>
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
              <label><span className="label-text"><Icon name="user"/>Name</span><input name="name" required/></label>
              <label><span className="label-text"><Icon name="email"/>Email</span><input name="email" type="email" required/></label>
              <label><span className="label-text"><Icon name="message"/>Message</span><textarea name="message" rows={5} required/></label>
              <div className="form-ctas"><button className="btn primary" type="submit"><Icon name="send"/>Send Message</button></div>
            </form>
            <div className="contact-info card glass"><h3>Get in touch</h3><p><Icon name="email"/><span>Email:</span><a href={`mailto:${email}`}>{email}</a></p><p><Icon name="phone"/><span>Phone:</span><a href={`tel:${phone}`}>{phone}</a></p><p><Icon name="whatsapp"/><span>WhatsApp:</span><a href={whatsapp} target="_blank" rel="noreferrer">{phone}</a></p><p><Icon name="linkedin"/><span>LinkedIn:</span><a href={linkedin} target="_blank" rel="noreferrer">shanmuka-patnala</a></p><p><Icon name="github"/><span>GitHub:</span><a href={github} target="_blank" rel="noreferrer">shanmukpatnala</a></p></div>
          </div>
        </section>
      </main>

      <footer className="site-footer"><div className="container">© 2026 {shortName}. Built with passion and code.</div></footer>
    </div>
  )
}
