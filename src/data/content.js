import { LOCATION } from './location';

export const foundation = {
  name: 'Baqiatullah Foundation Pakistan',
  phone: '+92 314 6500512',
  phoneRaw: '03146500512',
  email: 'baqiatullahpak@gmail.com',
  address: LOCATION.address,
  hours: [
    'Monday - Friday: 9:00 AM - 5:00 PM',
    'Saturday: 10:00 AM - 2:00 PM',
    'Sunday: Closed',
  ],
  logo: 'https://www.baqiatullah.org/logo/logo-01.png',
};

export const impactStats = [
  { value: '250+', label: 'Children supported' },
  { value: '85+', label: 'Volunteers' },
  { value: '100K+', label: 'Meals provided' },
  { value: '50+', label: 'Scholarships' },
];

const image = (id, width = 1000) => `https://images.unsplash.com/${id}?auto=format&fm=webp&fit=crop&w=${width}&q=80`;

export const focusAreas = [
  { title: 'Education', icon: 'GraduationCap', description: 'Creating access to quality learning and the confidence to keep going.' },
  { title: 'Digital Education', icon: 'Laptop', description: 'Building practical digital skills for a changing world.' },
  { title: 'Orphan Support', icon: 'UsersRound', description: 'Surrounding vulnerable children with consistent, thoughtful support.' },
  { title: 'Food & Ration', icon: 'Utensils', description: 'Providing nourishing food and essential household support.' },
  { title: 'Clothing', icon: 'Shirt', description: 'Meeting everyday needs with dignity and care.' },
  { title: 'Orphan Care', icon: 'HeartHandshake', description: 'Helping children grow in a safe, family-like environment.' },
  { title: 'Disaster Management', icon: 'ShieldCheck', description: 'Responding with practical help when communities face crisis.' },
];

export const projects = [
  { slug: 'education', title: 'Education', category: 'Learning', icon: 'GraduationCap', image: image('photo-1509062522246-3755977927d7'), description: 'Supporting children with learning opportunities, scholarships, tutoring, and the resources to reach their potential.', why: 'Education gives children more choices in life and strengthens the communities around them.', what: ['Learning support and educational resources', 'Scholarship assistance where verified need exists', 'Encouragement for children to stay engaged with school'], gallery: [image('photo-1497633762265-9d179a990aa6'), image('photo-1523240795612-9a054b0db644')] },
  { slug: 'digital-education', title: 'Digital Education', category: 'Opportunity', icon: 'Laptop', image: image('photo-1516321318423-f06f85e504b3'), description: 'Opening the door to computer literacy and digital confidence for children preparing for the modern world.', why: 'Digital skills can make education, communication, and future work more accessible.', what: ['Computer literacy and guided practice', 'Access to digital learning resources', 'A stronger foundation for future study and work'], gallery: [image('photo-1531482615713-2afd69097998'), image('photo-1498050108023-c5249f4df085')] },
  { slug: 'orphan-support', title: 'Orphan Support', category: 'Care', icon: 'UsersRound', image: 'https://www.baqiatullah.org/gallery/10.jpg', description: 'Providing reliable, compassionate support for orphaned and vulnerable children as they grow.', why: 'Children deserve stability, belonging, and the chance to be seen for who they are.', what: ['Consistent care and emotional support', 'Help with essential needs', 'A community that protects dignity and possibility'], gallery: [image('photo-1542810634-71277d95dcbb'), image('photo-1472162072942-cd5147eb3902')] },
  { slug: 'food-ration', title: 'Food & Ration', category: 'Wellbeing', icon: 'Utensils', image: image('photo-1488521787991-ed7bbaae773c'), description: 'Helping children and families access nourishing meals and essential food support.', why: 'No child can learn or thrive while worrying about their next meal.', what: ['Meals and food support for children', 'Essential ration assistance', 'Community-led response to practical need'], gallery: [image('photo-1593113598332-cd288d649433'), image('photo-1547592180-85f173990554')] },
  { slug: 'clothing', title: 'Clothing', category: 'Dignity', icon: 'Shirt', image: 'https://www.baqiatullah.org/gallery/7.jpg', description: 'Supplying appropriate clothing and everyday essentials so children can participate with confidence.', why: 'Small practical needs matter when they affect comfort, confidence, and belonging.', what: ['Seasonal clothing support', 'Essential items for children in care', 'Respectful distribution shaped by need'], gallery: [image('photo-1523381210434-271e8be1f52b'), image('photo-1441986300917-64674bd600d8')] },
  { slug: 'orphan-care', title: 'Orphan Care', category: 'Belonging', icon: 'HeartHandshake', image: image('photo-1542810634-71277d95dcbb'), description: 'Building a safe, nurturing, family-like environment where children can develop with care and confidence.', why: 'A secure home and attentive adults give children the foundation to imagine a future.', what: ['A safe and caring environment', 'Support for education and wellbeing', 'Long-term encouragement and guidance'], gallery: [image('photo-1488521787991-ed7bbaae773c'), image('photo-1504159506876-f8338247a14a')] },
  { slug: 'disaster-management', title: 'Disaster Management', category: 'Relief', icon: 'ShieldCheck', image: 'https://www.baqiatullah.org/gallery/17.jpg', description: 'Standing with families and communities when emergencies create urgent, practical needs.', why: 'Timely, respectful support can help families regain stability after a crisis.', what: ['Essential relief support', 'Community coordination in difficult moments', 'A practical response shaped by local needs'], gallery: [image('photo-1559027615-cd4628902d4a'), image('photo-1547683905-f686c993aae5')] },
];

export const team = [
  { name: 'Mr. Zain Ali', role: 'Founder & Director', image: 'https://www.baqiatullah.org/team/founder2.jpg' },
  { name: 'Aleena Maryam', role: 'Chairperson', image: 'https://www.baqiatullah.org/team/chairperson.jpg' },
  { name: 'Syed Sajjad Hussain', role: 'Education Coordinator', image: 'https://www.baqiatullah.org/team/educationist.jpg' },
  { name: 'Sohail Raza', role: 'Finance Secretary', image: 'https://www.baqiatullah.org/team/finance.jpg' },
];

const foundationGalleryImage = (number) => `https://www.baqiatullah.org/gallery/${number}.jpg`;

export const gallery = [
  [1, 'Education', 'Children learning together'],
  [2, 'Education', 'A shared learning session'],
  [3, 'Community', 'Children growing with confidence'],
  [4, 'Digital Education', 'Learning digital skills'],
  [5, 'Food & Ration', 'A meal shared with care'],
  [6, 'Food & Ration', 'Nourishment for children'],
  [7, 'Education', 'Celebrating achievement'],
  [8, 'Education', 'Study and opportunity'],
  [9, 'Community', 'The foundation community'],
  [10, 'Community', 'Children together outdoors'],
  [11, 'Digital Education', 'Digital learning in action'],
  [12, 'Community', 'A community event'],
  [13, 'Community', 'Children at a foundation event'],
  [14, 'Education', 'Learning with purpose'],
  [15, 'Food & Ration', 'A meal prepared for children'],
  [16, 'Food & Ration', 'Nutrition and health support'],
  [17, 'Relief', 'Essential support prepared with dignity'],
  [18, 'Relief', 'Ration distribution in progress'],
  [19, 'Education', 'Learning in a welcoming space'],
  [20, 'Education', 'Students building brighter futures'],
  [21, 'Community', 'A day of shared joy'],
  [22, 'Community', 'Children and mentors together'],
  [23, 'Relief', 'Care reaching the community'],
  [24, 'Education', 'Growing through education'],
  [44, 'Community', 'Health and wellbeing support'],
  [46, 'Community', 'Learning beyond the classroom'],
  [48, 'Community', 'A day of discovery together'],
  [52, 'Disaster Management', 'Emergency response training'],
  [53, 'Community', 'Children representing Pakistan'],
  [58, 'Disaster Management', 'Relief reaching a family'],
  [60, 'Disaster Management', 'Community relief distribution'],
  [62, 'Disaster Management', 'Support after a crisis'],
  [64, 'Disaster Management', 'Essential supplies delivered'],
].map(([number, category, title], index) => ({
  title,
  category,
  image: foundationGalleryImage(number),
  key: `foundation-gallery-${number}`,
  priority: index < 4,
}));

export const news = [
  { slug: 'our-work-in-community', date: 'From the field', category: 'Community', title: 'Care grows through community', excerpt: 'The foundation brings donors, volunteers, educators, and local communities together around practical support.', image: image('photo-1559027615-cd4628902d4a'), body: 'Baqiatullah Foundation continues to build its work around the needs of children and communities. Every contribution of time, care, and support helps make that work more dependable.' },
];

export const donation = {
  bank: 'Bank Al-Habib',
  accountName: 'Baqiatullah',
  accountNumber: '0343 0981 000823 01 8',
  purpose: "Donation for Children's Welfare",
};

