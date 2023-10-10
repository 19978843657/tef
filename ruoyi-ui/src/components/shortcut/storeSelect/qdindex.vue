<template>
    <el-select
      v-model="myValue"
      :multiple="multiple"
      filterable
      :disabled="disabled"
      remote
      reserve-keyword
      placeholder="请输入关键词"
      :remote-method="remoteMethod"
      :loading="loading"
    >
      <el-option
        v-for="item in options"
        :key="item.storeId"
        :label="item.storeName"
        :value="item.storeName"
      />
    </el-select>
  </template>
  
  <script>

  import { listInfo } from '@/api/material/base/qindex'
  
  export default {
    name: 'toreSelect',
    props: {
      value: {
        type: [Object, String],
        default: null
      },
      multiple: {
        type: Boolean,
        default: false
      },
      disabled: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        options: [],
        list: [],
        loading: false
      }
    },
    computed: {
      myValue: {
        get() {
          return this.$props.value
        },
        set(v) {
          this.$emit('change', v)
          this.$emit('input', v)
        }
      }
    },
    mounted() {
      this.remoteMethod()
    },
    methods: {
      remoteMethod(query = '') {
        // if (query !== '') {
        //   this.loading = true
        //   listInfo({ storeName: query }).then(res => {
        //     this.loading = false
        //     this.options = res.rows
        //   })
        // } else {
        //   this.options = []
        // }
        this.loading = true
        listInfo({ storeName: query }).then(res => {
          this.loading = false
          this.options = res.rows || []
        })
      }
    }
  }
  </script>
  
  <style>
  
  </style>
  