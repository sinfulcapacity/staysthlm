<script>
	import Nav from '../components/Nav.svelte';
	import GlobalStyle from "../components/GlobalStyle.svelte";
	export let segment;

	// const body = document.querySelector("body");
    // const navbar = document.querySelector(".navbar");
    // const menuBtn = document.querySelector(".menu-btn");
    // const cancelBtn = document.querySelector(".cancel-btn");
    // menuBtn.onclick = ()=>{
    //   navbar.classList.add("show");
    //   menuBtn.classList.add("hide");
    //   body.classList.add("disabled");
    // }
    // cancelBtn.onclick = ()=>{
    //   body.classList.remove("disabled");
    //   navbar.classList.remove("show");
    //   menuBtn.classList.remove("hide");
    // }
    // window.onscroll = ()=>{
    //   this.scrollY > 20 ? navbar.classList.add("sticky") : navbar.classList.remove("sticky");
    // }
</script>

<Nav {segment}/>

<main>
	<GlobalStyle />
	<slot></slot>
</main>

<footer>
	<h3>
		© Copyright Stay in Sweden AB. - All Rights Reserved 2020
	</h3>
</footer>