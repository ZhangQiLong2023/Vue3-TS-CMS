```js
/**
 * export default defineComponent({})
 * 这样导出的是一个组件的描述对象而不是一个组件实例相当于导出了一个类
 * 对象 Demo{name:"Demo",components:setup:data,methods:foo()}  --> 组件的描述
 *
 * 当我们在另一个组件中使用的时候  <login-account/> 是根据导出的对象创建出来的描述对象 Demo
 *
 * 使用第二次就是创建出第二个组件实例
 * 所以：当我们使用组件实例的时候
 *
 * const accountRef = ref<InstanceType<typeof LoginAccount>>()
 *
 * 就相当于是  const p = ref<Person>()
 * 但是： 这里的 LoginAccount 并不是真正意义上的类
 * 所以通过 typeof 获取到类型 然后通过 InstanceType 获取到**拥有构造函数的实例**
 * accountRef 就是通过 LoginAccount 描述对象创建出来的
 *
 * 只有这样我们才能 accountRef.foo() 调用里面的方法获取里面的属性
 */
```
