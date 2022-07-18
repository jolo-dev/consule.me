---
# try also 'default' to start simple
theme: default
# random image from a curated Unsplash collection by Anthony
# like them? see https://unsplash.com/collections/94734566/slidev
background: https://source.unsplash.com/collection/94734566/1920x1080
# apply any windi css classes to the current slide
# https://sli.dev/custom/highlighters.html
highlighter: shiki
# show line numbers in code blocks
lineNumbers: false
# some information about the slides, markdown enabled
info: |
  ## consule.me
  An easy way to visualise your apps in one single dashboard
# persist drawings in exports and build
drawings:
  persist: false
# use UnoCSS (experimental)
css: unocss
fonts:
  # basically the text
  sans: 'Roboto'
  # for code blocks, inline code, etc.
  mono: 'Fira Code'
---

# consule.me

An easy way to visualise your apps in one single dashboard
<br>
My Stepzen Submission on the 16th of July 2022

---

# Motivation

### Too many tabs open with so many different apps

<br>
<br>

<v-clicks>

- 📝 **Google Calendar** - For your events
- 🎨 **Github Issues** - Working on Github issues
- 🧑‍💻 **Pull Requests**
- 🤹 **Jira**
- **etc.**
</v-clicks>

---
class: flex place-content-center items-center h-screen

---

# Why not consolidate them into one single dashboard?

<style scoped>

.slidev-layout {
  align-items: center
}

</style>

---

# How we built it

<v-clicks>

- [Nuxt 3](https://v3.nuxtjs.org/)
- [Stepzen](https://stepzen.com/) as single source of data fetching
- [gridstack](https://gridstackjs.com/) for interactive Dashboards

</v-clicks>

---

# Challenges we ran into

<v-clicks>

- OAuth is hard
- Cross posting of window events
- Client-Side vs SSR

</v-clicks>

---

# Accomplishments that we're proud of

<v-clicks>

- Finally, an easy way to integrate GraphQL and migrate REST endpoints thanks to Stepzen
- Finally, a nice Use Case to use the Vue-Ecosystem
  - [Nuxt 3](https://v3.nuxtjs.org/)
  - [Vitest](https://vitest.dev/)
  - [UnoCSS](https://github.com/unocss/unocss)
  - [histoire](https://histoire.dev/)


</v-clicks>

---

# What we learned

<v-clicks>

- TDD but hard for testing components..
- Atomic Design principles but sometimes is faster just not to use it...
- Client-Side vs SSR

</v-clicks>

---

# What's next for consule.me

<v-clicks>

- Supabase implementation
- More Views for your Dashboard.
- Implement Actions
- E2E tests
- Hosting

</v-clicks>
