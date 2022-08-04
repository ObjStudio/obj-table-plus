import XEUtils from 'xe-utils/ctor'
//👇此部分是调用原项目中的配置
import GlobalConfig from 'vxe-table/packages/conf'
import { UtilTools } from 'vxe-table/packages/tools'
import zhCN from 'vxe-table/packages/locale/lang/zh-CN'
const objI18n=XEUtils.toFormatString ? (key, args) => XEUtils.toFormatString(XEUtils.get(zhCN, key), args) : (key, args) => XEUtils.template(XEUtils.get(zhCN, key), args, { tmplRE: /\{([.\w[\]\s]+)\}/g })
//👆此部分是调用原项目中的配置

export default {
  name: 'ObjVxePager',
  props: {
    size: { type: String, default: () => GlobalConfig.pager.size || GlobalConfig.size },
    // 自定义布局
    layouts: { type: Array, default: () => GlobalConfig.pager.layouts || ['PrevJump', 'PrevPage', 'Jump', 'PageCount', 'NextPage', 'NextJump', 'Sizes', 'Total'] },
    // 当前页
    currentPage: { type: Number, default: 1 },
    // 加载中
    loading: Boolean,
    // 每页大小
    pageSize: { type: Number, default: () => GlobalConfig.pager.pageSize || 10 },
    // 总条数
    total: { type: Number, default: 0 },
    // 显示页码按钮的数量
    pagerCount: { type: Number, default: () => GlobalConfig.pager.pagerCount || 7 },
    // 每页大小选项列表
    pageSizes: { type: Array, default: () => GlobalConfig.pager.pageSizes || [10, 15, 20, 50, 100] },
    // 列对其方式
    align: { type: String, default: () => GlobalConfig.pager.align },
    // 带边框
    border: { type: Boolean, default: () => GlobalConfig.pager.border },
    // 带背景颜色
    background: { type: Boolean, default: () => GlobalConfig.pager.background },
    // 配套的样式
    perfect: { type: Boolean, default: () => GlobalConfig.pager.perfect },
    // 当只有一页时隐藏
    autoHidden: { type: Boolean, default: () => GlobalConfig.pager.autoHidden },
    transfer: { type: Boolean, default: () => GlobalConfig.pager.transfer },
    // 自定义图标
    iconPrevPage: String,
    iconJumpPrev: String,
    iconJumpNext: String,
    iconNextPage: String,
    iconJumpMore: String
  },
  inject: {
    $xegrid: {
      default: null
    }
  },
  computed: {
    vSize () {
      return this.size || this.$parent.size || this.$parent.vSize
    },
    isSizes () {
      return this.layouts.some(name => name === 'Sizes')
    },
    pageCount () {
      return this.getPageCount(this.total, this.pageSize)
    },
    numList () {
      const len = this.pageCount > this.pagerCount ? this.pagerCount - 2 : this.pagerCount
      const rest = []
      for (let index = 0; index < len; index++) {
        rest.push(index)
      }
      return rest
    },
    offsetNumber () {
      return Math.floor((this.pagerCount - 2) / 2)
    },
    sizeList () {
      return this.pageSizes.map(item => {
        if (XEUtils.isNumber(item)) {
          return {
            value: item,
            label: `${objI18n('vxe.pager.pagesize', [item])}`
          }
        }
        return { value: '', label: '', ...item }
      })
    }
  },
  render (h) {
    const { $scopedSlots, $xegrid, vSize, align } = this
    const childNodes = []
    if ($scopedSlots.left) {
      childNodes.push(
        h('span', {
          class: 'vxe-pager--left-wrapper'
        }, [
          $scopedSlots.left.call(this, { $grid: $xegrid })
        ])
      )
    }
    this.layouts.forEach(name => {
      childNodes.push(this[`render${name}`](h))
    })
    if ($scopedSlots.right) {
      childNodes.push(
        h('span', {
          class: 'vxe-pager--right-wrapper'
        }, [
          $scopedSlots.right.call(this, { $grid: $xegrid })
        ])
      )
    }
    return h('div', {
      class: ['vxe-pager', {
        [`size--${vSize}`]: vSize,
        [`align--${align}`]: align,
        'is--border': this.border,
        'is--background': this.background,
        'is--perfect': this.perfect,
        'is--hidden': this.autoHidden && this.pageCount === 1,
        'is--loading': this.loading
      }]
    }, [
      h('div', {
        class: 'vxe-pager--wrapper'
      }, childNodes)
    ])
  },
  methods: {
    // 上一页
    renderPrevPage (h) {
      return h('span', {
        class: ['vxe-pager--prev-btn', {
          'is--disabled': this.currentPage <= 1
        }],
        attrs: {
          title: objI18n('vxe.pager.prevPage')
        },
        on: {
          click: this.prevPage
        }
      }, [
        h('i', {
          class: ['vxe-pager--btn-icon', this.iconPrevPage || GlobalConfig.icon.PAGER_PREV_PAGE]
        })
      ])
    },
    // 向上翻页
    renderPrevJump (h, tagName) {
      return h(tagName || 'span', {
        class: ['vxe-pager--jump-prev', {
          'is--fixed': !tagName,
          'is--disabled': this.currentPage <= 1
        }],
        attrs: {
          title: objI18n('vxe.pager.prevJump')
        },
        on: {
          click: this.prevJump
        }
      }, [
        tagName ? h('i', {
          class: ['vxe-pager--jump-more-icon', this.iconJumpMore || GlobalConfig.icon.PAGER_JUMP_MORE]
        }) : null,
        h('i', {
          class: ['vxe-pager--jump-icon', this.iconJumpPrev || GlobalConfig.icon.PAGER_JUMP_PREV]
        })
      ])
    },
    // number
    renderNumber (h) {
      return h('ul', {
        class: 'vxe-pager--btn-wrapper'
      }, this.renderPageBtn(h))
    },
    // jumpNumber
    renderJumpNumber (h) {
      return h('ul', {
        class: 'vxe-pager--btn-wrapper'
      }, this.renderPageBtn(h, true))
    },
    // 向下翻页
    renderNextJump (h, tagName) {
      return h(tagName || 'span', {
        class: ['vxe-pager--jump-next', {
          'is--fixed': !tagName,
          'is--disabled': this.currentPage >= this.pageCount
        }],
        attrs: {
          title: objI18n('vxe.pager.nextJump')
        },
        on: {
          click: this.nextJump
        }
      }, [
        tagName ? h('i', {
          class: ['vxe-pager--jump-more-icon', this.iconJumpMore || GlobalConfig.icon.PAGER_JUMP_MORE]
        }) : null,
        h('i', {
          class: ['vxe-pager--jump-icon', this.iconJumpNext || GlobalConfig.icon.PAGER_JUMP_NEXT]
        })
      ])
    },
    // 下一页
    renderNextPage (h) {
      return h('span', {
        class: ['vxe-pager--next-btn', {
          'is--disabled': this.currentPage >= this.pageCount
        }],
        attrs: {
          title: objI18n('vxe.pager.nextPage')
        },
        on: {
          click: this.nextPage
        }
      }, [
        h('i', {
          class: ['vxe-pager--btn-icon', this.iconNextPage || GlobalConfig.icon.PAGER_NEXT_PAGE]
        })
      ])
    },
    // sizes
    renderSizes (h) {
      return h('vxe-select', {
        class: 'vxe-pager--sizes',
        props: {
          value: this.pageSize,
          placement: 'top',
          transfer: this.transfer,
          options: this.sizeList
        },
        on: {
          change: ({ value }) => {
            this.pageSizeEvent(value)
          }
        }
      })
    },
    // FullJump
    renderFullJump (h) {
      return this.renderJump(h, true)
    },
    // Jump
    renderJump (h, isFull) {
      return h('span', {
        class: 'vxe-pager--jump'
      }, [
        isFull ? h('span', {
          class: 'vxe-pager--goto-text'
        }, objI18n('vxe.pager.goto')) : null,
        h('input', {
          class: 'vxe-pager--goto',
          domProps: {
            value: this.currentPage
          },
          attrs: {
            type: 'text',
            autocomplete: 'off'
          },
          on: {
            keydown: this.jumpKeydownEvent,
            blur: this.triggerJumpEvent
          }
        }),
        isFull ? h('span', {
          class: 'vxe-pager--classifier-text'
        }, objI18n('vxe.pager.pageClassifier')) : null
      ])
    },
    // PageCount
    renderPageCount (h) {
      return h('span', {
        class: 'vxe-pager--count'
      }, [
        h('span', {
          class: 'vxe-pager--separator'
        }),
        h('span', this.pageCount)
      ])
    },
    // total
    renderTotal (h) {
      return h('span', {
        class: 'vxe-pager--total'
      }, objI18n('vxe.pager.total', [this.total]))
    },
    // number
    renderPageBtn (h, showJump) {
      const { numList, currentPage, pageCount, pagerCount, offsetNumber } = this
      const nums = []
      const isOv = pageCount > pagerCount
      const isLt = isOv && currentPage > offsetNumber + 1
      const isGt = isOv && currentPage < pageCount - offsetNumber
      let startNumber = 1
      if (isOv) {
        if (currentPage >= pageCount - offsetNumber) {
          startNumber = Math.max(pageCount - numList.length + 1, 1)
        } else {
          startNumber = Math.max(currentPage - offsetNumber, 1)
        }
      }
      if (showJump && isLt) {
        nums.push(
          h('li', {
            class: 'vxe-pager--num-btn',
            on: {
              click: () => this.jumpPage(1)
            }
          }, 1),
          this.renderPrevJump(h, 'li')
        )
      }
      numList.forEach((item, index) => {
        const number = startNumber + index
        if (number <= pageCount) {
          nums.push(
            h('li', {
              class: ['vxe-pager--num-btn', {
                'is--active': currentPage === number
              }],
              on: {
                click: () => this.jumpPage(number)
              },
              key: number
            }, number)
          )
        }
      })
      if (showJump && isGt) {
        nums.push(
          this.renderNextJump(h, 'li'),
          h('li', {
            class: 'vxe-pager--num-btn',
            on: {
              click: () => this.jumpPage(pageCount)
            }
          }, pageCount)
        )
      }
      return nums
    },
    getPageCount (total, size) {
      return Math.max(Math.ceil(total / size), 1)
    },
    prevPage () {
      const { currentPage, pageCount } = this
      if (currentPage > 1) {
        this.jumpPage(Math.min(pageCount, Math.max(currentPage - 1, 1)))
      }
    },
    nextPage () {
      const { currentPage, pageCount } = this
      if (currentPage < pageCount) {
        this.jumpPage(Math.min(pageCount, currentPage + 1))
      }
    },
    prevJump () {
      this.jumpPage(Math.max(this.currentPage - this.numList.length, 1))
    },
    nextJump () {
      this.jumpPage(Math.min(this.currentPage + this.numList.length, this.pageCount))
    },
    jumpPage (currentPage) {
      if (currentPage !== this.currentPage) {
        if (this.$listeners['current-change']) {
          UtilTools.warn('vxe.error.delEvent', ['current-change', 'page-change'])
          this.$emit('current-change', currentPage)
        }
        //此处做拦截器
        const next=()=>{
            this.$emit('update:currentPage', currentPage)
        }
        this.$emit('page-change', { type: 'current', pageSize: this.pageSize, currentPage, $event: { type: 'current' } },next)
        //无监听就不需要执行next方法
        if(!this.$listeners['page-change']){
            this.$emit('update:currentPage', currentPage)
        }
        
      }
    },
    pageSizeEvent (pageSize) {
      this.changePageSize(pageSize)
    },
    changePageSize (pageSize) {
      if (pageSize !== this.pageSize) {
        if (this.$listeners['size-change']) {
          UtilTools.warn('vxe.error.delEvent', ['size-change', 'page-change'])
          this.$emit('size-change', pageSize)
        }
        //此处做拦截器
        const next=()=>{
            this.$emit('update:pageSize', pageSize)
        }
        this.$emit('page-change', { type: 'size', pageSize, currentPage: Math.min(this.currentPage, this.getPageCount(this.total, pageSize)), $event: { type: 'size' } },next)
        //无监听就不需要执行next方法
        if(!this.$listeners['page-change']){
            this.$emit('update:pageSize', pageSize)
        }
      }
    },
    jumpKeydownEvent (evnt) {
      if (evnt.keyCode === 13) {
        this.triggerJumpEvent(evnt)
      } else if (evnt.keyCode === 38) {
        evnt.preventDefault()
        this.nextPage()
      } else if (evnt.keyCode === 40) {
        evnt.preventDefault()
        this.prevPage()
      }
    },
    triggerJumpEvent (evnt) {
      const value = XEUtils.toNumber(evnt.target.value)
      const current = value <= 0 ? 1 : value >= this.pageCount ? this.pageCount : value
      evnt.target.value = current
      this.jumpPage(current)
    }
  }
}
