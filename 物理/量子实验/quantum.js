/*
 * @Description: 
 * @version: 
 * @Author: chenbh
 * @Date: 2021-03-19 16:41:39
 * @LastEditors: chenbh
 * @LastEditTime: 2021-03-19 18:03:38
 */
function Rabbit() {
  for(let stateName in Rabbit.States) {
    this[stateName] = null
  }
}

Rabbit.States = {
  color: ['white', 'black'],
  gender: ['female', 'male']
}

function Watcher(stateName) {
  this.stateName = stateName
}

Watcher.prototype = {
  watch(rabbit) {
    for(let stateName in Rabbit.States) {
      if (stateName !== this.stateName) rabbit[stateName] = null
    }
    rabbit[this.stateName] = rabbit[this.stateName] || (Math.random() < .5 ? Rabbit.States[this.stateName][0] : Rabbit.States[this.stateName][1])
    return rabbit[this.stateName]
  }
}

function test(stateNameList) {
  conditionList = conditionList || []
  console.log('实验开始')
  const rabbit = new Rabbit()
  stateNameList.forEach((stateName, index) => {
    let state = new Watcher(stateName).watch(rabbit)
    console.log(state)
  })
  console.log('实验完成')
}

function testMulti(times, ...stateNameList) {
  Array(times).fill(undefined).forEach(() => test(stateNameList))
  console.log()
}

// testMulti(4, 'color')
// testMulti(4, 'gender')
// testMulti(4, 'color', 'color')
testMulti(4, 'color', 'gender')
