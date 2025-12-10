export interface Question {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Module {
  id: string;
  title: string;
  description: string;
  icon: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  topics: string[];
  questions: Question[];
  terminalChallenge?: TerminalChallenge;
}

export interface TerminalChallenge {
  description: string;
  objectives: string[];
  hints: string[];
  commands: Record<string, string>;
  flagToFind: string;
}

export const modules: Module[] = [
  {
    id: 'networking-basics',
    title: 'Networking Basics',
    description: 'Learn the fundamentals of computer networking, protocols, and how data travels across the internet.',
    icon: '🌐',
    difficulty: 'beginner',
    estimatedTime: '30 min',
    topics: ['TCP/IP', 'OSI Model', 'DNS', 'HTTP/HTTPS'],
    questions: [
      {
        id: 'net-1',
        question: 'What does TCP stand for?',
        options: ['Transfer Control Protocol', 'Transmission Control Protocol', 'Total Control Protocol', 'Transport Control Protocol'],
        correctAnswer: 1,
        explanation: 'TCP stands for Transmission Control Protocol. It is one of the main protocols in the TCP/IP suite and ensures reliable data delivery.'
      },
      {
        id: 'net-2',
        question: 'How many layers are in the OSI model?',
        options: ['5', '6', '7', '8'],
        correctAnswer: 2,
        explanation: 'The OSI (Open Systems Interconnection) model has 7 layers: Physical, Data Link, Network, Transport, Session, Presentation, and Application.'
      },
      {
        id: 'net-3',
        question: 'What port does HTTPS typically use?',
        options: ['80', '443', '8080', '22'],
        correctAnswer: 1,
        explanation: 'HTTPS uses port 443 by default. HTTP uses port 80, SSH uses port 22, and 8080 is an alternative HTTP port.'
      },
      {
        id: 'net-4',
        question: 'What does DNS stand for?',
        options: ['Domain Name System', 'Dynamic Network Service', 'Data Network Security', 'Distributed Name Server'],
        correctAnswer: 0,
        explanation: 'DNS stands for Domain Name System. It translates human-readable domain names (like google.com) into IP addresses.'
      },
      {
        id: 'net-5',
        question: 'Which layer of the OSI model handles IP addressing?',
        options: ['Physical Layer', 'Data Link Layer', 'Network Layer', 'Transport Layer'],
        correctAnswer: 2,
        explanation: 'The Network Layer (Layer 3) handles IP addressing and routing. This is where routers operate.'
      }
    ],
    terminalChallenge: {
      description: 'Use networking commands to discover information about the target system.',
      objectives: ['Find the IP address of the target', 'Discover open ports', 'Identify the running services'],
      hints: ['Try using nmap or ping', 'Look for common web ports'],
      commands: {
        'ping 10.10.10.1': 'PING 10.10.10.1: 64 bytes from 10.10.10.1: icmp_seq=1 ttl=64 time=0.5ms',
        'nmap 10.10.10.1': 'PORT     STATE SERVICE\n22/tcp   open  ssh\n80/tcp   open  http\n443/tcp  open  https',
        'curl 10.10.10.1': '<html><head><title>Welcome</title></head><body>FLAG{n3tw0rk_b4s1cs_m4st3r}</body></html>',
        'help': 'Available commands: ping, nmap, curl, ifconfig, netstat'
      },
      flagToFind: 'FLAG{n3tw0rk_b4s1cs_m4st3r}'
    }
  },
  {
    id: 'linux-fundamentals',
    title: 'Linux Fundamentals',
    description: 'Master the essential Linux commands and file system navigation for penetration testing.',
    icon: '🐧',
    difficulty: 'beginner',
    estimatedTime: '45 min',
    topics: ['File System', 'Permissions', 'User Management', 'Basic Commands'],
    questions: [
      {
        id: 'linux-1',
        question: 'What command is used to list files in a directory?',
        options: ['dir', 'list', 'ls', 'show'],
        correctAnswer: 2,
        explanation: 'The "ls" command is used to list directory contents in Linux. Use "ls -la" for detailed listing including hidden files.'
      },
      {
        id: 'linux-2',
        question: 'What does the permission "chmod 777" grant?',
        options: ['Read only for all', 'Full permissions for owner only', 'Full permissions for everyone', 'Execute only'],
        correctAnswer: 2,
        explanation: 'chmod 777 grants read, write, and execute permissions to owner, group, and others. This is generally insecure.'
      },
      {
        id: 'linux-3',
        question: 'Which command shows the current working directory?',
        options: ['cwd', 'pwd', 'dir', 'path'],
        correctAnswer: 1,
        explanation: 'pwd (Print Working Directory) displays the current directory path you are in.'
      },
      {
        id: 'linux-4',
        question: 'What command is used to create a new directory?',
        options: ['create', 'newdir', 'mkdir', 'makedir'],
        correctAnswer: 2,
        explanation: 'mkdir (make directory) is used to create new directories in Linux.'
      },
      {
        id: 'linux-5',
        question: 'What does "sudo" stand for?',
        options: ['Super User Do', 'System User Do', 'Superuser Do', 'Switch User Do'],
        correctAnswer: 0,
        explanation: 'sudo stands for "Super User Do" and allows permitted users to execute commands as the superuser or another user.'
      }
    ],
    terminalChallenge: {
      description: 'Navigate the file system to find hidden credentials.',
      objectives: ['Explore the home directory', 'Find hidden files', 'Read the secret file'],
      hints: ['Hidden files start with a dot (.)', 'Try using cat or less to read files'],
      commands: {
        'ls': 'Documents  Downloads  Pictures  Music',
        'ls -la': 'drwxr-xr-x user user Documents\ndrwxr-xr-x user user Downloads\n-rw------- user user .secret\ndrwxr-xr-x user user Pictures',
        'cat .secret': 'FLAG{l1nux_h4ck3r_1n1t14t3d}',
        'pwd': '/home/hacker',
        'whoami': 'hacker',
        'help': 'Available commands: ls, ls -la, cat, pwd, whoami, cd, grep'
      },
      flagToFind: 'FLAG{l1nux_h4ck3r_1n1t14t3d}'
    }
  },
  {
    id: 'web-security',
    title: 'Web Application Security',
    description: 'Understand common web vulnerabilities including XSS, SQL injection, and CSRF attacks.',
    icon: '🔓',
    difficulty: 'intermediate',
    estimatedTime: '60 min',
    topics: ['XSS', 'SQL Injection', 'CSRF', 'Authentication Flaws'],
    questions: [
      {
        id: 'web-1',
        question: 'What does XSS stand for?',
        options: ['Cross Site Scripting', 'Cross Server Scripting', 'Cross Site Security', 'Cross System Scripting'],
        correctAnswer: 0,
        explanation: 'XSS stands for Cross-Site Scripting. It allows attackers to inject malicious scripts into web pages viewed by other users.'
      },
      {
        id: 'web-2',
        question: 'Which SQL keyword is commonly used in SQL injection attacks?',
        options: ['SELECT', 'UNION', 'JOIN', 'All of the above'],
        correctAnswer: 3,
        explanation: 'All these SQL keywords can be used in injection attacks. UNION is particularly dangerous for data extraction.'
      },
      {
        id: 'web-3',
        question: 'What does CSRF stand for?',
        options: ['Cross-Site Request Forgery', 'Client Side Request Failure', 'Cross System Resource Fetch', 'Central Server Request Form'],
        correctAnswer: 0,
        explanation: 'CSRF (Cross-Site Request Forgery) tricks authenticated users into performing unwanted actions on a web application.'
      },
      {
        id: 'web-4',
        question: 'What is the main purpose of input validation?',
        options: ['Make forms look better', 'Prevent malicious data from entering the system', 'Speed up the website', 'Reduce server load'],
        correctAnswer: 1,
        explanation: 'Input validation prevents malicious or unexpected data from entering the application, helping prevent injection attacks.'
      },
      {
        id: 'web-5',
        question: 'What HTTP response code indicates unauthorized access?',
        options: ['200', '401', '404', '500'],
        correctAnswer: 1,
        explanation: '401 Unauthorized indicates the request requires authentication. 200 is OK, 404 is Not Found, 500 is Server Error.'
      }
    ],
    terminalChallenge: {
      description: 'Exploit a vulnerable web application to extract sensitive data.',
      objectives: ['Find the vulnerable parameter', 'Perform SQL injection', 'Extract the admin password'],
      hints: ['Look for user input fields', 'Try classic SQL injection payloads'],
      commands: {
        'curl "http://target/login?user=admin"': 'Error: Invalid credentials',
        'curl "http://target/login?user=admin\' OR 1=1--"': 'Welcome admin! FLAG{sql_1nj3ct10n_m4st3r}',
        'curl "http://target/login?user=admin\' UNION SELECT password FROM users--"': 'Password: sup3rs3cr3t',
        'sqlmap -u "http://target/login?user=test"': 'Parameter: user (GET)\nType: boolean-based blind\nPayload: admin\' OR 1=1--',
        'help': 'Available commands: curl, sqlmap, nikto, dirb'
      },
      flagToFind: 'FLAG{sql_1nj3ct10n_m4st3r}'
    }
  },
  {
    id: 'cryptography',
    title: 'Cryptography Essentials',
    description: 'Learn about encryption, hashing, and how to protect (or crack) data.',
    icon: '🔐',
    difficulty: 'intermediate',
    estimatedTime: '45 min',
    topics: ['Symmetric Encryption', 'Asymmetric Encryption', 'Hashing', 'Password Cracking'],
    questions: [
      {
        id: 'crypto-1',
        question: 'What type of encryption uses the same key for encryption and decryption?',
        options: ['Asymmetric', 'Symmetric', 'Hash', 'Public Key'],
        correctAnswer: 1,
        explanation: 'Symmetric encryption uses the same key for both encryption and decryption. Examples include AES and DES.'
      },
      {
        id: 'crypto-2',
        question: 'What is a hash function?',
        options: ['A reversible encryption method', 'A one-way function that produces a fixed-size output', 'A key exchange protocol', 'A type of firewall'],
        correctAnswer: 1,
        explanation: 'A hash function is a one-way function that takes input and produces a fixed-size output (hash). It cannot be reversed.'
      },
      {
        id: 'crypto-3',
        question: 'What is the purpose of salt in password hashing?',
        options: ['Make passwords taste better', 'Add random data to prevent rainbow table attacks', 'Compress the password', 'Speed up hashing'],
        correctAnswer: 1,
        explanation: 'Salt adds random data to passwords before hashing, making each hash unique and preventing rainbow table attacks.'
      },
      {
        id: 'crypto-4',
        question: 'Which algorithm is commonly used for asymmetric encryption?',
        options: ['AES', 'DES', 'RSA', 'MD5'],
        correctAnswer: 2,
        explanation: 'RSA is a widely used asymmetric encryption algorithm. AES and DES are symmetric, MD5 is a hash function.'
      },
      {
        id: 'crypto-5',
        question: 'What is the output length of SHA-256?',
        options: ['128 bits', '256 bits', '512 bits', '1024 bits'],
        correctAnswer: 1,
        explanation: 'SHA-256 produces a 256-bit (32-byte) hash output, as indicated by its name.'
      }
    ],
    terminalChallenge: {
      description: 'Crack passwords and decode encrypted messages.',
      objectives: ['Identify the hash type', 'Crack the password hash', 'Decode the base64 message'],
      hints: ['hashcat and john are your friends', 'base64 is not encryption'],
      commands: {
        'hashid 5f4dcc3b5aa765d61d8327deb882cf99': 'MD5',
        'john --format=raw-md5 hash.txt': 'password         (admin)',
        'hashcat -m 0 hash.txt wordlist.txt': '5f4dcc3b5aa765d61d8327deb882cf99:password',
        'echo "RkxBR3tjcnlwdDBfbTRzdDNyfQ==" | base64 -d': 'FLAG{crypt0_m4st3r}',
        'help': 'Available commands: hashid, john, hashcat, base64, openssl'
      },
      flagToFind: 'FLAG{crypt0_m4st3r}'
    }
  },
  {
    id: 'privilege-escalation',
    title: 'Privilege Escalation',
    description: 'Learn techniques to escalate privileges on compromised systems.',
    icon: '⬆️',
    difficulty: 'advanced',
    estimatedTime: '60 min',
    topics: ['SUID Binaries', 'Sudo Misconfiguration', 'Kernel Exploits', 'Cron Jobs'],
    questions: [
      {
        id: 'priv-1',
        question: 'What does SUID stand for?',
        options: ['System User ID', 'Set User ID', 'Super User ID', 'Secure User Identification'],
        correctAnswer: 1,
        explanation: 'SUID (Set User ID) allows a program to run with the permissions of its owner, not the user running it.'
      },
      {
        id: 'priv-2',
        question: 'Which command shows sudo privileges for the current user?',
        options: ['sudo --list', 'sudo -l', 'sudo show', 'sudo privileges'],
        correctAnswer: 1,
        explanation: 'sudo -l lists the allowed (and forbidden) commands for the current user.'
      },
      {
        id: 'priv-3',
        question: 'What file contains scheduled tasks (cron jobs)?',
        options: ['/etc/passwd', '/etc/crontab', '/etc/shadow', '/etc/hosts'],
        correctAnswer: 1,
        explanation: '/etc/crontab contains system-wide cron jobs. User cron jobs are in /var/spool/cron/.'
      },
      {
        id: 'priv-4',
        question: 'What command finds SUID binaries on a Linux system?',
        options: ['find / -perm -4000', 'locate suid', 'ls -suid', 'search suid'],
        correctAnswer: 0,
        explanation: 'find / -perm -4000 searches for files with the SUID bit set (permission 4000).'
      },
      {
        id: 'priv-5',
        question: 'Which file contains encrypted user passwords on Linux?',
        options: ['/etc/passwd', '/etc/shadow', '/etc/password', '/etc/users'],
        correctAnswer: 1,
        explanation: '/etc/shadow contains hashed passwords. /etc/passwd contains user information but not passwords anymore.'
      }
    ],
    terminalChallenge: {
      description: 'You have low-privilege access. Escalate to root.',
      objectives: ['Enumerate the system', 'Find a privilege escalation vector', 'Get root access'],
      hints: ['Check sudo permissions', 'Look for SUID binaries', 'Check for writable cron jobs'],
      commands: {
        'whoami': 'www-data',
        'id': 'uid=33(www-data) gid=33(www-data) groups=33(www-data)',
        'sudo -l': 'User www-data may run the following commands:\n    (root) NOPASSWD: /usr/bin/vim',
        'sudo vim -c ":!/bin/bash"': 'root@target:~# FLAG{pr1v_3sc_t0_r00t}',
        'find / -perm -4000 2>/dev/null': '/usr/bin/sudo\n/usr/bin/passwd\n/usr/bin/vim',
        'help': 'Available commands: whoami, id, sudo -l, find, cat, ls'
      },
      flagToFind: 'FLAG{pr1v_3sc_t0_r00t}'
    }
  },
  {
    id: 'social-engineering',
    title: 'Social Engineering',
    description: 'Understand the human element of hacking and psychological manipulation techniques.',
    icon: '🎭',
    difficulty: 'beginner',
    estimatedTime: '30 min',
    topics: ['Phishing', 'Pretexting', 'Baiting', 'Tailgating'],
    questions: [
      {
        id: 'social-1',
        question: 'What is phishing?',
        options: ['Catching fish online', 'Fraudulent attempt to obtain sensitive information', 'A type of malware', 'Network scanning'],
        correctAnswer: 1,
        explanation: 'Phishing is a fraudulent attempt to obtain sensitive information by disguising as a trustworthy entity.'
      },
      {
        id: 'social-2',
        question: 'What is pretexting?',
        options: ['Writing code before testing', 'Creating a fabricated scenario to manipulate a victim', 'Sending text messages', 'Pre-testing security'],
        correctAnswer: 1,
        explanation: 'Pretexting involves creating a fabricated scenario (pretext) to engage a victim and gain information or access.'
      },
      {
        id: 'social-3',
        question: 'What is tailgating in security context?',
        options: ['Following someone on social media', 'Following authorized personnel through secure doors', 'Driving behind someone', 'Tracking network traffic'],
        correctAnswer: 1,
        explanation: 'Tailgating (or piggybacking) is following an authorized person through a secure door without using your own credentials.'
      },
      {
        id: 'social-4',
        question: 'What type of attack involves leaving infected USB drives in public places?',
        options: ['Phishing', 'Baiting', 'Vishing', 'Smishing'],
        correctAnswer: 1,
        explanation: 'Baiting involves leaving infected devices (like USB drives) where targets will find them and plug them in.'
      },
      {
        id: 'social-5',
        question: 'What is vishing?',
        options: ['Video phishing', 'Voice phishing', 'Virtual fishing', 'Virus phishing'],
        correctAnswer: 1,
        explanation: 'Vishing (voice phishing) uses phone calls to manipulate victims into revealing sensitive information.'
      }
    ]
  }
];

export const finalQuizQuestions: Question[] = [
  // From Networking
  {
    id: 'final-1',
    question: 'What protocol is used to resolve domain names to IP addresses?',
    options: ['HTTP', 'DNS', 'FTP', 'SMTP'],
    correctAnswer: 1,
    explanation: 'DNS (Domain Name System) resolves domain names to IP addresses.'
  },
  {
    id: 'final-2',
    question: 'Which OSI layer is responsible for routing?',
    options: ['Layer 2 - Data Link', 'Layer 3 - Network', 'Layer 4 - Transport', 'Layer 7 - Application'],
    correctAnswer: 1,
    explanation: 'The Network Layer (Layer 3) handles routing and IP addressing.'
  },
  // From Linux
  {
    id: 'final-3',
    question: 'What command displays the contents of a file?',
    options: ['show', 'display', 'cat', 'read'],
    correctAnswer: 2,
    explanation: 'The cat command concatenates and displays file contents.'
  },
  {
    id: 'final-4',
    question: 'What permission number represents read+write+execute?',
    options: ['3', '5', '6', '7'],
    correctAnswer: 3,
    explanation: '7 = 4 (read) + 2 (write) + 1 (execute)'
  },
  // From Web Security
  {
    id: 'final-5',
    question: 'What attack involves injecting malicious SQL queries?',
    options: ['XSS', 'CSRF', 'SQL Injection', 'RCE'],
    correctAnswer: 2,
    explanation: 'SQL Injection exploits improperly sanitized database queries.'
  },
  {
    id: 'final-6',
    question: 'What header helps prevent XSS attacks?',
    options: ['X-Frame-Options', 'Content-Security-Policy', 'X-XSS-Protection', 'All of the above'],
    correctAnswer: 3,
    explanation: 'All these headers contribute to preventing XSS attacks in different ways.'
  },
  // From Cryptography
  {
    id: 'final-7',
    question: 'What is the key length of AES-256?',
    options: ['128 bits', '192 bits', '256 bits', '512 bits'],
    correctAnswer: 2,
    explanation: 'AES-256 uses a 256-bit key, as indicated by its name.'
  },
  {
    id: 'final-8',
    question: 'Which is NOT a hashing algorithm?',
    options: ['SHA-256', 'MD5', 'RSA', 'BLAKE2'],
    correctAnswer: 2,
    explanation: 'RSA is an asymmetric encryption algorithm, not a hashing algorithm.'
  },
  // From Privilege Escalation
  {
    id: 'final-9',
    question: 'What does the /etc/passwd file contain?',
    options: ['Encrypted passwords', 'User account information', 'Network configuration', 'System logs'],
    correctAnswer: 1,
    explanation: '/etc/passwd contains user account information. Passwords are in /etc/shadow.'
  },
  {
    id: 'final-10',
    question: 'What tool is commonly used for Linux privilege escalation enumeration?',
    options: ['nmap', 'linpeas', 'sqlmap', 'burp suite'],
    correctAnswer: 1,
    explanation: 'LinPEAS is a script that searches for possible privilege escalation paths.'
  },
  // From Social Engineering
  {
    id: 'final-11',
    question: 'What is spear phishing?',
    options: ['Random mass phishing', 'Targeted phishing at specific individuals', 'Fishing with a spear', 'Voice phishing'],
    correctAnswer: 1,
    explanation: 'Spear phishing is a targeted attack aimed at specific individuals or organizations.'
  },
  {
    id: 'final-12',
    question: 'What defense helps against social engineering?',
    options: ['Firewalls only', 'Security awareness training', 'Antivirus only', 'Encryption only'],
    correctAnswer: 1,
    explanation: 'Security awareness training helps employees recognize and resist social engineering attacks.'
  },
  // Mixed Advanced
  {
    id: 'final-13',
    question: 'What is a reverse shell?',
    options: ['Shell that reverses commands', 'Target connects back to attacker', 'Attacker connects to target', 'Command history reversal'],
    correctAnswer: 1,
    explanation: 'A reverse shell makes the target system connect back to the attacker, bypassing firewall restrictions.'
  },
  {
    id: 'final-14',
    question: 'What is the purpose of a DMZ in network security?',
    options: ['Store classified data', 'Create buffer zone between internal and external networks', 'Block all traffic', 'Encrypt network traffic'],
    correctAnswer: 1,
    explanation: 'A DMZ (Demilitarized Zone) is a buffer zone that separates internal networks from untrusted external networks.'
  },
  {
    id: 'final-15',
    question: 'What is defense in depth?',
    options: ['One strong security control', 'Multiple layers of security controls', 'Deep packet inspection', 'Defensive coding'],
    correctAnswer: 1,
    explanation: 'Defense in depth uses multiple layers of security controls so if one fails, others still protect the system.'
  }
];
