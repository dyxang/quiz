import type { QuizPlugin } from './types'

class PluginRegistry {
  private plugins: QuizPlugin[] = []

  /**
   * 注册全局插件
   * @param plugin 插件实例
   */
  use(plugin: QuizPlugin) {
    this.plugins.push(plugin)
  }

  /**
   * 获取所有已注册的插件
   */
  getPlugins() {
    return this.plugins
  }
}

export const pluginRegistry = new PluginRegistry()
