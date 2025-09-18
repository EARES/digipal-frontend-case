import { useUserStore } from "@/stores/user";

export default {
  setup() {
    const userStore = useUserStore();

    const { username, email, isAdmin } = userStore;

    function updateUsername() {
      userStore.setUsername("newUsername");
      console.log(username); // What will this log? - console log will log old value of username. Because it's not reactive, it's just defined as value.
    }
    return {
      username,
      email,
      isAdmin,
      updateUsername,
    }
  }
}

// Solution 1:

import { useUserStore } from "@/stores/user";
import { computed } from "vue";

export default {
  setup() {
    const userStore = useUserStore();

    const username = computed(() => userStore.username);
    const email = computed(() => userStore.email);
    const isAdmin = computed(() => userStore.isAdmin);

    function updateUsername() {
      userStore.setUsername("newUsername");
      console.log(userStore.username);
    }
    return {
      username,
      email,
      isAdmin,
      updateUsername,
    }
  }
}

// Solution 2:

import { useUserStore } from "@/stores/user";
import { computed } from "vue";

export default {
  setup() {
    const userStore = useUserStore();

    const username = computed(() => userStore.username);
    const email = computed(() => userStore.email);
    const isAdmin = computed(() => userStore.isAdmin);

    function updateUsername() {
      userStore.setUsername("newUsername");
      console.log(username);
    }
    return {
      username,
      email,
      isAdmin,
      updateUsername,
    }
  }
}

// how would you explain this concept to a junior developer who is new to Vue 3 and Pinia?

// TL;DR: i explain the vue first with trandational way, then reactivity concept, finally pinia and how we can use it with vue 3 composition api.

// if he/she new for all vue system i explain the vue first using html,css and pure javascript. Then i tell about new features about vue 3 and reactivity. Why we need to use reactive instead of normal variables.
// For vue i show some demo which tell how is the syntax works. Html, style and script parts. Maybe i show first optional api to show tradional way then how we can write same things on composition api.
// With that i already explain the reactivty concept. Then i tell about pinia. First i just tell the state management; If data getting bigger and hard to control it we can use state management tools like pinia or vuex.
// after that showing pinia working system, how we can install and use it. Then i show the how data is keeping with pinia and how we can use it in our components. Then show set change data, and get changed data.
// finally maybe i can show some examples or boilerplates to understand better (like api calls with pinia, local storage with pinia etc)
