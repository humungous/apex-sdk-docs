import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Apex SDK',
  description: 'Integration reference for the Apex DEX SDK',
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
          { text: 'DEX Structure', link: '/contracts/overview' },
          {
            text: 'Pools',
            items: [
              { text: 'Classic Pools', link: '/contracts/classic-pools' },
              { text: 'CL Pools', link: '/contracts/cl-pools' }
            ]
          },
          { text: 'Farming', link: '/contracts/farming' },
          { text: 'ApexVault', link: '/contracts/apex-vault' }
        ]
      },
      {
        text: 'Examples',
        items: [
          { text: 'Quoting', link: '/examples/quoting' },
          { text: 'Swaps', link: '/examples/swaps' },
          { text: 'Farming', link: '/examples/farming' },
          { text: 'ApexVault', link: '/examples/apex-vault' }
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
