<!--
 * @Author: chenkangxu
 * @Date: 2021-11-01 19:20:30
 * @LastEditTime: 2022-06-03 13:46:46
 * @LastEditors: chenkangxu
 * @Description: 基于vxe-table的子table
 * @Github: 
-->
<template>
  <component
    :is="commonColumn(col.childTableCols && Array.isArray(col.childTableCols))"
    v-bind="commonProps(col)"
  >
    <template v-if="col.childTableCols">
      <child-table-plus
        v-for="item in col.childTableCols"
        :key="item.id"
        :col="item"
        :size="size"
      ></child-table-plus>
    </template>
    <template v-if="!col.childTableCols" slot-scope="scope">
      <!-- jsx 返回jsx数据-->
      <render
        v-if="col.type === 'jsx'"
        :render="col.render && col.render(scope, col.field)"
      ></render>
      <!-- 排序 -->
      <span v-if="col.type === 'seq'">{{ scope.$rowIndex + 1 }}</span>
      <!-- html -->
      <span
        v-if="col.type === 'html'"
        v-html="
          col.html && typeof col.html === 'function'
            ? col.html(scope.row)
            : scope.row[col.field]
        "
      ></span>
      <!-- 按钮 -->
      <span v-if="col.type === 'button'">
        <el-button
          v-for="btn in typeof col.btnList === 'function'
            ? col.btnList(scope.row)
            : col.btnList"
          :key="
            (typeof btn.label).toLowerCase() == 'string' ? btn.label : btn.auth
          "
          :disabled="btn.disabled && btn.disabled(scope.row)"
          :type="btn.type"
          :size="btn.size || col.size"
          :icon="btn.icon"
          :plain="btn.plain"
          :round="btn.round"
          :circle="btn.circle"
          @click.stop="btn.handle && btn.handle(scope.row, scope.$index)"
          >{{
            (typeof btn.label).toLowerCase() == "string"
              ? btn.label
              : btn.label(scope.row)
          }}
        </el-button>
      </span>
      <!-- 输入框 -->
      <el-input
        v-if="col.type === 'input'"
        :type="col.inputType"
        v-model="scope.row[col.field]"
        :size="size || col.size"
        :readonly="col.readonly"
        :disabled="col.isDisabled && col.isDisabled(scope.row)"
        @input="col.input && col.input(scope.row)"
        @focus="col.focus && col.focus(scope.row, scope.$index)"
        @change="col.change && col.change(scope.row)"
      >
        <template slot="append" v-if="col.append">
          <el-button
            v-if="col.append.type === 'button'"
            :icon="col.append.icon"
            @click="
              col.append.click && col.append.click(scope.row, scope.$index)
            "
            >{{ col.append.name }}</el-button
          >
        </template>
        <template slot="prepend" v-if="col.prepend">
          <el-button
            v-if="col.prepend.type === 'button'"
            :icon="col.prepend.icon"
            @click="
              col.prepend.click && col.prepend.click(scope.row, scope.$index)
            "
            >{{ col.prepend.name }}</el-button
          >
        </template>
      </el-input>

      <!-- 下拉框 -->
      <el-select
        v-if="col.type === 'select'"
        v-model="scope.row[col.field]"
        :size="size || col.size"
        :props="col.props"
        :disabled="col.isDisabled && col.isDisabled(scope.row)"
        :allow-create="col.allowCreate"
        :filterable="col.filterable"
        @change="col.change && col.change(scope.row)"
      >
        <el-option
          v-for="op in col.options"
          :label="op.label"
          :value="op.value"
          :key="op.value"
        ></el-option>
        <template slot="prefix" v-if="col.prefix">
          <el-button
            v-if="col.prefix.type === 'button'"
            :icon="col.prefix.icon"
            @click.stop="
              col.prefix.click && col.prefix.click(scope.row, scope.$index)
            "
            >{{ col.prefix.name }}</el-button
          >
          <span
            v-if="col.prefix.type === 'span'"
            @click.stop="
              col.prefix.click && col.prefix.click(scope.row, scope.$index)
            "
            >{{ col.prefix.name }}</span
          >
        </template>
      </el-select>
      <!-- 单选组 -->
      <el-radio-group
        v-if="col.type === 'radioGroup'"
        v-model="scope.row[col.field]"
        :disabled="col.isDisabled && col.isDisabled(scope.row)"
        :size="size || col.size"
        @change="col.change && col.change(scope.row)"
      >
        <el-radio v-for="ra in col.radios" :label="ra.value" :key="ra.value">{{
          ra.label
        }}</el-radio>
      </el-radio-group>
      <!-- 复选框 -->
      <el-checkbox-group
        v-if="col.type === 'checkboxGroup'"
        v-model="scope.row[col.field]"
        :disabled="col.isDisabled && col.isDisabled(scope.row)"
        :size="size || col.size"
        @change="col.change && col.change(scope.row)"
      >
        <el-checkbox
          v-for="ra in col.checkboxs"
          :disabled="ra.disabled"
          :label="ra.value"
          :key="ra.value"
          :true-label="ra.trueLabel"
          :false-label="ra.falseLabel"
          >{{ ra.label }}</el-checkbox
        >
      </el-checkbox-group>
      <!-- 评价 -->
      <el-rate
        v-if="col.type === 'rate'"
        v-model="scope.row[col.field]"
        :disabled="col.isDisabled && col.isDisabled(scope.row)"
        :size="size || col.size"
        @change="col.change && col.change(scope.row)"
      ></el-rate>
      <!-- 开关 -->
      <el-switch
        v-if="col.type === 'switch'"
        v-model="scope.row[col.field]"
        :size="size || col.size"
        :active-value="col.values && col.values[0]"
        :inactive-value="col.values && col.values[1]"
        :disabled="col.isDisabled && col.isDisabled(scope.row)"
        @change="col.change && col.change(scope.row)"
      ></el-switch>
      <!-- 级联 -->
      <el-cascader
        v-if="col.type === 'cascader'"
        v-model="scope.row[col.field]"
        :children="col.children"
        :filterable="col.filterable"
        :options="col.options"
        :allow-create="col.allowCreate"
        :props="{ expandTrigger: 'hover' }"
        @change="col.change && col.change(scope.row, $event)"
      ></el-cascader>
      <!-- 图像 -->
      <!-- <el-image v-if="col.type==='image'" :src="scope.row[col.prop]"/> -->
      <el-popover
        v-if="col.type === 'image' && col.popover"
        placement="right"
        :title="col.title"
        trigger="hover"
        width="500"
      >
        <img
          :src="
            (col.formatter &&
              col.formatter(col.field, scope.row, col.codeType)) ||
            scope.row[col.field]
          "
          style="width: 100%"
        />
        <img
          slot="reference"
          :src="
            (col.formatter &&
              col.formatter(col.field, scope.row, col.codeType)) ||
            scope.row[col.field]
          "
          :alt="scope.row[col.field]"
          style="height: 60px; width: 60px; border-radius: 50%"
        />
      </el-popover>
      <img
        v-if="col.type === 'image' && !col.popover"
        @click="col.handle && col.handle(scope.row)"
        :src="
          (col.formatter &&
            col.formatter(col.field, scope.row, col.codeType)) ||
          scope.row[col.field]
        "
        :alt="scope.row[col.field]"
        style="height: 60px; width: 60px; border-radius: 10px"
      />
      <!-- 滑块 -->
      <el-slider
        v-if="col.type === 'slider'"
        v-model="scope.row[col.field]"
        :disabled="col.isDisabled && col.isDisabled(scope.row)"
        :size="size || col.size"
        @change="col.change && col.change(scope.row)"
      ></el-slider>
      <span v-if="col.type === 'foreachtext'">
        <p
          style="cursor: pointer; color: blue"
          @click="col.downloadmp4(val)"
          v-for="(val, index) in scope.row[col.field]"
          :key="index"
        >
          {{ val.fileName }}
        </p>
      </span>
      <span
        v-if="col.type === 'link'"
        @click="col.click && col.click(scope.row)"
      >
        <p style="cursor: pointer; color: blue">
          {{ scope.row[col.field] }}
        </p>
      </span>
      <!-- 默认 -->
      <span
        v-if="!col.type"
        @click="col.click && col.click(scope.row)"
        @dblclick="col.dblclick && col.dblclick(scope.row)"
        :style="col.colStyle && col.colStyle(scope.row)"
        :size="size || col.size"
        :class="col.colClass && col.colClass(scope.row)"
        >{{
          (col.formatter &&
            col.formatter(col.field, scope.row, col.codeType)) ||
          scope.row[col.field]
        }}</span
      >
    </template>
  </component>
</template>

<script>
import Render from "../render/index.vue";
export default {
  name: "childTablePlus",
  components: { Render },
  data() {
    return {};
  },
  props: {
    col: {
      type: Object,
      default: () => {
        return {};
      },
    },
    size: {
      type: String,
    },
  },
  computed: {
    //整合vxe-colgroup与vxe-column
    commonColumn() {
      return (hasChild) => {
        if (hasChild == true) {
          // console.log('vxe-colgroup');
          return "vxe-colgroup";
        }
        // console.log('vxe-column');
        return "vxe-column";
      };
    },
    //根据类型不同返回不同的属性,传入判断条件
    /**
     * 主要在type上的整合 目前能使用的是checkbox,radio,expand
     */
    commonProps() {
      return (col) => {
        //checkbox,radio,expand使用vxe自带的;seq自己进行辅助实现
        if (
          col.type == "seq" ||
          col.type == "checkbox" ||
          col.type == "radio" ||
          col.type == "expand"
        ) {
          return col;
        }
        //其余的就是临时返回一个假的欺骗vxe-column
        return {
          ...col,
          type: undefined,
        };
      };
    },
  },
};
</script>

<style lang="scss" scoped>
</style>