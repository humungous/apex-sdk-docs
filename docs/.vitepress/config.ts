import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Apex SDK',
  description: 'Frontend integration docs for the Apex DEX SDK',
  base: '/apex-sdk-docs/',
  cleanUrls: true,
  themeConfig: {
    siteTitle: 'Apex SDK',
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Contracts', link: '/contracts/overview' },
      { text: 'Examples', link: '/examples/quoting' },
      { text: 'API', link: '/reference/sdk-api' }
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Configuration', link: '/guide/configuration' },
          { text: 'Troubleshooting', link: '/guide/troubleshooting' }
        ]
      },
      {
        text: 'Contracts',
        items: [
          { text: 'DEX Structure', link: '/contracts/overview' }
        ]
      },
      {
        text: 'Examples',
        items: [
          { text: 'Quoting', link: '/examples/quoting' },
          { text: 'Swaps', link: '/examples/swaps' },
          { text: 'Farming and Vault', link: '/examples/farming-vault' }
        ]
      },
      {
        text: 'Reference',
        items: [
          { text: 'SDK API', link: '/reference/sdk-api' },
          { text: 'ABI Exports', link: '/reference/abis' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/humungous/apex-sdk-docs' }
    ],
    search: {
      provider: 'local'
    }
  }
})

