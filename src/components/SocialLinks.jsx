import React from 'react';
import { Facebook, Instagram, Linkedin, Music2, Youtube } from 'lucide-react';

const links = [
  { label: 'LinkedIn', href: 'https://linkedin.com/in/baqiatullahfoundation', Icon: Linkedin },
  { label: 'YouTube', href: 'https://www.youtube.com/@baqiatullahfoundation', Icon: Youtube },
  { label: 'Instagram', href: 'https://www.instagram.com/baqiatullahfoundation', Icon: Instagram },
  { label: 'Facebook', href: 'https://www.facebook.com/baqiatullahfoundationofficial', Icon: Facebook },
  { label: 'TikTok', href: 'https://www.tiktok.com/@baqiatullahfoundation', Icon: Music2 },
];

export default function SocialLinks() {
  return (
    <nav className="socials" aria-label="Baqiatullah Foundation social media">
      {links.map(({ label, href, Icon }) => (
        <a key={label} href={href} target="_blank" rel="noopener noreferrer" aria-label={`Baqiatullah Foundation on ${label}`} title={label}>
          <Icon size={17} aria-hidden="true" />
        </a>
      ))}
    </nav>
  );
}
