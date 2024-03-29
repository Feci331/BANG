<script lang="ts">
  import { signup, login, createGame } from "./api";
  import { safeFetch } from "./lib/safeFetch";

  let name = "";
  let password = "";
  let success: Boolean | null = null;
  let signupSuccess: Boolean | null = null;
  let loginSuccess: Boolean | null = localStorage.getItem("token")
    ? true
    : null;

  const handleSingup = async () => {
    let response = await signup(name, password);
    success = response.success;
  };
  const handleLogin = async () => {
    let response = await login(name, password);
    success = response.success;
    if (response.success) {
      name = "";
      password = "";
      localStorage.setItem("token", response.data.token);
    }
  };

  const handleCreateGame = async () => {
    let response = await createGame();
    console.log(response);
  };

  let logout = () => {
    localStorage.removeItem("token");
    loginSuccess = null;
  };
</script>

<main class="flex flex-col items-center py-16">
  {#if !loginSuccess}
    <section
      class="card card-body max-w-[300px] bg-prymary text-primary-content mb-8"
    >
      <input
        bind:value={name}
        class="input input-bordered"
        type="text"
        placeholder="Name"
      />
      <input
        bind:value={password}
        class="input input-bordered"
        type="text"
        placeholder="password"
      />
      <button on:click={handleSingup} class="btn btn-success">Signup</button>
      <button on:click={handleLogin} class="btn btn-success">Login</button>
    </section>

    <!-- Signup rész -->
    <section>
      {#if signupSuccess === true}
        <section
          class="alert alert-success flex justify-between max-w-[300px] my-8"
        >
          Success!!!
          <button on:click={handleSingup} class="btn btn-ghost">Close</button>
        </section>
      {:else if signupSuccess === false}
        <section
          class="alert alert-error flex justify-between max-w-[300px] my-8"
        >
          Error!!!
          <button on:click={() => (signupSuccess = null)} class="btn btn-ghost"
            >Close</button
          >
        </section>
        <!-- Login rész -->
      {:else if loginSuccess === false}
        <section
          class="alert alert-error flex justify-between max-w-[300px] my-8"
        >
          Error!!!
          <button on:click={() => (loginSuccess = null)} class="btn btn-ghost"
            >Close</button
          >
        </section>
      {/if}
    </section>
  {/if}
</main>

<main class="flex flex-col items-center py-16">
  {#if loginSuccess}
    <section class="aler alert-success flex justify-between max-w-[300px]">
      Success!!!
      <button on:click={logout} class="btn btn-ghost">Logout</button>
      <button on:click={handleCreateGame} class="btn btn-ghost"
        >Create demo</button
      >
    </section>
  {/if}
</main>

<style lang="postcss">
</style>
