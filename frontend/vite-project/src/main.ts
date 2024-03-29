import './app.css'
import App from './App.svelte'
import { signup, login } from './api'

const app = new App({
  target: document.getElementById('app')!,
})

export default app
