import { defineConfig, defaultColors } from 'histoire'
import { HstNuxt } from '@histoire/plugin-nuxt'
import Unocss from 'unocss/vite'
import { presetAttributify, presetUno, presetIcons, presetWebFonts } from 'unocss'

export default defineConfig({
  tree: {
    groups: [
      {
        id: 'layout',
        title: 'Layout'
      },
      {
        id: 'actions',
        title: 'Actions'
      }
    ]
  },
    plugins: [
        HstNuxt(),
      ],
    theme: {
        title: 'Consule.me - Have all your Apps in one view',
        colors: {
            gray: defaultColors.slate,
            primary: defaultColors.fuchsia
          }
      },
      storyMatch: ['stories/*.story.vue'],
      vite: {
        server: {
          port: 3333,
        },
        plugins: [
          Unocss({
          presets: [
            presetUno(),
            presetAttributify(),
            presetIcons({
              scale: 1.2
            }),
            presetWebFonts({
              fonts: {
                // these will extend the default theme
                sans: 'Josefin Sans',
                mono: ['Fira Code', 'Fira Mono:400,700'],
              }
            })
          ],
        })]
      }
})