// Initial website content, copied verbatim from the hardcoded pages in
// gsg-website/web so the site looks the same once it reads from the API.

export const settings = {
  churchName: 'God Seeking Generation',
  shortName: 'GSG',
  tagline: "Seeing God's glory restored in the Body of Christ",
  visionStatement:
    'To see the Glory of God restored and manifested in the Body of Christ.',
  aboutSummary:
    "God Seeking Generation is a registered non-denominational Christian ministry headquartered at Obomeng-Kwahu, Ghana. Founded by Reverend James Attah alongside ministers from diverse denominations, we are united by one mission — to seek the LORD's face, save the lost, and manifest His glory in this generation.",
  email: 'godseekinggeneration01@gmail.com',
  phones: ['+233 24 330 3897', '+233 54 969 9001', '+233 55 952 5262'],
  address: 'Obomeng-Kwahu, Eastern Region, Ghana',
  poBox: 'P.O. Box AN 7933, Obomeng-Kwahu',
  registrationNumber: 'G-33,926',
  foundedOn: new Date('2010-10-05T00:00:00.000Z'),
  founderName: 'Rev. James Attah',
  nationalCoordinator: 'Mr. Emmanuel G. Koranteng',
  liveServiceUrl: 'https://gsg.online.church/',
  devotionalsUrl: 'https://devotional-amber.vercel.app/',
  mapEmbedUrl:
    'https://www.google.com/maps?q=Obomeng+Kwahu+Eastern+Region+Ghana&output=embed',
  givingContactEmail: 'godseekinggeneration01@gmail.com',
  logoUrl: '/GSG.png',
};

// Facebook / Instagram / Twitter icons exist on the site but have no URLs yet.
export const socialLinks = [
  { platform: 'youtube', label: 'YouTube', url: 'http://www.youtube.com/@jamesattah' },
];

export const stats = [
  { label: 'Founded', value: '2010', showOnHome: true, showOnGive: true },
  { label: 'Branches', value: '8+', showOnHome: true, showOnGive: true },
  { label: 'Denominations', value: '5+', showOnHome: true, showOnGive: true },
  { label: 'Years of Ministry', value: '15+', showOnHome: false, showOnGive: true },
];

export const heroSlides = [
  {
    mediaType: 'IMAGE' as const,
    mediaUrl: '/caro4.jpg',
    title: "Seeking God's Face",
    subtitle:
      'A registered non-denominational Christian ministry headquartered at Obomeng-Kwahu, Ghana — united by one mission since 2010.',
    primaryCtaLabel: 'Our Story',
    primaryCtaHref: '/about/history',
    secondaryCtaLabel: 'Find a Branch',
    secondaryCtaHref: '/about/branches',
  },
  {
    mediaType: 'IMAGE' as const,
    mediaUrl: '/caro6.jpg',
    title: 'New Dimensions of Worship',
    subtitle:
      "Encounter God's presence through spirit-filled worship, heartfelt prayer, and teachings that equip the saints for every good work.",
    primaryCtaLabel: 'Find a Branch',
    primaryCtaHref: '/about/branches',
    secondaryCtaLabel: 'Our Mission',
    secondaryCtaHref: '/about/mission',
  },
  {
    mediaType: 'IMAGE' as const,
    mediaUrl: '/caro8.jpg',
    title: 'Reaching the Lost',
    subtitle:
      'Through outreach, tract sharing, camp meetings, and one-on-one evangelism, GSG is bringing the Gospel to communities across Ghana.',
    primaryCtaLabel: 'Our Activities',
    primaryCtaHref: '/departments',
    secondaryCtaLabel: 'Get Involved',
    secondaryCtaHref: '/contact',
  },
  {
    mediaType: 'VIDEO' as const,
    mediaUrl: '/videos/SOTW.mp4',
    title: 'Word of the Season',
    subtitle:
      "Grow in faith through the revelation of God's Word and the ministry of the Holy Spirit — equipping and perfecting the saints.",
    primaryCtaLabel: 'Upcoming Events',
    primaryCtaHref: '/events',
    secondaryCtaLabel: 'Give',
    secondaryCtaHref: '/give',
  },
];

export const branches = [
  {
    name: 'Headquarters',
    slug: 'headquarters',
    fullName: 'Obomeng-Kwahu (HQ)',
    location: 'Eastern Region',
    description:
      'The founding home of God Seeking Generation, established on October 5, 2010. All national leadership and the Board of Patrons operate from the Obomeng-Kwahu headquarters.',
    accent: 'bg-primary',
    phone: '+233 24 330 3897',
    isHeadquarters: true,
    showOnContact: false,
  },
  {
    name: 'Zion',
    slug: 'zion',
    fullName: 'Zion – KNUST Campus',
    location: 'Kumasi',
    description:
      'A vibrant campus-based fellowship at KNUST, bringing together students in worship, prayer, and outreach. A centre of spiritual awakening for the next generation of leaders.',
    accent: 'bg-blue-500',
    phone: '+233 55 952 5262',
  },
  {
    name: 'Bethel',
    slug: 'bethel',
    fullName: 'Bethel – Gaza',
    location: 'Kumasi',
    description:
      "Located in the Gaza area of Kumasi, Bethel serves its community through fellowship, outreach, and practical support, embodying the spirit of God's dwelling among the people.",
    accent: 'bg-[#722F37]',
    phone: '+233 55 642 9544',
  },
  {
    name: 'Adullam',
    slug: 'adullam',
    fullName: 'Adullam – Ayeduase',
    location: 'Kumasi',
    description:
      'Serving the Ayeduase community, Adullam is a refuge for all who seek God — a place of strength, fellowship, and transformative outreach in its neighbourhood.',
    accent: 'bg-emerald-500',
    phone: '+233 55 861 5167',
  },
  {
    name: 'New Jerusalem',
    slug: 'new-jerusalem',
    fullName: 'New Jerusalem – Bomso',
    location: 'Kumasi',
    description:
      'Situated in Bomso, New Jerusalem is committed to spreading hope and the Gospel through conventions, prayer, and one-on-one evangelism among its residents.',
    accent: 'bg-[#8B4513]',
    phone: '+233 59 205 4043',
  },
  {
    name: 'Asafo Fellowship',
    slug: 'asafo-fellowship',
    fullName: 'Asafo Fellowship',
    location: 'Kumasi',
    description:
      'The Asafo Fellowship gathers believers from across the Asafo area of Kumasi, providing a consistent space for worship, teaching, and community outreach.',
    accent: 'bg-orange-500',
    phone: '+233 55 390 4808',
  },
  {
    name: 'UHAS Fellowship',
    slug: 'uhas-fellowship',
    fullName: 'UHAS Fellowship – Ho',
    location: 'Ho, Volta Region',
    description:
      'God Seeking Generation at the University of Health and Allied Sciences, nurturing a community of healthcare students and professionals united in faith and calling.',
    accent: 'bg-violet-500',
    phone: '+233 20 265 8447',
  },
  {
    name: 'New Abirem',
    slug: 'new-abirem',
    fullName: 'New Abirem Fellowship',
    location: 'Eastern Region',
    description:
      "Serving the New Abirem community in the Eastern Region, this fellowship carries forward GSG's founding mission of seeking God's face and reaching the lost.",
    accent: 'bg-green-600',
    phone: null,
    showOnContact: false,
  },
];

export const leaders = [
  // /about/leadership — key leaders
  {
    group: 'LEADERSHIP' as const,
    name: 'Rev. James Attah',
    role: 'Founder',
    bio: 'Reverend James Attah is the founder of God Seeking Generation and Head Pastor of New Birth Church, Obomeng-Kwahu. He established the ministry on October 5, 2010 with a vision to see the glory of God restored and manifested in the Body of Christ.',
    imageUrl: '/images/psJames.jpg',
    phone: '+233 24 330 3897',
  },
  {
    group: 'LEADERSHIP' as const,
    name: 'Elvis A. Asiedu',
    role: 'Administrator',
    bio: 'Elvis serves as the National Administrator — the chief operational officer of GSG. He mediates between the Board of Patrons and all branches, executes board policies, and oversees day-to-day operations across the ministry.',
    imageUrl: '/images/psElvis.jpg',
    phone: '+233 55 952 5262',
  },
  {
    group: 'LEADERSHIP' as const,
    name: 'Kwaah Ernest',
    role: 'Kumasi Zonal President',
    bio: 'Ernest coordinates all GSG branches within the Kumasi Zone, consolidating reports, mobilising members, and planning region-wide programmes to strengthen the ministry across the Ashanti Region.',
    imageUrl: '/images/psErnest.jpg',
    phone: '+233 59 205 4043',
  },
  // Board of patrons
  ...[
    ['Rev. James Attah', 'Founder & Board Member'],
    ['Rev. Bernard Ameyaw', 'Patron'],
    ['Rev. Alexander Gyampoh', 'Patron'],
    ['Pastor Anyei Darko', 'Patron'],
    ['Lady Pastor Obenewaa', 'Patron'],
    ['Mr. Henry Kwaku Boafo', 'Patron'],
    ['Dr. Emmanuel Odame Owiredu', 'Patron'],
    ['Mr. Emmanuel Gyimah Koranteng', 'National Coordinator'],
  ].map(([name, role]) => ({ group: 'PATRON' as const, name, role })),
  // Contact page — national leadership directory
  ...[
    ['Rev. James Attah', 'Founder', '+233 24 330 3897'],
    ['Mr. Henry K. Boafo', 'Patron', '+233 20 766 0005'],
    ['Dr. Emmanuel O. Owiredu', 'Patron', '+233 54 255 8774'],
    ['Mr. Emmanuel G. Koranteng', 'National Coordinator', '+233 54 969 9001'],
    ['Elvis A. Asiedu', 'Administrator', '+233 55 952 5262'],
  ].map(([name, role, phone]) => ({ group: 'DIRECTORY' as const, name, role, phone })),
];

export const departments = [
  {
    name: 'Prayer Ministry',
    slug: 'prayer-ministry',
    icon: 'Music',
    description:
      'Prayer is the foundation of GSG. Through Prayer Buffets (all-day prayer marathons), Prayer Walks across neighbourhoods, and dedicated intercession groups, we stand in the gap for individuals, families, and communities.',
    activity: 'Prayer Buffet & Prayer Walk',
    leadName: 'Rev. James Attah',
  },
  {
    name: 'Outreach & Evangelism',
    slug: 'outreach-evangelism',
    icon: 'HandHeart',
    description:
      "Reaching out with the Word of God, prayer, and support for material needs is at the heart of GSG's mission. Through field outreach, one-on-one witnessing, and community service, we spread hope and demonstrate Christ's love.",
    activity: 'Field Outreach & Witnessing',
    leadName: 'Zonal Mobilisers',
  },
  {
    name: 'Conventions & Gatherings',
    slug: 'conventions-gatherings',
    icon: 'GraduationCap',
    description:
      'We cherish the fellowship of believers. Our conventions provide opportunities to gather in unity, strengthening faith and fostering spiritual growth. These gatherings are a source of inspiration, empowerment, and renewal.',
    activity: 'Weekly & National Conventions',
    leadName: 'National Coordinator',
  },
  {
    name: 'Tract & Media Ministry',
    slug: 'tract-media-ministry',
    icon: 'Share2',
    description:
      'One of our key evangelistic tools is the distribution of spiritually enriching tracts and uplifting messages. These materials reach hearts beyond the pulpit, offering spiritual guidance to those we may never meet in person.',
    activity: 'Tract Sharing & Uplifting Messages',
    leadName: 'Media Team',
  },
  {
    name: 'Camp Meetings',
    slug: 'camp-meetings',
    icon: 'Users2',
    description:
      'Our camp meetings are vibrant, spirit-filled events where we retreat from the busyness of life to focus on prayer, worship, and deep fellowship. These extended sessions provide a powerful space for spiritual growth and reflection.',
    activity: 'Extended Retreat Events',
    leadName: 'Board of Patrons',
  },
  {
    name: 'Administration & Finance',
    slug: 'administration-finance',
    icon: 'Settings',
    description:
      'Operations, branch coordination, financial accountability, and pastoral care are managed by our administration. A semi-annual internal audit ensures transparent stewardship across all branches.',
    activity: 'Mon–Fri, Office Hours',
    leadName: 'Elvis A. Asiedu (Administrator)',
  },
];

export const pageSections = [
  // /about/history
  {
    type: 'HISTORY' as const,
    title: 'The Beginning (2010)',
    icon: 'Clock',
    color: 'bg-blue-500',
    body: "God Seeking Generation was officially registered at the Registrar General's Department on October 5, 2010 (Registration No. G-33,926), headquartered at Obomeng-Kwahu in the Eastern Region of Ghana. The ministry was founded by Reverend James Attah, Head Pastor of New Birth Church, Obomeng-Kwahu, with a burning vision to see the glory of God restored and manifested in the Body of Christ.",
  },
  {
    type: 'HISTORY' as const,
    title: 'Building Bridges Across Denominations',
    icon: 'TrendingUp',
    color: 'bg-emerald-500',
    body: "From its inception, GSG distinguished itself as a non-denominational ministry — a bold and deliberate decision. Reverend Attah gathered a diverse team of like-minded ministers from The Methodist Church Ghana, the Presbyterian Church of Ghana, The Church of Pentecost, and Living Word Restoration. This unity across denominational lines became a hallmark of the ministry's identity and a testament to its core belief in unity in the faith.",
  },
  {
    type: 'HISTORY' as const,
    title: 'Expanding Across Ghana',
    icon: 'Target',
    color: 'bg-amber-500',
    body: 'Starting from its Obomeng-Kwahu headquarters, the ministry grew steadily to establish branches in major cities and campuses across Ghana.',
    listItems: [
      'Zion Branch – KNUST Campus, Kumasi',
      'Bethel Branch – Gaza, Kumasi',
      'Adullam Branch – Ayeduase, Kumasi',
      'New Jerusalem Branch – Bomso, Kumasi',
      'Asafo Fellowship – Kumasi',
      'UHAS Fellowship – Ho, Volta Region',
      'New Abirem Fellowship – Eastern Region',
    ],
  },
  {
    type: 'HISTORY' as const,
    title: 'Seeking God in This Generation',
    icon: 'Rocket',
    color: 'bg-primary',
    body: "Today, God Seeking Generation continues to pursue its founding mission — seeking the LORD's face, saving the lost, equipping the saints, and demonstrating the power of God through signs and wonders. Through outreach, conventions, camp meetings, prayer walks, and one-on-one evangelism, GSG is actively fulfilling the call to bring unity in the faith and in the knowledge of the Son of God.",
  },
  // /about/mission
  ...[
    ["Seek God's Face", 'Search', 'text-primary', "To seek the LORD's face, glory, power and wisdom in our generation — placing prayer and intimacy with God at the centre of all we do."],
    ['Save the Lost', 'Heart', 'text-rose-500', 'To seek and save the lost through outreach, evangelism, tract sharing, and one-on-one witnessing, bringing the Gospel to communities far and near.'],
    ['Equip the Saints', 'BookOpen', 'text-blue-500', "To equip and perfect the saints by the revelation of God's word and the ministry of the Holy Spirit, raising a generation grounded in scripture."],
    ["Demonstrate God's Power", 'Zap', 'text-amber-500', 'To demonstrate the power of the LORD through signs, wonders and miracles to confirm that Jesus is alive and active in this generation.'],
    ['Unity in the Faith', 'Users', 'text-emerald-500', 'To bring about unity in the faith and in the knowledge of the Son of God — bridging denominations and building one body in Christ.'],
  ].map(([title, icon, color, body]) => ({ type: 'MISSION' as const, title, icon, color, body })),
  // Home — core values
  ...[
    ['Faithfulness', 'Shield', 'text-primary', 'We remain steadfast in our commitment to God and His word — reliable, consistent, and true to our promises to God, each other, and our community.'],
    ['Accountability', 'Scale', 'text-blue-500', 'We take responsibility for our actions and decisions. Accountability ensures transparency and integrity, building trust within our congregation and the wider community.'],
    ['Excellence', 'Star', 'text-amber-500', 'We pursue excellence in all our endeavors — striving to give our best in service, worship, and outreach as an expression of our reverence for God.'],
    ['Sacrifice', 'Heart', 'text-rose-500', 'We believe in giving selflessly for the greater good. Sacrifice embodies the spirit of service, putting the needs of others before our own interests.'],
    ['Unity', 'Users', 'text-emerald-500', 'We are committed to building a strong, unified community — celebrating our diversity across denominations while standing together in faith and mutual support.'],
    ['Love', 'HeartHandshake', 'text-red-500', 'Love is the foundation of everything we do. We express love through compassion, kindness, and service to all members of our congregation and beyond.'],
    ['Humility', 'Leaf', 'text-green-600', "We practice humility by recognizing our limitations and remaining open to growth — staying grounded as we journey together in pursuit of God's glory."],
  ].map(([title, icon, color, body]) => ({ type: 'CORE_VALUE' as const, title, icon, color, body })),
];

// Bank details on the live site are placeholders, so only MoMo is seeded.
export const givingMethods = [
  {
    type: 'MOBILE_MONEY' as const,
    provider: 'MTN MoMo',
    accountName: 'God Seeking Generation',
    accountNumber: '+233 24 330 3897',
    instructions: 'Scan QR in person or use the number for transfers.',
  },
  {
    type: 'MOBILE_MONEY' as const,
    provider: 'Telecel Cash',
    accountName: 'God Seeking Generation',
    accountNumber: '+233 54 969 9001',
    instructions: 'Include your name in the reference for easy acknowledgement.',
  },
];

// KNUST semester outline (Zion – KNUST Campus). Times/venues are not yet
// known — update them from the admin panel.
const KNUST = 'KNUST Campus, Kumasi';
export const events = [
  {
    slug: 'knust-smart-start-2026',
    title: 'Smart Start',
    type: 'Fellowship',
    date: '2026-10-15',
    endDate: '2026-10-17',
    description:
      'Kick off the semester the right way. Smart Start welcomes new and continuing students into fellowship at Zion – KNUST Campus with worship, the Word, and connection.',
  },
  {
    slug: 'knust-prayer-buffet-2026',
    title: 'Prayer Buffet',
    type: 'Prayer',
    date: '2026-10-19',
    endDate: '2026-10-23',
    description:
      'A week of Prayer Buffet — our prayer marathon — seeking the face of God together for the semester, our campus, and our nation.',
  },
  {
    slug: 'knust-games-food-bazaar-2026',
    title: 'Games and Food Bazaar',
    type: 'Fellowship',
    date: '2026-11-28',
    endDate: null,
    description:
      'An afternoon of games, food, and fun fellowship. Bring a friend and come and enjoy time together as one family.',
  },
  {
    slug: 'knust-prayer-walk-2027',
    title: 'Prayer Walk',
    type: 'Prayer',
    date: '2027-01-09',
    endDate: null,
    description:
      'Join us as we walk and pray across our neighbourhoods, standing in the gap for individuals, families, and communities.',
  },
  {
    slug: 'knust-special-jesus-2027',
    title: 'Special Jesus',
    type: 'Convention',
    date: '2027-01-13',
    endDate: '2027-01-15',
    description:
      'Three days (Wednesday to Friday) centred on the person of Jesus — worship, the Word, and encounters with His presence.',
  },
  {
    slug: 'knust-camp-meeting-2027',
    title: 'Camp Meeting',
    type: 'Camp Meeting',
    date: '2027-02-13',
    endDate: '2027-02-15',
    description:
      'Our camp meeting — a spirit-filled retreat from the busyness of life to focus on prayer, worship, and deep fellowship.',
  },
].map((event) => ({ ...event, venue: KNUST }));
