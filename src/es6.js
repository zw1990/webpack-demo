export default function _es6 (){
  console.log('msg222')
  class Animal {
      constructor(){
          this.type = 'animal'
      }
      says(say){
          console.log(this.type + ' says ' + say)
      }
  }

  let animal = new Animal()
  animal.says('hello') //animal says hello

  class Cat extends Animal {
      constructor(){
          super()
          this.type = 'cat'
      }
  }

  let cat = new Cat()
  cat.says('hello') //cat says hello
}