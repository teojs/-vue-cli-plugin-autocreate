const fs = require('fs')
const path = require('path')
const format = require('prettier-eslint')
const formatConfig = {
  filePath: path.join(process.cwd(), '.eslintrc.js'),
}

module.exports = () => {
  if (process.env.NODE_ENV === 'development') {
    // 自动写入api模板
    const apisPath = path.join(process.cwd(), 'src/service/apis')
    fs.watch(apisPath, { recursive: true }, (eventType, filename) => {
      const filePath = path.join(apisPath, filename)
      if (eventType === 'rename') {
        if (fs.existsSync(filePath) && fs.statSync(filePath).isFile()) {
          setTimeout(() => {
            const file = fs.readFileSync(filePath, {
              encoding: 'utf-8',
            })
            const template = `
              /**
               * 接口说明...
               */
              export default function(ctx) {
                this.$http({
                  method: 'post',
                  url: '/api',
                  // params: ctx.params,
                  data: ctx.data,
                }).then(e => {
                  if (e.code === '01') {
                    return ctx.success(e.body)
                  }
                  ctx.fail(e.message)
                })
              }
            `
            if (file === '') {
              const formatTpl = format({
                text: template,
                ...formatConfig,
              })
              fs.writeFileSync(filePath, formatTpl)
            }
          }, 500)
        }
      }
    })

    // 自动写入 .vue 模板
    const viewsPath = path.join(process.cwd(), 'src/views')
    fs.watch(viewsPath, { recursive: true }, (eventType, filename) => {
      if (
        eventType === 'rename' &&
        fs.existsSync(path.join(viewsPath, filename)) &&
        fs.statSync(path.join(viewsPath, filename)).isFile()
      ) {
        setTimeout(() => {
          // 自动写入模板
          const file = fs.readFileSync(path.join(viewsPath, filename), {
            encoding: 'utf-8',
          })
          const template = fs.readFileSync(path.join(__dirname, './tpl.vue'), {
            encoding: 'utf-8',
          })
          if (file === '') {
            fs.writeFileSync(
              path.join(viewsPath, filename),
              template.replace(
                /component name here/g,
                filename.replace('.vue', '').replace(/\\|\//g, '-')
              )
            )
          }
        }, 500)
      }
    })
  }
}
