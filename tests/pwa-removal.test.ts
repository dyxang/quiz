import { readFile } from 'node:fs/promises'
import { describe, expect, it } from 'vitest'

async function readText(path: string) {
  return await readFile(path, 'utf-8')
}

describe('PWA removed', () => {
  it('does not reference vite-plugin-pwa in Vite config', async () => {
    const viteConfig = await readText(new URL('../vite.config.ts', import.meta.url).pathname)
    expect(viteConfig).not.toMatch(/vite-plugin-pwa|VitePWA/i)
  })

  it('does not reference virtual:pwa-register in App.vue', async () => {
    const appVue = await readText(new URL('../src/App.vue', import.meta.url).pathname)
    expect(appVue).not.toMatch(/virtual:pwa-register|useRegisterSW/i)
  })

  it('does not include vite-plugin-pwa client types in tsconfig', async () => {
    const tsconfig = await readText(new URL('../tsconfig.json', import.meta.url).pathname)
    expect(tsconfig).not.toMatch(/vite-plugin-pwa\/client/i)
  })
})
