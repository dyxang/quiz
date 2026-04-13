import { createGenerator, presetUno } from 'unocss'

async function run() {
  const uno = await createGenerator({
    presets: [presetUno()],
    theme: {
      colors: {
        white: 'rgba(var(--color-white), %alpha)',
        gray: {
          50: 'rgba(var(--color-gray-50), %alpha)'
        }
      }
    }
  })
  const { css } = await uno.generate('bg-white bg-gray-50/50 text-white border-gray-50')
  console.log(css)
}
run()
