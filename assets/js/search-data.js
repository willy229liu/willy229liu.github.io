// get the ninja-keys element
const ninja = document.querySelector('ninja-keys');

// add the home and posts menu items
ninja.data = [{
    id: "nav-about",
    title: "About",
    section: "Navigation",
    handler: () => {
      window.location.href = "/";
    },
  },{id: "nav-portfolio",
          title: "Portfolio",
          description: "A growing collection of your cool projects.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/projects/";
          },
        },{id: "nav-cv",
          title: "CV",
          description: "C++ / Unity systems and performance engineer. Use the PDF icon to download the current one-page resume.",
          section: "Navigation",
          handler: () => {
            window.location.href = "/cv/";
          },
        },{id: "projects-pip-the-black-hearted-traffic-chasing-promo-machine",
          title: 'PIP: The Black-hearted Traffic-Chasing Promo Machine',
          description: "A RogueLite strategy game combining slot machine mechanics with entertainment industry satire.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/1_PIP/";
            },},{id: "projects-high-performance-c-graph-processing-algorithm-optimization",
          title: 'High-Performance C++ Graph Processing Algorithm Optimization',
          description: "Huawei CodeCraft Contest 2020 - National Third Prize",
          section: "Projects",handler: () => {
              window.location.href = "/projects/2_code_craft/";
            },},{id: "projects-lua-vm-memory-optimization-amp-stack-recovery-system",
          title: 'Lua VM Memory Optimization &amp;amp; Stack Recovery System',
          description: "a solution that minimizes memory of lua codes.",
          section: "Projects",handler: () => {
              window.location.href = "/projects/3_lua_memory/";
            },},{id: "projects-system-for-information-retrieval-based-bug-localization",
          title: 'System for Information-Retrieval-based Bug Localization',
          description: "The Software Engineering and Computing III course project",
          section: "Projects",handler: () => {
              window.location.href = "/projects/4_irbl/";
            },},{
        id: 'social-cv',
        title: 'CV',
        section: 'Socials',
        handler: () => {
          window.open("/assets/pdf/CV-Yu-Lin-Liu.pdf", "_blank");
        },
      },{
        id: 'social-email',
        title: 'email',
        section: 'Socials',
        handler: () => {
          window.open("mailto:%77%69%6C%6C%79%32%32%39.%6C%69%75@%67%6D%61%69%6C.%63%6F%6D", "_blank");
        },
      },{
        id: 'social-github',
        title: 'GitHub',
        section: 'Socials',
        handler: () => {
          window.open("https://github.com/willy229liu", "_blank");
        },
      },{
        id: 'social-linkedin',
        title: 'LinkedIn',
        section: 'Socials',
        handler: () => {
          window.open("https://www.linkedin.com/in/willy229liu", "_blank");
        },
      },{
      id: 'light-theme',
      title: 'Change theme to light',
      description: 'Change the theme of the site to Light',
      section: 'Theme',
      handler: () => {
        setThemeSetting("light");
      },
    },
    {
      id: 'dark-theme',
      title: 'Change theme to dark',
      description: 'Change the theme of the site to Dark',
      section: 'Theme',
      handler: () => {
        setThemeSetting("dark");
      },
    },
    {
      id: 'system-theme',
      title: 'Use system default theme',
      description: 'Change the theme of the site to System Default',
      section: 'Theme',
      handler: () => {
        setThemeSetting("system");
      },
    },];
