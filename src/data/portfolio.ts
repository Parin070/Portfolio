// ============================================================
// src/data/portfolio.ts — Single source of truth for all content
// ============================================================

export interface Project {
  id: string;
  title: string;
  shortDesc: string;
  longDesc: string;
  tech: string[];
  github?: string;
  link?: string;
}

export interface SkillCategory {
  category: string;
  items: string[];
  color: string;
}

export const bio = {
  name: 'Parin Arora',
  tagline: 'Blue Team | SOC | Threat Hunter',
  shortBio:
    'Hunting threats, building tools, breaking things ethically. Focusing on Blue Team, Digital Forensics, and Incident Response.',
  university: 'BITS Pilani Dubai Campus',
  degree: 'B.E. Computer Science',
  graduationYear: 2028,
  cgpa: '9.46',
  role: 'Technical Executive @ Linux User Group (LUG)',
  certs: ['Google Cybersecurity Professional Certificate'],
  ctfPlatforms: ['HTB', 'THM', 'Exploit3rs', 'picoCTF'],
  focusAreas: ['Blue Team', 'SOC', 'DFIR', 'Threat Hunting'],
  location: 'Dubai, UAE',
};

export const experience = [
  {
    title: 'Technical Executive',
    org: 'Linux User Group (LUG), BITS Pilani Dubai',
    bullets: [
      'Conducted a VibeCoding session for schools during BITS Tech Fest, teaching students AI tools such as Bolt and Lovable v0 and providing hands-on guidance to 35+ participants.',
      'Conducted a collaborative session with IEEE Club for a datathon, explaining the Plotly library and its usage to 20–25 participants, providing hands-on guidance and practical examples.',
    ],
  },
];

export const projects: Project[] = [
  {
    id: 'honeypot',
    title: 'Cowrie SSH Honeypot Lab',
    shortDesc:
      'SSH honeypot deployed on Ubuntu Server VM, integrated with Wazuh SIEM.',
    longDesc:
      'A full attack-defend pipeline built by deploying a Cowrie SSH honeypot on an Ubuntu Server virtual machine. The honeypot logs attack data, which is securely forwarded to a Wazuh SIEM instance using custom Filebeat configurations. I wrote custom Wazuh decoders and rules to accurately detect, alert, and analyze the attacks originating from malicious actors.',
    tech: ['Wazuh', 'Cowrie', 'Ubuntu Server', 'SIEM', 'Bash'],
    github: 'https://github.com/parin070/Cowrie-Honeypot-Lab',
  },
  {
    id: 'toolkit',
    title: 'Security Toolkit',
    shortDesc:
      'Collection of basic networking and cryptography Python tools.',
    longDesc:
      'A toolkit of custom Python scripts designed to build strong foundations in programming and cybersecurity. This includes a Caesar cipher tool for basic cryptography, an offline password strength checker, a multi-threaded port scanner for network enumeration, a magic-number file type identifier, a DDoS simulator capable of 155k+ packets/min, and an AES encrypter. Everything is thoroughly documented.',
    tech: ['Python', 'Wireshark', 'Networking', 'Cryptography', 'Sockets'],
    github: 'https://github.com/parin070/Basic-Scripts',
  },
  {
    id: 'writeups',
    title: 'Cybersecurity Writeups',
    shortDesc:
      'Personal repository for detailed cybersecurity lab write-ups.',
    longDesc:
      'The Vault is my personal write-up site built from scratch to document my journey in cybersecurity. It hosts detailed walkthroughs and documentation for HackTheBox machines, Security Blue Team (SBT) labs, OverTheWire Bandit challenges, and my own home-lab implementations. The site is built with pure HTML/CSS and is hosted statically on GitHub Pages.',
    tech: ['HTML/CSS', 'GitHub Pages', 'Markdown', 'Cryptography', 'OSINT'],
    link: 'https://parin070.github.io/Write-Ups/',
  },
];

export const skills: SkillCategory[] = [
  {
    category: 'languages',
    items: ['Python', 'Java', 'C/C++', 'Bash'],
    color: '#ff5f56',
  },
  {
    category: 'tools',
    items: ['Wazuh', 'Wireshark', 'Nmap', 'Git', 'MySQL'],
    color: '#ffbd2e',
  },
  {
    category: 'concepts',
    items: ['Network Analysis', 'Log Analysis', 'OSINT', 'Incident Analysis', 'DFIR'],
    color: '#27c93f',
  },
  {
    category: 'os_platforms',
    items: ['Linux', 'Windows'],
    color: '#00f3ff',
  },
  {
    category: 'labs',
    items: ['Cowrie Honeypot', 'Kali Linux'],
    color: '#7b2cbf',
  },
];

export const contact = {
  github: { url: 'https://github.com/Parin070', label: 'GitHub' },
  linkedin: {
    url: 'https://linkedin.com/in/parinarora',
    label: 'LinkedIn',
  },
  web3formsKey: '3e12c568-d853-4842-aba0-eb6328f9975d',
};
