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
	<div class="content">
        <div class="logo">
            <img src="/client/images/Logo-StaySthlm.png" alt="StaySthlm - Corporate apartments made easy!">
        </div>
        <div class="content-information">
            <ul>
                <li><strong>Our opeing hours: </strong> 9 am to 5 pm</li>
                <li><strong>Phone: </strong> + 46 (0) 8 410 337 80</li>
                <li><strong>Mail: </strong> info@staysthlm.se</li>
                <li><strong>Adress: </strong> Ranhammarsvägen 4 161 02 Bromma</li>
                <li><strong>Org: </strong> 556811-9977 (Stay in Sweden AB)</li>
              </ul>
        </div>
    </div>
</footer>