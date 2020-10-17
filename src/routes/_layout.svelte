<script>
	import Nav from '../components/Nav.svelte';
	import GlobalStyle from "../components/GlobalStyle.svelte";
	export let segment;
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