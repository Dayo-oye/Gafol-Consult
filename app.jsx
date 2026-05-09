const { useState, useEffect, useRef } = React;

// Services Details
const servicesData = [
  { id: 1, title: "Audit", description: "Thorough, independent audits to ensure transparency and compliance.", icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" },
  { id: 2, title: "Accounting", description: "Accurate bookkeeping and financial reporting for informed decisions.", icon: "M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" },
  { id: 3, title: "Taxation", description: "Strategic tax planning and compliance to optimize liabilities.", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" },
  { id: 4, title: "Advisory", description: "Expert financial guidance to drive growth and operational efficiency.", icon: "M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" },
  { id: 5, title: "Recovery", description: "Debt recovery and strategic asset tracing for robust cash flow.", icon: "M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" },
  { id: 6, title: "Training", description: "Capacity building and comprehensive financial literacy workshops.", icon: "M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" },
];

// Why Partner Data
const whyPartnerData = [
  { title: "Audit Excellence", desc: "We uphold the highest standard across all engagements to deliver reliable and unbiased reports." },
  { title: "Deep Industry Knowledge", desc: "Our extensive experience across sectors enables us to understand your specific business challenges." },
  { title: "Strong Methodology", desc: "We apply proven audit techniques and international best practices for rigorous evaluations." },
  { title: "Actionable Recommendations", desc: "Beyond findings, we provide practical, modern solutions that propel overall performance." },
  { title: "Confidentiality Ensure", desc: "Your sensitive data and long-term trust are handled with utmost confidentiality and integrity." },
  { title: "Timely Delivery", desc: "We respect strict deadlines and consistently deliver high-quality, actionable reports on schedule." }
];

// --- Custom Hooks ---
function useScrollReveal() {
  const ref = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal-visible');
          // Optional: observer.unobserve(entry.target) to animate only once
        }
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) observer.unobserve(ref.current);
    };
  }, []);
  return ref;
}

// --- Components ---
const Reveal = ({ children, direction = 'up', delay = 0, className = '' }) => {
  const ref = useScrollReveal();
  const directionClass = direction === 'up' ? 'reveal-up' : direction === 'left' ? 'reveal-left' : 'reveal-right';
  return (
    <div
      ref={ref}
      className={`reveal-wrapper ${directionClass} ${className}`}
      style={{ '--delay': `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const IconSVG = ({ path, className = "w-6 h-6" }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d={path} />
  </svg>
);

const ServiceCard = ({ title, description, iconPath }) => {
  return (
    <div className="premium-card bg-white rounded-2xl p-8 border border-slate-100 shadow-sm relative overflow-hidden group h-full flex flex-col justify-between z-10">
      <div className="absolute top-0 right-0 p-32 bg-sky/5 rounded-bl-full -mr-16 -mt-16 transition-transform group-hover:scale-110 z-0 pointer-events-none"></div>
      <div className="relative z-10">
        <div className="icon-wrapper w-14 h-14 bg-sky/10 rounded-xl flex items-center justify-center text-sky mb-6">
          <IconSVG path={iconPath} className="w-7 h-7" />
        </div>
        <h3 className="text-xl font-display font-bold text-navy mb-3">{title}</h3>
        <p className="text-slate-600 leading-relaxed text-sm">{description}</p>
      </div>
      <div className="relative z-10 mt-6 pt-6 border-t border-slate-100">
        <a href="#" className="inline-flex items-center text-sky font-semibold text-sm hover:text-sky-hover transition-colors group-hover:translate-x-1 duration-300">
          Learn more 
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  );
};

// --- App ---
const App = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="overflow-hidden">
      {/* Header */}
      <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'glass-nav py-3' : 'bg-transparent py-5'}`}>
        <div className="container-custom">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3 cursor-pointer">
              <div className="w-10 h-10 bg-sky rounded-xl flex items-center justify-center font-display font-black text-white text-xl shadow-lg shadow-sky/30">
                G
              </div>
              <div>
                <h1 className="text-base lg:text-lg font-display font-bold text-navy tracking-tight leading-tight">OLUYAMO GABRIEL & CO.</h1>
                <p className="text-xs text-sky font-medium uppercase tracking-wider">Chartered Accountants</p>
              </div>
            </div>
            
            <nav className="hidden md:flex items-center gap-8">
              {['Home', 'Services', 'Why Us', 'Contact'].map((item) => (
                <a key={item} href="#" className="text-sm font-semibold text-slate-600 hover:text-sky transition-colors">
                  {item}
                </a>
              ))}
            </nav>
            
            <button className="btn-primary bg-navy text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:shadow-lg transition-all hidden sm:block">
              Get in Touch
            </button>
          </div>
        </div>
      </header>

      <main>
        {/* Modern Hero Section */}
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32">
          {/* Animated background blobs */}
          <div className="blob-shape bg-sky/30 w-96 h-96 top-0 left-10 animate-blob"></div>
          <div className="blob-shape bg-accent/20 w-[30rem] h-[30rem] bottom-0 right-10 animate-blob" style={{ animationDelay: '2s' }}></div>
          
          <div className="container-custom relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 lg:gap-8 items-center">
              <Reveal direction="left">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-sm border border-slate-200 text-sky font-semibold text-[0.8rem] tracking-wide mb-8">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sky"></span>
                  </span>
                  EMPOWERING YOUR SUCCESS
                </div>
                
                <h1 className="text-5xl md:text-6xl lg:text-[4.5rem] font-display font-black text-navy leading-[1.1] mb-6 tracking-tight">
                  Trusted Financial <br />
                  <span className="text-gradient">Assurance.</span>
                </h1>
                
                <p className="text-lg text-slate-600 mb-10 max-w-xl leading-relaxed">
                  Independent. Insightful. Impactful. We deliver accurate, objective and timely financial assurance to drive sustainable growth.
                </p>
                
                <div className="flex flex-wrap items-center gap-4">
                  <button className="btn-primary bg-sky text-white px-8 py-4 rounded-full font-semibold shadow-xl shadow-sky/20 hover:shadow-sky/40 transition-all flex items-center gap-2">
                    Start Consultation 
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                  </button>
                  <button className="px-8 py-4 rounded-full font-semibold text-navy bg-white border border-slate-200 hover:border-sky hover:text-sky transition-all shadow-sm">
                    View Services
                  </button>
                </div>
              </Reveal>
              
              <Reveal direction="right" delay={200} className="relative mt-8 lg:mt-0">
                <div className="relative mx-auto lg:ml-auto max-w-[320px] lg:max-w-md animate-float" style={{ animationDuration: '8s' }}>
                  {/* Headshot Card */}
                  <div className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border-[6px] border-white aspect-[3/4] bg-gradient-to-br from-navy to-sky">
                    <img 
                      src="https://ui-avatars.com/api/?background=2C9CD4&color=fff&size=500&bold=true&name=Gabriel+Oluyamo&length=2" 
                      alt="Gabriel Oluyamo" 
                      className="w-full h-full object-cover mix-blend-screen opacity-90 grayscale shadow-inner"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-transparent to-transparent"></div>
                  </div>
                  
                  {/* Floating Stats Badges */}
                  <div className="absolute -bottom-8 -left-4 md:-left-8 glass-card p-4 rounded-2xl flex items-center gap-4 shadow-xl z-20 hover:-translate-y-1 transition-transform">
                    <div className="bg-sky text-white w-12 h-12 rounded-xl flex items-center justify-center font-display font-bold text-xl shadow-inner">
                      20+
                    </div>
                    <div>
                      <p className="text-sm font-bold text-navy font-display">Years</p>
                      <p className="text-xs text-slate-500 font-medium">Experience</p>
                    </div>
                  </div>
                  
                  <div className="absolute top-12 -right-4 glass-card px-4 py-3 rounded-2xl flex items-center gap-3 shadow-xl z-20 hover:-translate-y-1 transition-transform border border-white/40">
                    <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-navy font-display">Certified</p>
                      <p className="text-[10px] text-slate-500 font-medium">Excellence</p>
                    </div>
                  </div>
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-24 bg-white relative">
          <div className="container-custom">
            <Reveal direction="up" className="text-center max-w-2xl mx-auto mb-16">
              <span className="text-sm font-bold text-sky uppercase tracking-widest">What We Offer</span>
              <h2 className="text-4xl lg:text-5xl font-display font-bold text-navy mt-4 mb-6">Our Core Services</h2>
              <p className="text-slate-600 text-lg">We help businesses and individuals navigate complex financial landscapes with confidence and total clarity.</p>
            </Reveal>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {servicesData.map((service, index) => (
                <Reveal key={service.id} direction="up" delay={index * 100}>
                  <ServiceCard title={service.title} description={service.description} iconPath={service.icon} />
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Value Pillars (Modernized) */}
        <section className="py-24 bg-slate-50 relative border-t border-slate-100">
          <div className="container-custom">
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: "Professional Solutions", desc: "We deliver accurate, objective and timely financial assurance.", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" },
                { title: "Risk-based Insights", desc: "Identify risks to strengthen controls and dramatically improve transparency.", icon: "M13 10V3L4 14h7v7l9-11h-7z" },
                { title: "Sustainable Value", desc: "Build systems and strategic guidance that drive long-term business value.", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" }
              ].map((pillar, index) => (
                <Reveal key={index} direction="up" delay={index * 150}>
                  <div className="text-center group p-8">
                    <div className="w-20 h-20 mx-auto rounded-2xl bg-white shadow-sm border border-slate-100 flex items-center justify-center text-navy mb-6 group-hover:-translate-y-2 transition-transform duration-300">
                      <IconSVG path={pillar.icon} className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-display font-bold text-navy mb-3">{pillar.title}</h3>
                    <p className="text-slate-600 leading-relaxed text-sm">{pillar.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        {/* Why Partner - Dark Premium Mode */}
        <section className="py-24 bg-navy relative overflow-hidden">
          {/* Subtle grid pattern background */}
          <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.4) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>
          
          <div className="container-custom relative z-10">
            <Reveal direction="up" className="mb-16">
              <h2 className="text-4xl lg:text-5xl font-display font-bold text-white mb-6">Why Partner With Us</h2>
              <div className="w-24 h-1.5 bg-sky rounded-full"></div>
            </Reveal>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {whyPartnerData.map((item, index) => (
                <Reveal key={index} direction="up" delay={index * 100}>
                  <div className="glass-dark rounded-2xl p-8 hover:-translate-y-2 transition-all duration-300 h-full border border-white/10 hover:border-sky/40 hover:shadow-2xl hover:shadow-sky/10">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-xl bg-sky/20 flex items-center justify-center text-sky shrink-0">
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <div>
                        <h3 className="text-lg font-display font-bold text-white mb-2">{item.title}</h3>
                        <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* Modern Footer */}
      <footer className="bg-navy-light pt-20 pb-10 border-t border-white/5">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
            <div className="lg:col-span-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 bg-sky rounded-lg flex items-center justify-center font-display font-black text-white text-sm">
                  G
                </div>
                <h3 className="text-xl font-display font-bold text-white">GAFOL <span className="font-light opacity-80 text-sm pl-1">Consult</span></h3>
              </div>
              <p className="text-slate-400 text-sm leading-relaxed mb-8">
                Solution Providers — Empowering businesses through accurate accounting and strategic advisory since inception.
              </p>
              <div className="flex gap-4">
                {/* Social Placeholders */}
                {['twitter', 'linkedin', 'facebook'].map((soc) => (
                  <div key={soc} className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-slate-300 hover:bg-sky hover:text-white transition-all cursor-pointer">
                    <span className="text-xs font-bold">{soc[0].toUpperCase()}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-white font-display font-bold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {['Audit Services', 'Tax Advisory', 'Accounting Outsourcing', 'Recovery Solutions'].map(link => (
                  <li key={link}>
                    <a href="#" className="text-slate-400 text-sm hover:text-sky transition-colors flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-sky/50"></span>
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="text-white font-display font-bold mb-6">Contact Us</h4>
              <ul className="space-y-4 text-slate-400 text-sm">
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-sky shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                  <span>08035364070</span>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-sky shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                  <div className="flex flex-col gap-1">
                    <a href="mailto:gafoglobalconsult@gmail.com" className="hover:text-white transition-colors">gafoglobalconsult@gmail.com</a>
                    <a href="mailto:oluyamogabrielco@gmail.com" className="hover:text-white transition-colors">oluyamogabrielco@gmail.com</a>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <svg className="w-5 h-5 text-sky shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
                  <span>3/5, Charity road, oko oba,<br/>abule egba, Lagos</span>
                </li>
              </ul>
            </div>

            <div className="lg:col-span-1">
              <h4 className="text-white font-display font-bold mb-6">Ready to Grow?</h4>
              <p className="text-slate-400 text-sm mb-6">Let's discuss how we can empower your business with trusted assurance.</p>
              <button className="btn-primary bg-sky w-full text-white px-6 py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-sky/20 transition-all flex justify-center items-center gap-2">
                Get a Proposal
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
              </button>
            </div>
          </div>
          
          <div className="pt-8 border-t border-white/10 text-center flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-slate-500 text-xs">
              © 2026 OLUYAMO GABRIEL & CO. All rights reserved.
            </p>
            <p className="text-slate-500 flex gap-4 text-xs font-medium">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Render the application properly for React 18 Standalone
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);