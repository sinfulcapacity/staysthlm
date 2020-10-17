<script>
  export let segment;
  import companyLogo from "../../static/logo.jpg";
  import featherSprite from "../assets/images/icons/feather-sprite.svg";

  const onNavHideMobileMenu = () => {
    // const body = document.querySelector("body");
    // const navbar = document.querySelector(".navbar");
    // const menuBtn = document.querySelector(".menu-btn");
    // body.classList.remove("disabled");
    // navbar.classList.remove("hidden");
    //menuBtn.classList.remove("hidden");

    const menuList = document.querySelector(".menu-list");
    menuList.classList.remove("show");
  };

  const onNavShowMobileMenu = () => {
    const body = document.querySelector("body");
    const navbar = document.querySelector(".navbar");
    const menuBtn = document.querySelector(".menu-btn");

    const menuList = document.querySelector(".menu-list");
    menuList.classList.add("show");

    //navbar.classList.add("active");
    //menuBtn.classList.add("hidden");
    //body.classList.add("disabled");
  };
</script>

<style lang="scss" src="../style/nav.scss" global>
</style>

<nav class="navbar">
  <div class="content">
    <div class="logo">
      <a href="/"><img alt="StaySthlm" src={companyLogo} /></a>
    </div>
    <ul class="menu-list">
      <div class="icon cancel-btn" on:click={onNavHideMobileMenu}>
        <svg class="feather">
          <use xlink:href="{featherSprite}#close" />
        </svg>
      </div>
      <li>
        <a
          aria-current={segment === undefined ? 'page' : undefined}
          href=".">Home</a>
      </li>
      <li>
        <a
          aria-current={segment === 'corporateApartments' ? 'page' : undefined}
          href="corporateApartments">Corporate apartments</a>
      </li>
      <li>
        <a
          aria-current={segment === 'stayplus' ? 'page' : undefined}
          href="stayplus">Stay plus</a>
      </li>
      <li>
        <a
          aria-current={segment === 'ourteam' ? 'page' : undefined}
          href="ourteam">Our team</a>
      </li>
      <li>
        <a
          aria-current={segment === 'contact' ? 'page' : undefined}
          href="contact">Contact</a>
      </li>
    </ul>
    <div class="icon menu-btn" on:click={onNavShowMobileMenu}>
      <svg class="feather">
        <use xlink:href="{featherSprite}#align-left" />
      </svg>
    </div>
  </div>
</nav>
