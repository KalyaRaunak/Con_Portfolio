export interface FilterProject {
  id: string;
  title: string;
  category: string; // matches filter: "Website" | "Branding" | "AI Creative" | "Marketing" | "Automation"
  service: string;
  image: string;
  video?: string;
  slides?: string[];
  isReel?: boolean;
  link?: string;
}

export interface FeaturedProject {
  id: string;
  name: string;
  industry: string;
  services: string[];
  year: string;
  description: string;
  image: string;
  video?: string;
  slides?: string[];
  link: string;
  layout: "left" | "right";
  isReel?: boolean;
}

export const FEATURED_PROJECTS: FeaturedProject[] = [
  {
    id: "ocean-blue",
    name: "Ocean Blue Education",
    industry: "Education",
    services: ["Website Design", "Branding"],
    year: "2025",
    description: "A premium coaching portal built with tailored curriculum maps, conversion layouts, and a strict oceanic typography system. Delivering accessible, high-performance learning resources.",
    image: "/assets/Webiste_cover_images/ocean_blue_cover.png",
    video: "/videos/ocean-blue.mp4",
    link: "https://www.oceanblueeducation.com/",
    layout: "left"
  },
  {
    id: "velunor",
    name: "Velunor",
    industry: "Branding",
    services: ["Packaging", "Brand Identity"],
    year: "2025",
    description: "Premium packaging, visual identity system, and immersive sensory storytelling layouts for an artisanal fragrance house, blending raw elements with high-end editorial design.",
    image: "/assets/velunor-ig/slide-1.png",
    slides: [
      "/assets/velunor-ig/slide-1.png",
      "/assets/velunor-ig/slide-2.png",
      "/assets/velunor-ig/slide-3.png",
      "/assets/velunor-ig/slide-4.png",
      "/assets/velunor-ig/slide-5.png",
      "/assets/velunor-ig/slide-6.png",
      "/assets/velunor-ig/slide-7.png"
    ],
    link: "https://www.instagram.com/convergedigitals?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    layout: "right"
  },
  {
    id: "nilgiri",
    name: "Nilgiri Co.",
    industry: "Beverage & Wellness",
    services: ["E-Commerce", "Branding"],
    year: "2025",
    description: "A premium organic tea brand experience highlighting direct-from-source agricultural transparency, custom flavor profiling interfaces, and earthy color palettes.",
    image: "/assets/Webiste_cover_images/nilgiri_cover.png",
    video: "/videos/nilgiri.mp4",
    link: "https://nilgiri-co.vercel.app/",
    layout: "left"
  },
  {
    id: "converge-cut",
    name: "Converge Cut",
    industry: "AI Creative",
    services: ["AI Video", "Motion Graphics"],
    year: "2025",
    description: "A hyper-dynamic motion design campaign and AI-augmented creative reels, built to hook attention and redefine sensory visual experiences.",
    image: "/images/one8_sports.png",
    video: "/assets/videos/Converge_cut.mp4",
    link: "https://www.instagram.com/convergedigitals?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw==",
    layout: "right",
    isReel: true
  }
];

export const PROJECTS: FilterProject[] = [
  {
    id: "ocean-blue",
    title: "Ocean Blue Education",
    category: "Website",
    service: "Coaching Institute Web & Ad Campaigns",
    image: "/assets/Webiste_cover_images/ocean_blue_cover.png",
    video: "/videos/ocean-blue.mp4",
    link: "https://www.oceanblueeducation.com/"
  },
  {
    id: "stheer-uk",
    title: "STHEER UK",
    category: "Website",
    service: "Digital Solutions & UI Architecture",
    image: "/assets/Webiste_cover_images/stheer cover.png",
    video: "/videos/stheer-demo.mp4",
    link: "https://stheer-main.vercel.app/"
  },
  {
    id: "mahesh-masala",
    title: "Mahesh Masala",
    category: "Website",
    service: "Spices Brand Identity & Store",
    image: "/assets/Webiste_cover_images/mahesh_masala_cover.png",
    video: "/videos/mahesh-masala.mp4",
    link: "https://www.maheshmasalagruhudhyog.com/"
  },
  {
    id: "vns-hostel",
    title: "VNS Hostel",
    category: "Website",
    service: "Student Accommodation Booking Platform",
    image: "/assets/Webiste_cover_images/VnNS_cover.png",
    video: "/videos/vns-hostel.mp4",
    link: "https://vns-tau.vercel.app/"
  },
  {
    id: "enki",
    title: "ENKI",
    category: "Website",
    service: "Organic Mushroom Branding & Design",
    image: "/assets/Webiste_cover_images/enki_cover.png",
    video: "/videos/enki.mp4",
    link: "https://enki-bay.vercel.app/"
  },
  {
    id: "nilgiri",
    title: "Nilgiri Co.",
    category: "Website",
    service: "Premium Tea E-Commerce Platform",
    image: "/assets/Webiste_cover_images/nilgiri_cover.png",
    video: "/videos/nilgiri.mp4",
    link: "https://nilgiri-co.vercel.app/"
  },
  {
    id: "the-mist",
    title: "THE MIST",
    category: "Website",
    service: "Luxury Fragrance Digital Showcase",
    image: "/assets/Webiste_cover_images/mist_cover.png",
    video: "/videos/the-mist.mp4",
    link: "https://mist-blush.vercel.app/"
  },
  {
    id: "kunj-infra-logo",
    title: "Kunj Infra Logo",
    category: "Branding",
    service: "Infrastructure Brand Identity",
    image: "/images/kunj_infra_logo.png",
    slides: [
      "/assets/kunj-infra---logo/slide-1.png",
      "/assets/kunj-infra---logo/slide-2.png",
      "/assets/kunj-infra---logo/slide-3.png",
      "/assets/kunj-infra---logo/slide-4.png"
    ]
  },
  {
    id: "enki-logo",
    title: "ENKI Logo",
    category: "Branding",
    service: "Organic Apothecary Brand Identity",
    image: "/images/enki_logo.png",
    slides: [
      "/assets/Enki_carousal_logo/slide_1.mp4",
      "/assets/Enki_carousal_logo/slide_2.jpg",
      "/assets/Enki_carousal_logo/slide_3.jpg",
      "/assets/Enki_carousal_logo/slide_4.jpg"
    ]
  },
  {
    id: "velunor-brand",
    title: "Velunor",
    category: "Branding",
    service: "Luxury Fragrance Package Design",
    image: "/images/velunor_perfume.png",
    slides: [
      "/assets/velunor-ig/slide-1.png",
      "/assets/velunor-ig/slide-2.png",
      "/assets/velunor-ig/slide-3.png",
      "/assets/velunor-ig/slide-4.png",
      "/assets/velunor-ig/slide-5.png",
      "/assets/velunor-ig/slide-6.png",
      "/assets/velunor-ig/slide-7.png"
    ]
  },
  {
    id: "velunor-blue",
    title: "Velunor Blue",
    category: "Branding",
    service: "Oceanic Fragrance Bottle Design",
    image: "/images/velunor_blue.png",
    slides: [
      "/assets/blue-velunor/slide-1.png",
      "/assets/blue-velunor/slide-2.png",
      "/assets/blue-velunor/slide-3.png",
      "/assets/blue-velunor/slide-4.png",
      "/assets/blue-velunor/slide-5.png",
      "/assets/blue-velunor/slide-6.png",
      "/assets/blue-velunor/slide-7.png"
    ]
  },
  {
    id: "velunor-red",
    title: "Velunor Red",
    category: "Branding",
    service: "Crimson Fragrance Bottle Design",
    image: "/images/velunor_red.png",
    slides: [
      "/assets/red-vel/slide-1.png",
      "/assets/red-vel/slide-2.png",
      "/assets/red-vel/slide-3.png",
      "/assets/red-vel/slide-4.png",
      "/assets/red-vel/slide-5.png",
      "/assets/red-vel/slide-6.png",
      "/assets/red-vel/slide-7.png"
    ]
  },
  {
    id: "watch-poster",
    title: "Watch Poster",
    category: "Branding",
    service: "Chronograph Advertising Campaign",
    image: "/images/watch_poster.png",
    slides: [
      "/assets/standalone/watch ad 1.jpeg",
      "/assets/standalone/Watch ad.jpeg"
    ]
  },
  {
    id: "jwel-showcase",
    title: "Jwel Showcase",
    category: "Branding",
    service: "Luxury Jewelry Digital Layouts",
    image: "/images/jwel_showcase.png",
    slides: [
      "/assets/jwel-cd/slide-1.png",
      "/assets/jwel-cd/slide-2.png",
      "/assets/jwel-cd/slide-3.png",
      "/assets/jwel-cd/slide-4.png",
      "/assets/jwel-cd/slide-5.png",
      "/assets/jwel-cd/slide-6.png",
      "/assets/jwel-cd/slide-7.png",
      "/assets/jwel-cd/slide-8.png"
    ]
  },
  {
    id: "scoope-brand",
    title: "Scoope",
    category: "Branding",
    service: "Artisanal Ice Cream Branding",
    image: "/images/scoope_icecream.png",
    slides: [
      "/assets/scoope-ig/slide-1.png",
      "/assets/scoope-ig/slide-2.png",
      "/assets/scoope-ig/slide-3.png",
      "/assets/scoope-ig/slide-4.png",
      "/assets/scoope-ig/slide-5.png",
      "/assets/scoope-ig/slide-6.png",
      "/assets/scoope-ig/slide-7.png"
    ]
  },
  {
    id: "nilgiri-brand",
    title: "Nilgiri.co",
    category: "Branding",
    service: "Organic Tea Packaging & Identity",
    image: "/images/nilgiri_co.png",
    slides: [
      "/assets/nilgiri-co/slide-1.png",
      "/assets/nilgiri-co/slide-2.png",
      "/assets/nilgiri-co/slide-3.png",
      "/assets/nilgiri-co/slide-4.png",
      "/assets/nilgiri-co/slide-5.png",
      "/assets/nilgiri-co/slide-6.png",
      "/assets/nilgiri-co/slide-7.png"
    ]
  },
  {
    id: "magazine",
    title: "Magzine",
    category: "Branding",
    service: "Editorial Print Publication Mockups",
    image: "/images/magzine.png",
    slides: [
      "/assets/standalone/Magzine campaign.jpeg",
      "/assets/standalone/Magzine_2.png"
    ]
  },
  {
    id: "campaign-converge-brand",
    title: "Converge Campaign",
    category: "Branding",
    service: "Bespoke Digital Identity Guidelines",
    image: "/images/logo.png",
    slides: [
      "/assets/campaign-converge/slide-1.png",
      "/assets/campaign-converge/slide-2.png",
      "/assets/campaign-converge/slide-3.png",
      "/assets/campaign-converge/slide-4.png",
      "/assets/campaign-converge/slide-5.png",
      "/assets/campaign-converge/slide-6.png",
      "/assets/campaign-converge/slide-7.png",
      "/assets/campaign-converge/slide-8.png",
      "/assets/campaign-converge/slide-9.png"
    ]
  },
  {
    id: "nilgiri-website-reveal",
    title: "Nilgiri Website Reveal",
    category: "Branding",
    service: "E-Commerce Website Reveal Motion Carousel",
    image: "/images/nilgiri_co.png",
    slides: [
      "/assets/nilgiri_carousal/nilgiri 1.mp4",
      "/assets/nilgiri_carousal/Nilgiri2.mp4",
      "/assets/nilgiri_carousal/nilgiri 3.mp4",
      "/assets/nilgiri_carousal/Nilgiri4.mp4",
      "/assets/nilgiri_carousal/Nilgiri 5.mp4"
    ]
  },
  {
    id: "velunor-reel",
    title: "Velunor Reel",
    category: "Branding",
    service: "Fragrance Social Video Reel",
    image: "/images/velunor_perfume.png",
    video: "/assets/videos/velunor-reel.mp4",
    isReel: true
  },
  {
    id: "jersey-mockup-campaign",
    title: "Jersey Mockup Campaign",
    category: "Branding",
    service: "Apparel Launch Promo Reel",
    image: "/images/jwel_showcase.png",
    video: "/assets/videos/jersey-mockup-campaign.mp4",
    isReel: true
  },
  {
    id: "dentist-campaign",
    title: "Dentist Campaign Ad",
    category: "Branding",
    service: "Boutique Dental Video Promo Reel",
    image: "/images/scoope_icecream.png",
    video: "/assets/videos/dentist-campaign-ad.mp4",
    isReel: true
  },
  {
    id: "creative-work-reel",
    title: "Creative Work",
    category: "Branding",
    service: "Agency Showreel & Identity Promo Reel",
    image: "/images/hero_motion_graphics.png",
    video: "/assets/videos/CreativeWork.mp4",
    isReel: true
  },
  {
    id: "cd3-campaign",
    title: "CD-3 Campaign",
    category: "Branding",
    service: "Converge B2B Launch Promo Reel",
    image: "/images/logo.png",
    video: "/assets/videos/CD-3.mp4",
    isReel: true
  },
  {
    id: "one8-green",
    title: "one8 Green",
    category: "AI Creative",
    service: "Athletic Sneaker Concept Generation",
    image: "/images/one8_green.png",
    video: "/assets/videos/one-8-black.mp4",
    isReel: true
  },
  {
    id: "one8-red",
    title: "one8 Red",
    category: "AI Creative",
    service: "Athletic Sneaker Concept Generation",
    image: "/images/one8_red.png",
    video: "/assets/videos/one-8-red.mp4",
    isReel: true
  },
  {
    id: "one8-sports",
    title: "One8 sports",
    category: "AI Creative",
    service: "Activewear Gear Mockups",
    image: "/images/one8_sports.png",
    video: "/assets/videos/one-8-blue.mp4",
    isReel: true
  },
  {
    id: "watch-creative",
    title: "Watch",
    category: "AI Creative",
    service: "Futuristic Holographic Smartwatch Concept",
    image: "/images/watch_creative.png",
    video: "/assets/videos/sonata-poze-watch-ad.mp4",
    isReel: true
  },
  {
    id: "creative-cuts",
    title: "Creative Cuts",
    category: "AI Creative",
    service: "Modern Barbershop Concept Art",
    image: "/images/creative_cuts.png",
    video: "/assets/videos/Converge_cut.mp4",
    isReel: true
  }
];
