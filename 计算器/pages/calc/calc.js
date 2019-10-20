// pages/calc/calc.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 真正用于计算的字符串
    result: '0', 
    // 显示到屏幕的字符串
    resultTrue:'0',
    resultArr: [],
    arrResult: [],
    symbolOption: ['+', '-', 'x', '/'],
    symbolOptions:[' +  ', ' - ',' x ', ' / '],
    historyArr: [],
    historyArray: []
  }, 
  // 跳转到历史记录 运算页面
  historyPage() {
    wx.navigateTo({
      url: '../history/history',
    })
  },
  pressBtn(e) {
    // 获取字符串的是一个数字
    let firstWord = this.data.result.charAt(0);
    // 如果点击的元素data-id是0，并且 数据是0
    if (e.target.dataset.id == '0' && this.data.result == '0') {
      // 屏幕显示还是原来的数字字符串 0
      this.setData({
        result: '0',
        resultTrue: '0'
      });
      // 以下程序不必执行
      return;
    };
    // 如果点击元素是 不是 0 和 . ，并且结果是0 ;
    if (e.target.dataset.id != '0' && this.data.result == '0' && e.target.dataset.id !== '.') {
      // 屏幕显示该数据
      this.setData({
        result: e.target.dataset.id,
        resultTrue: e.target.dataset.id
      });
      // 以下程序不必执行
      return;
    };
    //  如果一个数的第一个元素是0 ，那么如果点击的元素不是 .  就停止执行接下来的
    if (e.target.dataset.id != '.' && this.data.result.substr(this.data.result.length - 1) == '0' && this.data.symbolOption.includes(this.data.result.substr(this.data.result.length - 2, 1))  ) {
      return;
    };
    // if (e.target.dataset.id == '0' && (this.data.result.substr(this.data.result.length - 1) - 0) == 0 && this.data.symbolOption.includes(this.data.result.substr(this.data.result.length - 2, 1))) {
    //   return;
    // }
    let data = this.data.result;
    let dataArr = data.split('');
    let numArr = [];
    let dataStr; 
    // 遍历得到 . 的索引 要倒着点位 第一个索引 为最后一个点位
    for (var i = dataArr.length - 1; i >= 0; i--) {
      if (dataArr[i] == '.') {
        numArr[numArr.length] = i;
      };
    }; 
    // 如果点击的元素 是 . 并且 .的索引数组大于等于 1  
    if (e.target.dataset.id == '.' && numArr.length >= 1) {
      // 得到 最后一个点位的以后的数的数组
      dataArr = dataArr.splice(numArr[0] + 1);
      // 拼接字符串 
      dataStr = dataArr.join('');
      console.log(dataStr);
      // 如果得到的结果是数字 那么停止执行下面代码 不是完整的数字就继续执行
      if (!isNaN(dataStr - 0)) {
        return;
      }
    };
    console.log(isNaN(parseInt(this.data.result.substr(this.data.result.length - 1)))); 
    // 如果按的是 . 并且 目前最后一位是数字
    if (!isNaN(parseInt(this.data.result.substr(this.data.result.length - 1))) && e.target.dataset.id == '.') { 
      //则可以执行写入屏幕
      this.setData({
        result: this.data.result + e.target.dataset.id,
        resultTrue:this.data.resultTrue + e.target.dataset.id
      }); 
      // 下面的不再执行
      return;
    }; 
    // 如果 按的是 . 并且目前最后一位不是数字
    if (isNaN(parseInt(this.data.result.substr(this.data.result.length - 1))) && e.target.dataset.id == '.') {
      // 则不能继续执行下面代码 
      return;
    }; 
    // 如果屏幕数据长度大于 等于1 并且满足了以上所有条件
    if (this.data.result.length >= 1) { 
      // 可以添加字符入屏幕
      this.setData({
        result: this.data.result + e.target.dataset.id,
        resultTrue: this.data.resultTrue + e.target.dataset.id,
      });
    };
  }, 
  // 退回一个字符
  preBtn(e) {
    // 得到除最后一个字符的所有字符
    let data1 ; 
    let data = this.data.result.substring(0, this.data.result.length - 1);
    // 显示在屏幕上的字符串的最后第二个个字符是 运算符的话
    if (this.data.symbolOption.includes(this.data.resultTrue.substr(this.data.resultTrue.length - 2, 1))) { 
      // 那么需要把它最后三个字符都清除 
      data1 = this.data.resultTrue.substring(0, this.data.resultTrue.length - 3)
    }else { 
      // 否则的话只要清除一个字符 就行了 
      data1 = this.data.resultTrue.substring(0, this.data.resultTrue.length - 1) ;
    } ;
    // 如果屏幕字符长度为1的时候 
    if (this.data.result.length == 1) { 
      // data就是 0
      data = '0';
      data1 = '0' ;
    }; 
    // 写入屏幕
    this.setData({
      result: data ,
      resultTrue:data1
    })
  },
  // 清空
  clearBtn() {
    // 结果直接就是 0
    this.setData({
      result: '0',
      resultTrue:'0'
    })
  },
  // 计算
  jisuanBtn(e) {
    console.log(this.data.resultArr);
    let data,data1;
    let that = this;
    // 遍历运算符 
    this.data.symbolOption.forEach((item, index) => {
     // 如果最后一个字符是数字 
      if (!isNaN(parseInt(that.data.result.substr(that.data.result.length - 1))) && e.target.dataset.symbol == item) { 
      //可以加运算符
        data = that.data.result + item ;
        that.setData({
          result: data,
          resultTrue: that.data.resultTrue + that.data.symbolOptions[index] ,
        }); 
        // 如果最后一个已经有运算符了 那么就替换
      } else if (isNaN(parseInt(that.data.result.substr(that.data.result.length - 1))) && that.data.result.substr(that.data.result.length - 1) != '.' && e.target.dataset.symbol == item) {
        data = that.data.result;
        data = data.substring(0, data.length - 1);
        data1 = that.data.resultTrue ;
        data1 = data1.substring(0,data1.length - 3) ;
        data += item;
        data1 += that.data.symbolOptions[index] ;
        that.setData({
          result: data ,
          resultTrue:data1 
        });
      }
    });
  },
  // 等于 结果
  enqualBtn() { 
    // 得到结果数组 
    let dataArr = this.data.result.split('');
    let dataStr = this.data.result;
    let symbolNum = [];
    let numArr = [];
    let that = this;
    let strs; 
    // 如果最后一个字符是点号 则不能继续执行运算 
    if (this.data.result.substr(this.data.result.length - 1) == '.') {
      return;
    };
    // 如果整条数据是一个数字字符串 
    if (!isNaN(this.data.result - 0)) {
      // 那么结果就是其 该归0归0
      strs = this.data.result + ' = ' + parseFloat(this.data.result);
      this.setData({
        result: parseFloat(this.data.result) + '',
        resultTrue: parseFloat(this.data.result) + ''
      }); 
      // 存储到历史记录 
      this.data.historyArray.push(strs); 
      wx.setStorageSync('calcHistory', this.data.historyArray);
      // 无需执行接下来的操作 
      return;
    } ;
    // 遍历解数组
    dataArr.forEach((item, index) => {
      // 如果选项最终得到 运算符号 
      if (this.data.symbolOption.includes(item)) {
        // 把运算符号索引存于数组 
        symbolNum.push(index);
      };
    });
    console.log(symbolNum);
    let num;
    let total = symbolNum.length;
    console.log(total); 
    // 得到最后一个字符不是运算符号 且不是 . 
    if (!this.data.symbolOption.includes(this.data.result.substr(this.data.result.length - 1, 1)) && this.data.result.substr(this.data.result.length - 1, 1) != '.') {
      // 如果运算符号多余 1 个 
      if (symbolNum.length > 1) { 
        // 使数字与符号分离 形成数组
        symbolNum.forEach((item, index) => {
          if (index == 0) {
            numArr.push(that.data.result.substring(0, item));
            numArr.push(that.data.result.substr(item, 1));
          } else if (index == total - 1) {
            numArr.push(that.data.result.substr(num + 1, item - num - 1));
            numArr.push(that.data.result.substr(item, 1));
            numArr.push(that.data.result.substr(item + 1));
          } else {
            numArr.push(that.data.result.substr(num + 1, item - num - 1));
            numArr.push(that.data.result.substr(item, 1));
          }
          num = item;
        });
        // 如果没有运算符号
      } else if (symbolNum.length == 0) {
        this.setData({
          result: this.data.result,
          resultTrue : this.data.result
        });
        return;
        // 如果只有一个运算符号 
      } else if (symbolNum.length == 1) {
        numArr.push(that.data.result.substring(0, symbolNum[0]));
        numArr.push(that.data.result.substr(symbolNum[0], 1));
        numArr.push(that.data.result.substr(symbolNum[0] + 1));
      }
    }

    console.log(numArr);
    let multiplyDivide = [];
    let mulArrIndex = [];
    // 有运算符的情况下
    if (symbolNum.length > 0) { 
      // 遍历数组
      numArr.forEach((item, index) => { 
        // 得到除与乘符号的索引
        if (item == '/' || item == 'x') {
          mulArrIndex.push(index);
        }
      });
      console.log(mulArrIndex);
    }; 
    // 如果乘除的符号大于 0 个 
    if (mulArrIndex.length > 0) {
      let repeatArray = []; 
      // 使用递归 
      let at = function (num) {
        let arrInner = [];
        // 使用数列的知识得到双层数组
        for (var i = num; i < mulArrIndex.length; i++) {
          if ((mulArrIndex[i] - mulArrIndex[num]) / 2 == i - num) {
            arrInner[arrInner.length] = mulArrIndex[i];
          } else {
            break;
          }
        };
        repeatArray.push(arrInner); 
        // 在乘除数组范围内的时候递归
        if (i <= mulArrIndex.length - 1) {
          at(i);
        }
      };
      at(0);
      let numResult = [];
      console.log(repeatArray); 
      // 因为 乘除优先运算 所以遍历先得到乘除的结果
      repeatArray.forEach((item, index) => {
        let initNum = 1;
        // 如果子数组长度只有 1 的情况下
        if (item.length == 1) {
          if (numArr[item[0]] == 'x') {
            console.log(numArr[item[0] - 1]);
            console.log(numArr[item[0] + 1]);
            initNum = numArr[item[0] - 1] * numArr[item[0] + 1];
          } else if (numArr[item[0]] == '/') {
            initNum = numArr[item[0] - 1] / numArr[item[0] + 1];
          }
          // 子数组长度大于 1 的情况下
        } else if (item.length > 1) {
          initNum = numArr[item[0] - 1];
          for (var i = 0; i < item.length; i++) {
            if (numArr[item[i]] == 'x') {
              initNum *= numArr[item[i] + 1];
            } else if (numArr[item[i]] == '/') {
              initNum /= numArr[item[i] + 1];
            }
          };
        }
        numResult.push(initNum);
      })
      console.log(numResult);
      console.log(numArr);
      console.log(mulArrIndex);
     // 将得到的结果添加到数字与运算符号分裂的数组里 一定要从后往前插 否则乱套
      for (var i = repeatArray.length - 1; i >= 0; i--) {
        if (repeatArray[i].length == 1) {
          numArr.splice(repeatArray[i][0] - 1, 3, numResult[i]);
        } else if (repeatArray[i].length > 1) {
          numArr.splice(repeatArray[i][0] - 1, repeatArray[i][repeatArray[i].length - 1] + 3 - repeatArray[i][0], numResult[i]);
        }
      }
      console.log(numArr);

    };
    console.log(numArr);  
    // 如果 numArr只有一个数
    if (numArr.length == 1) { 
      // 如果结果是 infinity 说明运算中有非法运算 比如除数为0
      if (numArr[0] == 'Infinity') {
        wx.showModal({
          title: '注意',
          content: '除数不能为0,否则计算错误',
        }); 
        // 不能继续执行
        return;
      }; 
      // 记录 运算和 结果
      strs = this.data.resultTrue + ' = ' + numArr[0] + '';
      this.setData({
        result: numArr[0] + '',
        resultTrue: numArr[0] + ''
      });
     // 保存运算和结果 
      this.data.historyArray.push(strs);
      wx.setStorageSync('calcHistory', this.data.historyArray); 
      // 如果numArr大于 1 个 
    } else if (numArr.length > 1) { 
      // 存储运算结果
      let resultNum;
      resultNum = numArr[0] - 0; 
      // 遍历 数组
      numArr.forEach((item, index) => { 
        // 如果是 加号 
        if (item == '+') {
          resultNum += numArr[index + 1] - 0
          // 如果是减号
        } else if (item == '-') {
          resultNum -= numArr[index + 1] - 0
        }
      }); 
      // 如果运算结果是 infinity
      if (resultNum == 'Infinity') { 
        // 弹出 提示框
        wx.showModal({
          title: '注意',
          content: '除数不能为0,否则计算错误',
        }); 
        // 不能执行下面程序
        return;
      } ; 
      // 记录运算与结果 
      strs = this.data.resultTrue + ' = ' + resultNum + ''; 
      // 存于数组 
      this.data.historyArray.push(strs);
      // 屏幕显示结果 
      this.setData({
        result: resultNum + '',
        resultTrue:resultNum + ''
      }); 
      // 存于微信本地内存
      wx.setStorageSync('calcHistory', this.data.historyArray);
    };

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
     let length = this.data.result.length ;
     let num = Math.ceil(length / 12) ; 
    //  if() {

    //  }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})