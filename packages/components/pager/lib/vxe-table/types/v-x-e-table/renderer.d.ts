import { CreateElement, VNode } from 'vue'
import { RowInfo } from '../component'
import { Table } from '../table'
import { Grid } from '../grid'
import { ColumnInfo, ColumnCellRenderOptions, ColumnContentRenderOptions } from '../column'
import { ColumnExportCellRenderParams, ColumnExportFooterRenderParams } from '../export'
import { ColumnEditRenderOptions, ColumnEditRenderParams } from '../edit'
import { ColumnFooterRenderParams } from '../footer'
import { ColumnFilterRenderOptions, ColumnFilterRenderParams, ColumnFilterMethodParams, ColumnFilterResetParams } from '../filter'
import { ToolbarButtonRenderOptions, ToolbarButtonRenderParams, ToolbarToolRenderOptions, ToolbarToolRenderParams } from '../toolbar'
import { FormItemRenderOptions, FormItemRenderParams, FormItemVisibleParams, FormItemResetParams } from '../form-item'

/**
 * 渲染器
 */
export interface VxeGlobalRenderer {
  mixin(map: { [name: string]: RendererMapOptions }): VxeGlobalRenderer;
  get(name: string): RendererMapOptions;
  add(name: string, options: RendererMapOptions): VxeGlobalRenderer;
  delete(name: string): VxeGlobalRenderer;
}

export interface RendererMapOptions {
  /**
   * 请使用 filterClassName
   * @deprecated
   */
  className?: string;
  /**
   * 请使用 showFilterFooter
   * @deprecated
   */
  isFooter?: boolean;

  // 筛选渲染
  filterClassName?: string | ((params: ColumnFilterRenderParams) => string | { [key: string]: boolean })
  showFilterFooter?: boolean;
  renderFilter?(h: CreateElement, renderOpts: ColumnFilterRenderOptions, params: ColumnFilterRenderParams): VNode[] | string[];
  filterMethod?(params: ColumnFilterMethodParams): boolean;
  filterResetMethod?(params: ColumnFilterResetParams): void;
  // 默认行为
  defaultFilterMethod?(params: ColumnFilterMethodParams): boolean;

  // 单元格渲染
  cellClassName?: string | ((params: ColumnCellRenderParams | ColumnEditRenderParams) => string | { [key: string]: boolean })
  renderHeader?(h: CreateElement, renderOpts: ColumnCellRenderOptions | ColumnEditRenderOptions, params: ColumnCellRenderParams | ColumnEditRenderParams): VNode[] | string[];
  renderDefault?(h: CreateElement, renderOpts: ColumnCellRenderOptions | ColumnEditRenderOptions, params: ColumnCellRenderParams | ColumnEditRenderParams): VNode[] | string[];
  renderFooter?(h: CreateElement, renderOpts: ColumnCellRenderOptions | ColumnEditRenderOptions, params: ColumnFooterRenderParams): VNode[] | string[];
  exportMethod?(params: ColumnExportCellRenderParams): string;
  footerExportMethod?(params: ColumnExportFooterRenderParams): string;

  // 编辑渲染
  autofocus?: string | ((params: ColumnCellRenderParams | ColumnEditRenderParams) => HTMLElement | null);
  renderEdit?(h: CreateElement, renderOpts: ColumnCellRenderOptions | ColumnEditRenderOptions, params: ColumnCellRenderParams | ColumnEditRenderParams): VNode[] | string[];
  renderCell?(h: CreateElement, renderOpts: ColumnCellRenderOptions | ColumnEditRenderOptions, params: ColumnCellRenderParams | ColumnEditRenderParams): VNode[] | string[];

  // 内容渲染
  renderExpand?(h: CreateElement, renderOpts: ColumnContentRenderOptions, params: ColumnCellRenderParams | ColumnEditRenderParams): VNode[] | string[];

  // 工具栏-按钮渲染
  renderToolbarButton?(h: CreateElement, renderOpts: ToolbarButtonRenderOptions, params: ToolbarButtonRenderParams): VNode[] | string[];
  renderToolbarTool?(h: CreateElement, renderOpts: ToolbarToolRenderOptions, params: ToolbarToolRenderParams): VNode[] | string[];

  // 表单-项渲染
  itemClassName?: string | ((params: FormItemRenderParams) => string | { [key: string]: boolean })
  renderItemTitle?(h: CreateElement, renderOpts: FormItemRenderOptions, params: FormItemRenderParams): VNode[] | string[];
  renderItemContent?(h: CreateElement, renderOpts: FormItemRenderOptions, params: FormItemRenderParams): VNode[] | string[];
  itemVisibleMethod?(params: FormItemVisibleParams): boolean;
  itemResetMethod?(params: FormItemResetParams): void;

  // 空内容渲染
  renderEmpty?(h: CreateElement, renderOpts: TableEmptyRender, params: EmptyRenderParams): VNode[] | string[];

  [key: string]: any;
}

/**
 * 渲染选项
 */
export class RenderOptions {
  /**
   * 渲染器名称
   */
  name?: string;
  /**
   * 目标组件渲染的参数
   */
  props?: { [key: string]: any };
  /**
   * 目标组件渲染的属性
   */
  attrs?: { [key: string]: any };
  /**
   * 目标组件渲染的事件
   */
  events?: { [key: string]: Function };
  /**
   * 目标组件渲染的原生事件
   */
  nativeEvents?: { [key: string]: Function };
  [key: string]: any;
}

/**
 * 渲染参数
 */
export class RenderParams {}

/**
 * 选项参数
 */
export interface OptionProps extends RenderParams {
  value?: string;
  label?: string;
  [key: string]: any;
}

/**
 * 分组选项参数
 */
export interface OptionGroupProps extends RenderParams {
  options?: string;
  label?: string;
  [key: string]: any;
}

/**
 * 单元格渲染参数
 */
export interface ColumnCellRenderParams extends TableRenderParams {
  /**
   * 列对象
   */
  column: ColumnInfo;
  /**
   * 相对于 columns 中的索引
   */
  columnIndex: number;
  /**
   * 相对于可视区渲染中的列索引
   */
  $columnIndex: number;
  /**
   * 行数据对象
   */
  row: RowInfo;
  /**
   * 相对于 data 中的索引
   */
  rowIndex: number;
  /**
   * 相对于当前表格数据的索引
   */
  $rowIndex: number;
  isHidden: boolean;
  fixed: string;
  type: string;
}

/**
 * 空内容渲染配置项
 */
export class TableEmptyRender extends RenderOptions { }

export class TableRenderParams extends RenderParams {
  /**
   * 表格实例对象
   */
  $table: Table;
}

export class GridRenderParams extends TableRenderParams {
  /**
   * 高级表格实例对象
   */
  $grid: Grid;
}

export class EmptyRenderParams extends TableRenderParams { }

export interface ColumnDefaultSlotParams extends ColumnCellRenderParams { }
export interface ColumnContentSlotParams extends ColumnContentRenderParams { }
export interface ColumnIconSlotParams extends ColumnIconRenderParams { }

export interface ColumnContentRenderParams extends ColumnCellRenderParams { }
export interface ColumnIconRenderParams extends ColumnCellRenderParams { }
