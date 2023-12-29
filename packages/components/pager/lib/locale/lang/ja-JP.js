export default {
  vxe: {
    loading: {
      text: 'Loading'
    },
    error: {
      groupFixed: 'グループのヘッダを使用すると、固定列はグループで設定しなければなりません',
      groupMouseRange: 'グループ化ヘッダーと「{0}」は同時に使用できません。これによりエラーが発生する可能性があります',
      groupTag: '分组列头应该使用 "{0}" 而不是 "{1}"，这可能会出现错误',
      scrollErrProp: '启用虚拟滚动后不支持该参数 "{0}"',
      scrollXNotGroup: '横向虚拟滚动不支持分组表头，需要设置 "scroll-x.enabled=false" 参数，否则可能会导致出现错误',
      errConflicts: '参数 "{0}" 与 "{1}" 有冲突',
      unableInsert: '指定された位置に挿入できない',
      useErr: '"{0}" モジュールをインストールする際にエラーが発生し,順序が正しくない可能性があり,依頼するモジュールはTableの前にインストールする必要がある',
      barUnableLink: 'ツールバーはフォームを関連付けることができない',
      expandContent: '拡張行スロットは "content" である必要があります。正しいかどうかを確認してください',
      reqModule: '"{0}" モジュールが必要',
      reqProp: '必要な "{0}" パラメーターが欠落しているため、エラーが発生する可能性があります',
      emptyProp: '"{0}" propertyはemptyが許可されていません',
      errProp: 'サポートされていないパラメーター "{0}"，"{1}" の可能性があります',
      colRepet: 'column.{0}="{0}" が重複しているため、機能が使えなくなることがあります。',
      notFunc: 'method "{0}" はありません',
      notSlot: 'slot "{0}" はありません',
      noTree: 'Tree structureは "{0}" をサポートしていません',
      notProp: 'サポートされていないパラメータ "{0}"',
      coverProp: '"{0}" 的参数 "{1}" 被覆盖，这可能会出现错误',
      delFunc: '"{0}" functionは非推奨です、"{1}"を使用してください',
      delProp: '"{0}" propertyは非推奨です、"{1}"を使用してください',
      delEvent: 'イベント "{0}" は廃止されました。 "{1}" を使用してください',
      removeProp: 'パラメーター "{0}" は非推奨および非推奨です。エラーが発生する可能性があります',
      errFormat: '全局的格式化内容应该使用 "VXETable.formats" 定义，挂载 "formatter={0}" 的方式已不建议使用',
      notType: 'サポートされていないファイルの種類 "{0}"',
      notExp: 'ブラウザはインポート/エクスポートをサポートしていません',
      impFields: 'インポートに失敗しました。フィールド名とデータ形式が正しいかどうかを確認してください',
      treeNotImp: 'ツリーテーブルはインポートをサポートしていません'
    },
    renderer: {
      search: '搜索',
      cases: {
        equal: '等于',
        unequal: '不等于',
        gt: '大于',
        ge: '大于或等于',
        lt: '小于',
        le: '小于或等于',
        begin: '开头是',
        notbegin: '开头不是',
        endin: '结尾是',
        notendin: '结尾不是',
        include: '包含',
        exclude: '不包含',
        between: '介于',
        custom: '自定义筛选',
        insensitive: '不区分大小写',
        isSensitive: '区分大小写'
      },
      combination: {
        menus: {
          sortAsc: '升序',
          sortDesc: '降序',
          fixedColumn: '锁定列',
          fixedGroup: '锁定组',
          cancelFixed: '取消锁定',
          fixedLeft: '锁定左侧',
          fixedRight: '锁定右侧',
          clearFilter: '清除筛选',
          textOption: '文本筛选',
          numberOption: '数值筛选'
        },
        popup: {
          title: '自定义筛选的方式',
          currColumnTitle: '当前列：',
          and: '与',
          or: '或',
          describeHtml: '可用 ? 代表单个字符<br/>用 * 代表任意多个字符'
        },
        empty: '(空白)',
        notData: '无匹配项'
      }
    },
    pro: {
      area: {
        mergeErr: '无法对合并单元格进行该操作',
        multiErr: '无法对多重选择区域进行该操作',
        extendErr: '如果延伸的区域包含被合并的单元格，所有合并的单元格需大小相同',
        pasteMultiErr: '无法粘贴，需要相同大小的复制的区域和粘贴的区域才能执行此操作'
      },
      fnr: {
        title: '查找和替换',
        findLabel: '查找',
        replaceLabel: '替换',
        findTitle: '查找内容：',
        replaceTitle: '替换为：',
        tabs: {
          find: '查找',
          replace: '替换'
        },
        filter: {
          re: '正则表达式',
          whole: '全词匹配',
          sensitive: '区分大小写'
        },
        btns: {
          findNext: '查找下一个',
          findAll: '查找全部',
          replace: '替换',
          replaceAll: '替换全部',
          cancel: '取消'
        },
        header: {
          seq: '#',
          cell: '单元格',
          value: '值'
        },
        empty: '(空值)',
        reError: '无效的正则表达式',
        recordCount: '已找到 {0} 个单元格',
        notCell: '找不到匹配的单元格',
        replaceSuccess: '成功替换 {0} 个单元格'
      }
    },
    table: {
      emptyText: 'データがありません',
      allTitle: '全て選択/取消',
      seqTitle: '#',
      confirmFilter: '完了',
      resetFilter: 'リセット',
      allFilter: '全て',
      sortAsc: '昇順',
      sortDesc: '降順',
      filter: '選択した列をフィルタする',
      impSuccess: '{0} レコードが正常にインポートされました',
      expLoading: '正在导出中',
      expSuccess: 'エクスポートが成功しました',
      expOriginFilename: 'エクスポート_{0}',
      expSrcFilename: 'エクスポート_ソース_{0}',
      customTitle: '列设置',
      customAll: '全部',
      customConfirm: '确认',
      customRestore: '还原'
    },
    grid: {
      selectOneRecord: '少なくとも1つのレコードを選択してください',
      deleteSelectRecord: 'レコードを削除してもよろしいですか？',
      removeSelectRecord: 'レコードを削除してもよろしいですか？',
      dataUnchanged: 'データは変更されませんでした',
      delSuccess: '選択したレコードを削除しました',
      saveSuccess: '保存しました',
      operError: 'エラーが発生しました。操作が失敗しました'
    },
    select: {
      search: 'Search',
      loadingText: 'Loading',
      emptyText: 'データがありません'
    },
    pager: {
      goto: '移動',
      pagesize: '{0}件/ページ',
      total: '全 {0} 件',
      pageClassifier: '',
      prevPage: '前のページ',
      nextPage: '次のページ',
      prevJump: '前のページに移動',
      nextJump: '次のページに移動'
    },
    alert: {
      title: 'メッセージ'
    },
    button: {
      confirm: '完了',
      cancel: 'キャンセル'
    },
    import: {
      modes: {
        covering: 'カバー',
        insert: '追加'
      },
      impTitle: '导入数据',
      impFile: 'ファイル名',
      impSelect: 'ファイルを選択',
      impType: 'ファイルの種類',
      impOpts: '参数设置',
      impConfirm: 'インポート',
      impCancel: '取消'
    },
    export: {
      types: {
        csv: 'CSV (カンマ区切り)(*.csv)',
        html: 'webページ(*.html)',
        xml: 'XML データ(*.xml)',
        txt: 'テキストファイル（タブ区切り）(*.txt)',
        xls: 'Excel 97-2003 ワークブック(*.xls)',
        xlsx: 'Excel ワークブック(*.xlsx)',
        pdf: 'PDF (*.pdf)'
      },
      modes: {
        current: '現在のデータ(現在のページのデータ)',
        selected: '選択したデータ(現在のページで選択したデータ)',
        all: '全量データ（全ページ分のデータを含む）'
      },
      printTitle: '打印数据',
      expTitle: '导出数据',
      expName: 'ファイル名',
      expNamePlaceholder: 'ファイル名を入力してください',
      expSheetName: 'タイトル',
      expSheetNamePlaceholder: 'タイトルを入力してください',
      expType: '保存タイプ',
      expMode: '选择字段',
      expCurrentColumn: '全てのフィールド',
      expColumn: '选择字段',
      expOpts: '参数设置',
      expOptHeader: 'ヘッダー',
      expHeaderTitle: 'ヘッダーをエクスポート',
      expOptFooter: 'フッター',
      expFooterTitle: 'フッターをエクスポート',
      expOptColgroup: '分组表头',
      expColgroupTitle: '如果存在，则支持带有分组结构的表头',
      expOptMerge: '合并',
      expMergeTitle: '如果存在，则支持带有合并结构的单元格',
      expOptAllExpand: '展开层级',
      expAllExpandTitle: '如果存在，则支持将带有层级结构的数据全部展开',
      expOptUseStyle: '样式',
      expUseStyleTitle: '如果存在，则支持带样式的单元格',
      expOptOriginal: 'ソースデータ',
      expOriginalTitle: '如果为源数据，则支持导入到表格中',
      expPrint: '印刷',
      expConfirm: 'エクスポート',
      expCancel: '取消'
    },
    modal: {
      zoomIn: '最大化',
      zoomOut: '縮小',
      close: '閉じる'
    },
    form: {
      folding: '展開を戻す',
      unfolding: '展開'
    },
    toolbar: {
      import: 'インポート',
      export: 'エクスポート',
      print: '印刷',
      refresh: '再読み込み',
      zoomIn: 'フルスクリーン',
      zoomOut: '縮小',
      custom: 'カスタム設定',
      customAll: '全部',
      customConfirm: '確定',
      customRestore: '復元'
    },
    input: {
      date: {
        m1: '1月',
        m2: '2月',
        m3: '3月',
        m4: '4月',
        m5: '5月',
        m6: '6月',
        m7: '7月',
        m8: '8月',
        m9: '9月',
        m10: '10月',
        m11: '11月',
        m12: '12月',
        quarterLabel: '{0} 年',
        monthLabel: '{0} 年',
        dayLabel: '{0} 年 {1}',
        labelFormat: {
          date: 'yyyy-MM-dd',
          time: 'HH:mm:ss',
          datetime: 'yyyy-MM-dd HH:mm:ss',
          week: 'yyyy 年 WW',
          month: 'yyyy-MM',
          quarter: 'yyyy 年第 q 季度',
          year: 'yyyy'
        },
        weeks: {
          w: '曜日',
          w0: '日',
          w1: '月',
          w2: '火',
          w3: '水',
          w4: '木',
          w5: '金',
          w6: '土'
        },
        months: {
          m0: '1月',
          m1: '2月',
          m2: '3月',
          m3: '4月',
          m4: '5月',
          m5: '6月',
          m6: '7月',
          m7: '8月',
          m8: '9月',
          m9: '10月',
          m10: '11月',
          m11: '12月'
        },
        quarters: {
          q1: '第一季度',
          q2: '第二季度',
          q3: '第三季度',
          q4: '第四季度'
        }
      }
    }
  }
}
