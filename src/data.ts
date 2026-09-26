export const person = {
  first: 'Yoobin',
  last: 'Park',
  email: 'yoobspark@gmail.com',
  linkedin: 'https://www.linkedin.com/in/yoobspark',
  github: 'https://github.com/Sparkeeeeey',
}

export const nav = [
  { label: 'Work', href: '#work' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
]

export const socials = [
  { label: 'LinkedIn', href: person.linkedin },
  { label: 'GitHub', href: person.github },
  { label: 'Email', href: `mailto:${person.email}` },
]

export type Media = { src: string; alt: string; caption?: string; video?: boolean; poster?: string }

export type Project = {
  id: string
  title: string
  context: string
  date: string
  team: string
  summary: string
  problem: string
  did: string[]
  result?: string
  skills: string[]
  cover: Media
  gallery: Media[]
}

export const projects: Project[] = [
  {
    id: 'testing-rig',
    title: 'Product Testing Rig',
    context: 'Rifton Equipment · Mechanical Design Intern',
    date: 'May – Aug 2026',
    team: 'Solo project',
    summary:
      'A pneumatic test rig with an integrated load cell that puts medical products through repeatable, controlled loading cycles against industry standards.',
    problem: "Rifton's design lab needed more in-house capability to validate medical products against industry testing standards.",
    did: [
      'Modeled the full rig in SolidWorks, adjustable across multiple axes so it can be set up for different products, then took it through design review with the lead engineer.',
      'Fabricated it with CNC machining, laser cutting and shop tools.',
      'Wired all electronics and pneumatics and integrated a load cell to measure force during testing.',
      'Documented every circuit in TinyCAD wiring diagrams so other engineers can maintain and modify the rig.',
    ],
    skills: ['SolidWorks', 'Design review', 'CNC machining', 'Laser cutting', 'Pneumatics', 'Control wiring', 'Load cell', 'TinyCAD'],
    cover: { src: '/img/rig-hero.webp', alt: 'Completed pneumatic testing rig installed in its frame', caption: 'The finished rig, wired and installed.' },
    gallery: [
      { src: '/img/rig-cad.webp', alt: 'SolidWorks model of the testing rig', caption: 'SolidWorks model, used as the reference and parts list.' },
      { src: '/img/rig-start.webp', alt: 'Early assembly of the rig', caption: 'Early assembly.' },
      { src: '/img/rig-frame.webp', alt: 'Rig mounted in its frame', caption: 'Mounted in the frame.' },
      { src: '/img/rig-wiring.webp', alt: 'TinyCAD pneumatic wiring diagram', caption: 'Pneumatic wiring diagram in TinyCAD.' },
    ],
  },
  {
    id: 'door-closer',
    title: 'Self-Closing Door',
    context: 'Access-control mechanism',
    date: 'Jul – Aug 2026',
    team: 'Solo project',
    summary: 'A piston-actuated closer with a timing relay and limit switch that automatically closes and locks a restricted-access door.',
    problem: 'A restricted room was at risk of being left open and accessible whenever the door was not closed properly.',
    did: [
      'Modeled the mechanism and its mounting in SolidWorks.',
      'Checked fit and motion with a 3D-printed proof of concept before making final parts.',
      'Built a welded mounting bracket and installed a piston-actuated closer with latches.',
      'Used a timing relay and limit switch so the door closes and locks automatically after a set interval.',
    ],
    result: 'The room can no longer be left accessible by accident.',
    skills: ['SolidWorks', 'Rapid prototyping', '3D printing', 'Fabrication', 'Pneumatics', 'Relay logic'],
    cover: { src: '/img/door-closing.mp4', alt: 'Video of the door closing automatically', caption: 'The closer in action.', video: true, poster: '/img/door-final.webp' },
    gallery: [
      { src: '/img/door-cad2.webp', alt: 'SolidWorks assembly of the door closer', caption: 'SolidWorks assembly.' },
      { src: '/img/door-proto.webp', alt: '3D-printed proof of concept', caption: '3D-printed proof of concept.' },
      { src: '/img/door-bracket.webp', alt: 'Welded mounting bracket', caption: 'Welded mounting bracket.' },
      { src: '/img/door-final.webp', alt: 'Installed door closer', caption: 'Installed.' },
    ],
  },
  {
    id: 'air-motor',
    title: 'Air-Powered Motor',
    context: 'Machining project',
    date: '',
    team: 'Solo project',
    summary: 'A two-stroke pneumatic motor with every part machined on a Bridgeport manual mill and a lathe.',
    problem: 'The parts needed tight tolerances to seal and run smoothly on compressed air.',
    did: [
      'Machined every component on a Bridgeport manual mill and a lathe.',
      'Held tight tolerances through careful setup, measurement and fitting.',
      'Assembled and tuned the motor until it ran.',
    ],
    skills: ['Manual milling', 'Lathe', 'Precision measurement', 'Tolerancing', 'Assembly'],
    cover: { src: '/img/motor-quarter.webp', alt: 'Assembled pneumatic motor', caption: 'The assembled motor.' },
    gallery: [
      { src: '/img/motor-parts.webp', alt: 'Machined motor parts before assembly', caption: 'All machined parts, before assembly.' },
      { src: '/img/motor-front.webp', alt: 'Front view of the motor', caption: 'Front view.' },
      { src: '/img/motor-back.webp', alt: 'Back view of the motor', caption: 'Back view.' },
      { src: '/img/motor-side.webp', alt: 'Side view of the motor', caption: 'Side view.' },
    ],
  },
]

export const experience = [
  {
    years: '2026',
    org: 'Rifton Equipment',
    role: 'Mechanical Design Intern',
    place: 'Rifton, NY',
    points: [
      'Designed in SolidWorks and fabricated a modular, adjustable rig to test medical equipment against industry standards.',
      'Built and integrated a pneumatic piston system with a load cell to measure force during testing.',
      'Wired pneumatic control electronics for repeatable test cycles and documented every circuit in TinyCAD.',
    ],
  },
  {
    years: '2025',
    org: 'Community Playthings',
    role: 'Manufacturing Intern',
    place: 'Esopus, NY',
    points: [
      'Redesigned the packaging and shipping method for a product, cutting packaging cost 15% after testing and validation.',
      'Worked across assembly, quality inspection and shipping/logistics.',
    ],
  },
  {
    years: '2024 – 2025',
    org: 'Play Ideas Robotics',
    role: 'Robotics Coach',
    place: 'Manhattan, NY',
    points: [
      'Taught mechanical design, CAD, C++ and control systems to student cohorts.',
      'Mentored students through the full robot design cycle, from CAD to system integration.',
    ],
  },
]

export const extras = {
  education: {
    school: 'The City College of New York, Grove School of Engineering',
    degree: 'B.E. Mechanical Engineering',
    years: '2024 – 2028',
    clubs: 'Baja SAE · AIAA · Robotics · ASME',
  },
  award: {
    title: 'VEX Robotics — New York State Champions',
    detail: 'Team captain, design lead and programmer. 2nd worldwide out of 5,000+ teams.',
    year: '2024',
  },
  skills: [
    { group: 'CAD & design', items: 'SolidWorks, Onshape, Fusion 360, Inventor, GD&T, DFM' },
    { group: 'Fabrication', items: 'CNC & manual milling, lathe, laser cutting, 3D printing, tube fabrication' },
    { group: 'Systems', items: 'Pneumatics, control wiring, load cells, TinyCAD' },
    { group: 'Programming', items: 'C++, Python, MATLAB, Java' },
  ],
}
