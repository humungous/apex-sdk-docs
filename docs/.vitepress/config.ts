import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'Apex SDK',
  description: 'Integration reference for the Apex DEX SDK',
  base: '/apex-sdk-docs/',
  cleanUrls: true,
  themeConfig: {
    siteTitle: 'Apex SDK',
    nav: [
      { text: 'API', link: '/reference/sdk-api' },
      { text: 'Examples', link: '/examples/quoting' },
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'Contracts', link: '/contracts/' }
    ],
    sidebar: [
      {
        text: 'API Reference',
        items: [
          { text: 'Overview', link: '/reference/sdk-api' },
          { text: 'Config and Types', link: '/reference/config-types' },
          { text: 'CL Pools', link: '/reference/cl-pools' },
          { text: 'Classic Pools', link: '/reference/classic-pools' },
          { text: 'Routes and Quotes', link: '/reference/routes-quotes' },
          { text: 'SmartRouter', link: '/reference/smart-router' },
          { text: 'Farming', link: '/reference/farming' },
          { text: 'ApexVault', link: '/reference/apex-vault' },
          { text: 'ABI Exports', link: '/reference/abis' }
        ]
      },
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
          { text: 'Deployed Contracts', link: '/contracts/' },
          { text: 'Contract Map', link: '/contracts/overview' }
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
